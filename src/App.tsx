import { useChat } from './hooks/useChat';
import Sidebar from './components/Sidebar/Sidebar';
import ChatPane from './components/ChatPane/ChatPane';
import ThreadPanel from './components/ThreadPanel/ThreadPanel';
import InputArea from './components/InputArea/InputArea';
import styles from './App.module.css';

export default function App() {
  const {
    messages,
    threads,
    activeThread,
    activeThreadId,
    isThreadPanelOpen,
    sendMessage,
    sendThreadMessage,
    openThread,
    closeThread,
    setThumbState,
  } = useChat();

  const isGeneratingMain = messages.some(m => m.isGenerating);

  // Find parent message index (1-based, from the main messages list)
  const parentMsgIndex = activeThread
    ? messages.findIndex(m => m.id === activeThread.parentMessageId) + 1
    : 0;

  return (
    <div className={styles.shell}>
      <Sidebar />
      <ChatPane
        messages={messages}
        threads={threads}
        activeThreadId={activeThreadId}
        onOpenThread={openThread}
        onThumbState={setThumbState}
      >
        <InputArea onSend={sendMessage} disabled={isGeneratingMain} />
      </ChatPane>
      <ThreadPanel
        thread={activeThread}
        isOpen={isThreadPanelOpen}
        parentMessageIndex={parentMsgIndex}
        onClose={closeThread}
        onSendReply={sendThreadMessage}
      />
    </div>
  );
}
