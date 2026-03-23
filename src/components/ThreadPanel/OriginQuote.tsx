import styles from './OriginQuote.module.css';

interface Props {
  text: string;
}

export default function OriginQuote({ text }: Props) {
  const truncated = text.length > 220 ? text.slice(0, 220) + '…' : text;

  return (
    <div className={styles.quote}>
      <p className={styles.text}>{truncated}</p>
    </div>
  );
}
