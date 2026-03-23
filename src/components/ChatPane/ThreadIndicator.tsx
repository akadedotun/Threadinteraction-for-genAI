import styles from './ThreadIndicator.module.css';
import type { Thread } from '../../types/chat';

interface Props {
  thread: Thread;
  onOpen: () => void;
}

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export default function ThreadIndicator({ thread, onOpen }: Props) {
  const replyCount = thread.messages.length;
  const lastMsg = thread.messages[thread.messages.length - 1];
  const lastTime = lastMsg ? timeAgo(lastMsg.timestamp) : '';

  return (
    <button className={styles.indicator} onClick={onOpen}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M5.5 1L3 4H8L5.5 1Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        <path d="M5.5 10L3 7H8L5.5 10Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        <line x1="5.5" y1="4" x2="5.5" y2="7" stroke="currentColor" strokeWidth="1.1"/>
      </svg>
      <span className={styles.count}>{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
      {lastTime && (
        <>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>last reply {lastTime}</span>
        </>
      )}
      <span className={styles.viewLink}>View thread →</span>
    </button>
  );
}
