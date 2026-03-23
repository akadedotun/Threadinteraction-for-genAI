import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles.container}>
      <span className={styles.dot} style={{ animationDelay: '0ms' }} />
      <span className={styles.dot} style={{ animationDelay: '100ms' }} />
      <span className={styles.dot} style={{ animationDelay: '200ms' }} />
    </div>
  );
}
