import styles from './ActionBar.module.css';

interface Props {
  thumbState?: 'up' | 'down' | null;
  onThumbUp: () => void;
  onThumbDown: () => void;
  onThread: () => void;
  onRetry: () => void;
}

export default function ActionBar({ thumbState, onThumbUp, onThumbDown, onThread, onRetry }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.tip} data-tip="Good response">
        <button
          className={`${styles.btn} ${thumbState === 'up' ? styles.active : ''}`}
          onClick={onThumbUp}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 12V7L2 7V12H5ZM5 7C5 7 5.5 3 8 2C9 1.7 9.5 2.5 9.5 3.5L9.5 5H12C12.3 5 12.5 5.3 12.4 5.6L11.4 9.6C11.3 10 11 10.2 10.6 10.2L5 10.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>

      <div className={styles.tip} data-tip="Bad response">
        <button
          className={`${styles.btn} ${thumbState === 'down' ? styles.active : ''}`}
          onClick={onThumbDown}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2V7L12 7V2H9ZM9 7C9 7 8.5 11 6 12C5 12.3 4.5 11.5 4.5 10.5L4.5 9H2C1.7 9 1.5 8.7 1.6 8.4L2.6 4.4C2.7 4 3 3.8 3.4 3.8L9 3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.tip} data-tip="Thread">
        <button className={`${styles.btn} ${styles.threadBtn}`} onClick={onThread}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="3" cy="4" r="2" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="11" cy="10" r="2" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M3 6 Q3 10 11 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          </svg>
        </button>
      </div>

      <div className={styles.tip} data-tip="Retry">
        <button className={styles.btn} onClick={onRetry}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7A4.5 4.5 0 0 1 11 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M11.5 7A4.5 4.5 0 0 1 3 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <polyline points="9,2 11,4.5 8.5,5.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <polyline points="5,11.5 3,9.5 5.5,8.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
