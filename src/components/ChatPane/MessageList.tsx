import { useEffect, useRef } from 'react';
import type { Message, Thread } from '../../types/chat';
import MessageBubble from './MessageBubble';
import styles from './MessageList.module.css';

interface Props {
  messages: Message[];
  threads: Record<string, Thread>;
  activeThreadId: string | null;
  onOpenThread: (messageId: string, originText: string) => void;
  onThumbState: (messageId: string, state: 'up' | 'down' | null) => void;
}

export default function MessageList({ messages, threads, activeThreadId, onOpenThread, onThumbState }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className={styles.list}>
      {messages.map(msg => {
        const thread = msg.threadId ? (threads[msg.threadId] ?? null) : null;
        const isActiveThread = Boolean(msg.threadId && msg.threadId === activeThreadId);
        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            thread={thread}
            isActiveThread={isActiveThread}
            onOpenThread={onOpenThread}
            onThumbState={onThumbState}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
