import { useState, useEffect } from 'react';
import type { Message, Thread } from '../../types/chat';
import AgentTrace from './AgentTrace';
import ActionBar from './ActionBar';
import ThreadIndicator from './ThreadIndicator';
import TypingIndicator from './TypingIndicator';
import styles from './MessageBubble.module.css';

interface Props {
  message: Message;
  thread?: Thread | null;
  isActiveThread?: boolean;
  onOpenThread: (messageId: string, originText: string) => void;
  onThumbState: (messageId: string, state: 'up' | 'down' | null) => void;
}

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

function renderLines(content: string) {
  return content.split('\n').map((line, i) => (
    <span key={i}>
      {renderContent(line)}
      {i < content.split('\n').length - 1 && <br />}
    </span>
  ));
}

export default function MessageBubble({ message, thread, isActiveThread, onOpenThread, onThumbState }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [pulseThread, setPulseThread] = useState(false);

  useEffect(() => {
    setIsNew(true);
    const t = setTimeout(() => setIsNew(false), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isActiveThread) {
      setPulseThread(true);
      const t = setTimeout(() => setPulseThread(false), 1200);
      return () => clearTimeout(t);
    }
  }, [isActiveThread]);

  const isUser = message.role === 'user';
  const hasThread = Boolean(message.threadId && thread);

  const handleThread = () => {
    const originText = message.content.slice(0, 200);
    onOpenThread(message.id, originText);
  };

  const handleThumbUp = () => {
    onThumbState(message.id, message.thumbState === 'up' ? null : 'up');
  };

  const handleThumbDown = () => {
    onThumbState(message.id, message.thumbState === 'down' ? null : 'down');
  };

  return (
    <div
      className={`${styles.wrapper} ${isUser ? styles.userWrapper : styles.aiWrapper} ${isNew ? styles.entering : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUser && message.agentTrace && (
        <AgentTrace steps={message.agentTrace} isGenerating={message.isGenerating} />
      )}

      <div
        className={`
          ${styles.bubble}
          ${isUser ? styles.userBubble : styles.aiBubble}
          ${isActiveThread ? styles.activeThread : ''}
          ${pulseThread ? styles.pulseThread : ''}
        `}
      >
        {message.isGenerating && !message.content ? (
          <TypingIndicator />
        ) : (
          <p className={styles.content}>{renderLines(message.content)}</p>
        )}
      </div>

      {!isUser && !message.isGenerating && (
        <div className={`${styles.actionBar} ${isHovered ? styles.actionBarVisible : ''}`}>
          <ActionBar
            thumbState={message.thumbState}
            onThumbUp={handleThumbUp}
            onThumbDown={handleThumbDown}
            onThread={handleThread}
            onRetry={() => {}}
          />
        </div>
      )}

      {hasThread && thread && (
        <ThreadIndicator thread={thread} onOpen={handleThread} />
      )}
    </div>
  );
}
