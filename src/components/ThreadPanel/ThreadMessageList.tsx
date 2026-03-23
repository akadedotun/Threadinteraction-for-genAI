import { useEffect, useRef } from 'react';
import type { Message } from '../../types/chat';
import AgentTrace from '../ChatPane/AgentTrace';
import TypingIndicator from '../ChatPane/TypingIndicator';
import styles from './ThreadMessageList.module.css';

interface Props {
  messages: Message[];
}

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    return <span key={i}>{part}</span>;
  });
}

function renderLines(content: string) {
  return content.split('\n').map((line, i, arr) => (
    <span key={i}>{renderContent(line)}{i < arr.length - 1 && <br />}</span>
  ));
}

export default function ThreadMessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className={styles.list}>
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`${styles.msgWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.aiWrapper}`}
        >
          {msg.role === 'ai' && msg.agentTrace && (
            <AgentTrace steps={msg.agentTrace} isGenerating={msg.isGenerating} />
          )}
          <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
            {msg.isGenerating && !msg.content ? (
              <TypingIndicator />
            ) : (
              <p className={styles.content}>{renderLines(msg.content)}</p>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
