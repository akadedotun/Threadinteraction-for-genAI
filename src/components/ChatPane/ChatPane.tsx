import type { Message, Thread } from '../../types/chat';
import MessageList from './MessageList';
import styles from './ChatPane.module.css';

interface Props {
  messages: Message[];
  threads: Record<string, Thread>;
  activeThreadId: string | null;
  onOpenThread: (messageId: string, originText: string) => void;
  onThumbState: (messageId: string, state: 'up' | 'down' | null) => void;
  children?: React.ReactNode;
}

export default function ChatPane({ messages, threads, activeThreadId, onOpenThread, onThumbState, children }: Props) {
  return (
    <div className={styles.pane}>
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.projectTag}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 2.5C1 1.95 1.45 1.5 2 1.5H3.8L5 3H8C8.55 3 9 3.45 9 4V8C9 8.55 8.55 9 8 9H2C1.45 9 1 8.55 1 8V2.5Z" stroke="currentColor" strokeWidth="1.1" fill="none"/>
            </svg>
            Jobs
          </span>
          <span className={styles.separator}>·</span>
          <span className={styles.chatTitle}>Final round prep — UK FS</span>
        </div>
      </div>

      <div className={styles.messages}>
        <div className={styles.messagesInner}>
          <MessageList
            messages={messages}
            threads={threads}
            activeThreadId={activeThreadId}
            onOpenThread={onOpenThread}
            onThumbState={onThumbState}
          />
        </div>
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputAreaInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
