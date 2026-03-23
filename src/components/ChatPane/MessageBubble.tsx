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

function inlineRender(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    return <span key={i}>{part}</span>;
  });
}

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Heading: lines with only **text** or lines starting with ##
    if (/^#{1,3}\s/.test(line)) {
      const text = line.replace(/^#{1,3}\s/, '');
      nodes.push(<h2 key={i} className={styles.heading}>{text}</h2>);
      i++;
      continue;
    }

    // Bullet list: lines starting with · or - or •
    if (/^[·•\-]\s/.test(line)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^[·•\-]\s/.test(lines[i])) {
        const itemText = lines[i].replace(/^[·•\-]\s/, '');
        listItems.push(<li key={i}>{inlineRender(itemText)}</li>);
        i++;
      }
      nodes.push(<ul key={`ul-${i}`} className={styles.list}>{listItems}</ul>);
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const itemText = lines[i].replace(/^\d+\.\s/, '');
        listItems.push(<li key={i}>{inlineRender(itemText)}</li>);
        i++;
      }
      nodes.push(<ol key={`ol-${i}`} className={styles.orderedList}>{listItems}</ol>);
      continue;
    }

    // Regular paragraph
    nodes.push(<p key={i} className={styles.para}>{inlineRender(line)}</p>);
    i++;
  }

  return nodes;
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

  const handleThread = () => onOpenThread(message.id, message.content.slice(0, 200));
  const handleThumbUp = () => onThumbState(message.id, message.thumbState === 'up' ? null : 'up');
  const handleThumbDown = () => onThumbState(message.id, message.thumbState === 'down' ? null : 'down');

  return (
    <div
      className={`${styles.wrapper} ${isUser ? styles.userWrapper : styles.aiWrapper} ${isNew ? styles.entering : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUser && message.agentTrace && (
        <AgentTrace steps={message.agentTrace} isGenerating={message.isGenerating} />
      )}

      <div className={`
        ${styles.bubble}
        ${isUser ? styles.userBubble : styles.aiBubble}
        ${isActiveThread ? styles.activeThread : ''}
        ${pulseThread ? styles.pulseThread : ''}
      `}>
        {message.isGenerating && !message.content
          ? <TypingIndicator />
          : <div className={styles.content}>{renderMarkdown(message.content)}</div>
        }
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
