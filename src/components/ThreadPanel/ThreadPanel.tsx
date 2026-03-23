import type { Thread } from '../../types/chat';
import ThreadHeader from './ThreadHeader';
import OriginQuote from './OriginQuote';
import ThreadMessageList from './ThreadMessageList';
import ThreadInput from './ThreadInput';
import styles from './ThreadPanel.module.css';

interface Props {
  thread: Thread | null;
  isOpen: boolean;
  parentMessageIndex: number;
  onClose: () => void;
  onSendReply: (threadId: string, content: string) => void;
}

export default function ThreadPanel({ thread, isOpen, parentMessageIndex, onClose, onSendReply }: Props) {
  const hasGenerating = thread?.messages.some(m => m.isGenerating) ?? false;

  return (
    <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
      {thread && (
        <>
          <ThreadHeader parentMessageIndex={parentMessageIndex} onClose={onClose} />
          <div className={styles.body}>
            <OriginQuote text={thread.originText} />
            <div className={styles.messages}>
              <ThreadMessageList messages={thread.messages} />
            </div>
          </div>
          <ThreadInput
            onSend={(content) => onSendReply(thread.id, content)}
            disabled={hasGenerating}
          />
        </>
      )}
    </div>
  );
}
