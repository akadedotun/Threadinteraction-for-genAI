import { useState, useRef } from 'react';
import styles from './InputArea.module.css';

interface Props {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function InputArea({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <button className={styles.attachBtn} title="Attach file">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8L8 14C5.79 14 4 12.21 4 10V4.5C4 3.12 5.12 2 6.5 2S9 3.12 9 4.5V10C9 10.55 8.55 11 8 11S7 10.55 7 10V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything…"
          rows={1}
          disabled={disabled}
        />

        <button
          className={`${styles.sendBtn} ${value.trim() ? styles.active : ''}`}
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          title="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.meta}>
        <span>Model: Orbit Pro</span>
        <span className={styles.dot}>·</span>
        <span>Jobs project</span>
        <span className={styles.dot}>·</span>
        <span>End-to-end encrypted</span>
      </div>
    </div>
  );
}
