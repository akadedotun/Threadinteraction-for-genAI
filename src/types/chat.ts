export interface AgentTraceStep {
  type: 'thought' | 'viewed' | 'generating';
  label: string;
  resourceName?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  agentTrace?: AgentTraceStep[];
  isGenerating?: boolean;
  threadId?: string | null;
  thumbState?: 'up' | 'down' | null;
}

export interface Thread {
  id: string;
  parentMessageId: string;
  originText: string;
  messages: Message[];
  createdAt: Date;
}

export interface ChatState {
  messages: Message[];
  threads: Record<string, Thread>;
  activeThreadId: string | null;
  isThreadPanelOpen: boolean;
}
