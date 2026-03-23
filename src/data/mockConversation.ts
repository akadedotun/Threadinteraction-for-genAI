import type { Message, Thread } from '../types/chat';

const now = new Date();
const t = (minAgo: number) => new Date(now.getTime() - minAgo * 60000);

export const THREAD_ID_MSG4 = 'thread-msg4';

export const initialMessages: Message[] = [
  {
    id: 'msg1',
    role: 'user',
    content: "I've got a final round interview next week with a UK financial services firm. Can you help me prep competency-based questions?",
    timestamp: t(18),
  },
  {
    id: 'msg2',
    role: 'ai',
    content: "Absolutely. For a UK financial services panel, they'll typically assess across four dimensions: **Client Focus**, **Commercial Awareness**, **Integrity & Judgement**, and **Collaboration**.\n\nLet's start with a classic opener: *\"Tell me about a time you navigated a complex stakeholder situation.\"* How would you structure your answer?",
    timestamp: t(17),
    agentTrace: [
      { type: 'thought', label: 'Thought' },
      { type: 'viewed', label: 'Viewed', resourceName: 'Interview Frameworks' },
      { type: 'generating', label: 'Generating response' },
    ],
  },
  {
    id: 'msg3',
    role: 'user',
    content: "I'd use STAR. At my last role I had to align engineering and operations on a new onboarding flow — completely different priorities.",
    timestamp: t(14),
  },
  {
    id: 'msg4',
    role: 'ai',
    content: "Good foundation. Here's how to sharpen it for a financial services panel specifically:\n\n· **Situation** — State the business risk if alignment failed\n· **Task** — Your ownership, not just involvement\n· **Action** — Lead with listening and structured decision-making\n· **Result** — Quantify: faster onboarding, reduced drop-off, measurable outcome\n\nWant me to run a mock interview on this right now?",
    timestamp: t(12),
    agentTrace: [
      { type: 'thought', label: 'Thought' },
      { type: 'viewed', label: 'Viewed', resourceName: 'Your CV' },
      { type: 'viewed', label: 'Viewed', resourceName: 'STAR Framework' },
      { type: 'generating', label: 'Generating response' },
    ],
    threadId: THREAD_ID_MSG4,
  },
  {
    id: 'msg5',
    role: 'user',
    content: "Yes — also I just found another JD from the same company, different team. Can we work on that too?",
    timestamp: t(8),
  },
  {
    id: 'msg6',
    role: 'ai',
    content: "I can — but this is exactly where a **thread** helps. Your current interview prep is live context I don't want to flatten.\n\nOpen a thread from this message to work on the new JD in parallel. Your original prep stays intact in the main conversation.",
    timestamp: t(5),
    agentTrace: [
      { type: 'thought', label: 'Thought' },
      { type: 'viewed', label: 'Viewed', resourceName: 'New JD' },
      { type: 'thought', label: 'Detected context split' },
      { type: 'generating', label: 'Generating response' },
    ],
  },
];

export const initialThreads: Record<string, Thread> = {
  [THREAD_ID_MSG4]: {
    id: THREAD_ID_MSG4,
    parentMessageId: 'msg4',
    originText: "Good foundation. Here's how to sharpen it for a financial services panel specifically:\n\n· **Situation** — State the business risk if alignment failed\n· **Task** — Your ownership, not just involvement",
    createdAt: t(10),
    messages: [
      {
        id: 'tmsg1',
        role: 'user',
        content: "How specific should I be about technical decisions in my STAR answer — this is a product role not pure engineering.",
        timestamp: t(9),
      },
      {
        id: 'tmsg2',
        role: 'ai',
        content: "Keep it at decision-level, not implementation-level. Instead of 'we used React hooks', say 'I made the architecture call that cut our build time by 40%'. Panels want to see you owned the outcome. Technical detail signals you did the work — strategic framing signals you led it.",
        timestamp: t(8),
        agentTrace: [
          { type: 'thought', label: 'Thought' },
          { type: 'generating', label: 'Generating response' },
        ],
      },
    ],
  },
};
