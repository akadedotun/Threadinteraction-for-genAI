import styles from './ThreadHeader.module.css';

interface Props {
  parentMessageIndex: number;
  onClose: () => void;
}

export default function ThreadHeader({ parentMessageIndex, onClose }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 3 L4 7 L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="10" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
          <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
          <circle cx="4" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
          <line x1="4" y1="7.5" x2="4" y2="7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <span className={styles.title}>Thread</span>
      </div>
      <div className={styles.right}>
        <span className={styles.meta}>Branched from message #{parentMessageIndex}</span>
        <button className={styles.closeBtn} onClick={onClose} title="Close thread">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
