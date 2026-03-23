import { useState, useCallback, useRef } from 'react';
import type { Message, Thread } from '../types/chat';
import { initialMessages, initialThreads, THREAD_ID_MSG4 } from '../data/mockConversation';
import { getRandomDelay, getMainResponse, getThreadResponse } from '../data/mockResponses';

const aiTraceForResponse = [
  { type: 'thought' as const, label: 'Thought' },
  { type: 'generating' as const, label: 'Generating response' },
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [threads, setThreads] = useState<Record<string, Thread>>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(THREAD_ID_MSG4);
  const [isThreadPanelOpen, setIsThreadPanelOpen] = useState(true);

  const mainResponseCount = useRef(0);
  const threadResponseCount = useRef(0);

  const sendMessage = useCallback((content: string) => {
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const placeholderId = `msg-ai-${Date.now()}`;
    const aiPlaceholder: Message = {
      id: placeholderId,
      role: 'ai',
      content: '',
      timestamp: new Date(),
      agentTrace: aiTraceForResponse,
      isGenerating: true,
    };

    setMessages(prev => [...prev, userMsg, aiPlaceholder]);

    const delay = getRandomDelay();
    setTimeout(() => {
      const responseText = getMainResponse(mainResponseCount.current++);
      setMessages(prev =>
        prev.map(m =>
          m.id === placeholderId
            ? { ...m, content: responseText, isGenerating: false }
            : m
        )
      );
    }, delay);
  }, []);

  const sendThreadMessage = useCallback((threadId: string, content: string) => {
    const userMsg: Message = {
      id: `tmsg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const placeholderId = `tmsg-ai-${Date.now()}`;
    const aiPlaceholder: Message = {
      id: placeholderId,
      role: 'ai',
      content: '',
      timestamp: new Date(),
      agentTrace: aiTraceForResponse,
      isGenerating: true,
    };

    setThreads(prev => ({
      ...prev,
      [threadId]: {
        ...prev[threadId],
        messages: [...prev[threadId].messages, userMsg, aiPlaceholder],
      },
    }));

    const delay = getRandomDelay();
    setTimeout(() => {
      const responseText = getThreadResponse(threadResponseCount.current++);
      setThreads(prev => ({
        ...prev,
        [threadId]: {
          ...prev[threadId],
          messages: prev[threadId].messages.map(m =>
            m.id === placeholderId
              ? { ...m, content: responseText, isGenerating: false }
              : m
          ),
        },
      }));
    }, delay);
  }, []);

  const openThread = useCallback((messageId: string, originText: string) => {
    const msg = messages.find(m => m.id === messageId);
    if (!msg) return;

    if (msg.threadId) {
      setActiveThreadId(msg.threadId);
      setIsThreadPanelOpen(true);
      return;
    }

    const threadId = `thread-${messageId}-${Date.now()}`;
    const newThread: Thread = {
      id: threadId,
      parentMessageId: messageId,
      originText,
      messages: [],
      createdAt: new Date(),
    };

    setThreads(prev => ({ ...prev, [threadId]: newThread }));
    setMessages(prev =>
      prev.map(m => m.id === messageId ? { ...m, threadId } : m)
    );
    setActiveThreadId(threadId);
    setIsThreadPanelOpen(true);
  }, [messages]);

  const closeThread = useCallback(() => {
    setIsThreadPanelOpen(false);
  }, []);

  const setThumbState = useCallback((messageId: string, state: 'up' | 'down' | null) => {
    setMessages(prev =>
      prev.map(m => m.id === messageId ? { ...m, thumbState: state } : m)
    );
  }, []);

  const activeThread = activeThreadId ? threads[activeThreadId] ?? null : null;

  return {
    messages,
    threads,
    activeThread,
    activeThreadId,
    isThreadPanelOpen,
    sendMessage,
    sendThreadMessage,
    openThread,
    closeThread,
    setThumbState,
  };
}
