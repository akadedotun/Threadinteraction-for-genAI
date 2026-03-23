# Claude Code Prompt — Threaded AI Chat UI (React + TypeScript)

---

## Project Overview

Build a **React + TypeScript** single-page application that demonstrates a concept-level AI chat interface with **threaded conversations**. This is a UI/UX concept prototype — not a real AI integration. Responses should be simulated with realistic mock data and typing delays.

The visual design must feel like a **modern agentic task interface** — dark, dense, process-aware, and tool-centric — inspired by interfaces like Notion AI, Linear, or Glean. **Do not reference Claude, Anthropic, ChatGPT, or any LLM branding anywhere in the UI.**

---

## Tech Stack

- React 18 + TypeScript
- Vite (dev server)
- CSS Modules or Tailwind CSS (your choice — consistency matters more than the pick)
- No UI component libraries (Shadcn, MUI, etc.) — build all components from scratch
- No real API calls — all AI responses are mocked with `setTimeout` delays

---

## Visual Design Direction

### Aesthetic Reference
The design should feel like the screenshot reference: a **dark agentic chat UI** with:
- Deep near-black backgrounds (`#0d0d10` base, `#141418` surfaces, `#1c1c22` cards)
- Subtle rounded corners (`12px` default, `8px` for smaller elements)
- Thin `1px` borders at low opacity (`rgba(255,255,255,0.07)`)
- A clear **primary accent** — use a rich **indigo/violet** (`#6c63ff`) NOT orange, NOT Claude's terracotta
- **Secondary accent** for threads specifically — use `#22c9a0` (teal/mint), visually distinct from the primary
- Typography: use **`DM Sans`** for UI text and **`DM Mono`** for code/meta labels (load from Google Fonts)
- Font sizes: 13px for meta, 14px body, 15px message text, 18px+ for headings only
- Everything must feel **native dark mode** — no light mode toggle needed

### Layout: Three-column shell
```
[Sidebar 220px] | [Chat pane flex-1] | [Thread panel 360px, hidden by default]
```
- Thread panel slides in from the right with a smooth `300ms ease` transition
- When thread panel is open, chat pane shrinks — it does NOT overlap
- On narrow viewports (<900px), thread panel overlays as a drawer instead

### Sidebar
- App logo (custom SVG mark — design a simple geometric shape, nothing that looks like existing AI logos) + app name: **"Orbit"**
- "New chat" button at top
- Project folders section with:
  - 📁 Jobs (active, with accent dot)
  - 📁 Design research
  - 📁 Side builds
- Recent chats list (4–5 items, truncated)
- User avatar + name + plan at bottom
- No icons from icon libraries — use simple inline SVGs only

---

## Core Features to Build

### 1. Main Chat Interface

**Message anatomy:**
Each message has two states — default and hovered.

On **default**, show only the message bubble.

On **hover**, reveal a subtle action bar directly below the bubble (not floating, inline):
```
[👍] [👎] [🔀 Thread] [↻ Retry]
```
- Thumbs up/down: simple toggle buttons, opacity feedback only
- **Thread button**: icon only (use a branching/fork SVG icon — design it as two lines diverging). This is the key interaction. Place it between the thumbs and retry.
- Retry: icon only (circular arrow SVG)
- Action bar fades in with `opacity: 0 → 1` on hover, `transition: 0.15s`
- Do NOT show text labels — icons only, with `title` tooltips

**Message types:**
- User messages: right-aligned, `#1a1d2e` background, `rgba(108,99,255,0.2)` border
- AI messages: left-aligned, `#141418` background, `rgba(255,255,255,0.06)` border
- Each AI message shows an **"agentic trace"** row above the bubble:

```
◎ Thought  ›   👁 Viewed [Project Brief]   ›   ✦ Generating response...
```

This trace is always visible (not collapsed), shown in 11px monospace, muted color (`rgba(255,255,255,0.3)`). The last item in the trace animates with a subtle pulsing dot while the message is "generating".

**Typing simulation:**
When the AI "responds", show a typing state for 1.5–2.5 seconds (randomised), then render the full message with a fast character-reveal animation (not typewriter slow — just a 200ms fade+slide-up).

### 2. Thread System — The Key Feature

**Opening a thread:**
- Clicking the Thread icon on any message opens the **Thread Panel**
- The originating message gets a subtle left-border highlight (`3px solid #22c9a0`) and a soft background tint
- A small thread indicator appears below the originating message:
  ```
  ⬡ 1 reply · branched from this message
  ```
  Updates count as more replies are added.

**Thread Panel anatomy (right side):**
```
┌─────────────────────────────┐
│ ◈ Thread                [✕] │  ← header, 16px, teal accent
│ Branched from message #3    │  ← muted meta
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ [Origin message quote]  │ │  ← quoted context, left-border teal
│ └─────────────────────────┘ │
│                             │
│  [Thread messages scroll]   │
│                             │
├─────────────────────────────┤
│ [Reply input]      [Send →] │
└─────────────────────────────┘
```

- Thread messages use same bubble style as main chat but slightly smaller (13px)
- Thread also has AI responses with typing simulation
- Thread input is independent from main input
- Multiple threads can exist (one per message max) but only one panel shown at a time
- Switching threads: clicking Thread on a different message replaces the panel content with smooth transition

**Thread indicator in main chat:**
After a thread has replies, show below the message:
```
⬡ 3 replies  ·  last reply 2m ago  [View thread →]
```
Clicking it re-opens the thread panel.

### 3. Mock Conversation Content

Pre-load the chat with this specific scenario — **job interview prep**:

**Message 1 (User):**
> "I've got a final round interview next week with a UK financial services firm. Can you help me prep competency-based questions?"

**AI trace for response 1:**
`◎ Thought › 👁 Viewed [Interview Frameworks] › ✦ Generating response`

**Message 2 (AI):**
> "Absolutely. For a UK financial services panel, they'll typically assess across four dimensions: **Client Focus**, **Commercial Awareness**, **Integrity & Judgement**, and **Collaboration**.
> 
> Let's start with a classic opener: *"Tell me about a time you navigated a complex stakeholder situation."* How would you structure your answer?"

**Message 3 (User):**
> "I'd use STAR. At my last role I had to align engineering and operations on a new onboarding flow — completely different priorities."

**AI trace for response 2:**
`◎ Thought › 👁 Viewed [Your CV] › 👁 Viewed [STAR Framework] › ✦ Generating response`

**Message 4 (AI):**
> "Good foundation. Here's how to sharpen it for a financial services panel specifically:
> 
> · **Situation** — State the business risk if alignment failed
> · **Task** — Your ownership, not just involvement
> · **Action** — Lead with listening and structured decision-making
> · **Result** — Quantify: faster onboarding, reduced drop-off, measurable outcome
> 
> Want me to run a mock interview on this right now?"

**Message 5 (User):**
> "Yes — also I just found another JD from the same company, different team. Can we work on that too?"

**AI trace for response 3:**
`◎ Thought › 👁 Viewed [New JD] › ◎ Detected context split › ✦ Generating response`

**Message 6 (AI):**
> "I can — but this is exactly where a **thread** helps. Your current interview prep is live context I don't want to flatten.
> 
> Open a thread from this message to work on the new JD in parallel. Your original prep stays intact in the main conversation."

Pre-populate **one open thread** on Message 4, with these contents:

**Thread message 1 (User):** "How specific should I be about technical decisions in my STAR answer — this is a product role not pure engineering."

**Thread AI response:** "Keep it at decision-level, not implementation-level. Instead of 'we used React hooks', say 'I made the architecture call that cut our build time by 40%'. Panels want to see you owned the outcome. Technical detail signals you did the work — strategic framing signals you led it."

### 4. Input Area

Main chat input:
- Full-width pill-shaped input, `min-height: 48px`, auto-expands up to `140px`
- Left side: `+` attachment button
- Right side: send arrow button (activates on non-empty input)
- Placeholder: `"Ask anything…"`
- Below input: small meta row — `Model: Orbit Pro  ·  Jobs project  ·  End-to-end encrypted`

When user sends a message in the demo, simulate an AI response using one of the pre-written mock responses (cycle through a small set of 4–5 fallback responses relevant to interview prep).

---

## Animations & Motion

- Message entry: `translateY(8px) → 0` + `opacity: 0 → 1` over `200ms ease-out`
- Thread panel open/close: `width: 0 → 360px` over `300ms cubic-bezier(0.4, 0, 0.2, 1)`
- Action bar hover reveal: `opacity 0.15s ease`
- Typing indicator: three dots, each scaling `0.6 → 1.0` with staggered delays (100ms apart), loop
- Thread origin highlight: `box-shadow: 0 0 0 0 → 0 0 0 3px rgba(34,201,160,0.3)` pulsing twice on open, then steady left-border

---

## Component Architecture

Structure the project like this:

```
src/
  components/
    Sidebar/
      Sidebar.tsx
      Sidebar.module.css
    ChatPane/
      ChatPane.tsx
      ChatPane.module.css
      MessageList.tsx
      MessageBubble.tsx       ← handles hover state, action bar, thread button
      ActionBar.tsx           ← thumbs up/down, thread icon, retry
      AgentTrace.tsx          ← the "Thought › Viewed › Generating" row
      TypingIndicator.tsx
      ThreadIndicator.tsx     ← "3 replies · View thread →" below messages
    ThreadPanel/
      ThreadPanel.tsx
      ThreadPanel.module.css
      ThreadHeader.tsx
      OriginQuote.tsx
      ThreadMessageList.tsx
      ThreadInput.tsx
    InputArea/
      InputArea.tsx
      InputArea.module.css
  types/
    chat.ts                   ← Message, Thread, AgentTrace interfaces
  hooks/
    useChat.ts                ← message state, send logic, mock AI responses
    useThreads.ts             ← thread open/close, thread messages, active thread
  data/
    mockConversation.ts       ← pre-loaded messages
    mockResponses.ts          ← fallback AI replies for live demo
  App.tsx
  main.tsx
  index.css                   ← global resets, Google Fonts import, CSS variables
```

---

## TypeScript Interfaces

```typescript
// types/chat.ts

interface AgentTraceStep {
  type: 'thought' | 'viewed' | 'generating';
  label: string;
  resourceName?: string;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  agentTrace?: AgentTraceStep[];
  isGenerating?: boolean;
  threadId?: string | null;   // null = no thread yet, string = thread exists
  thumbState?: 'up' | 'down' | null;
}

interface Thread {
  id: string;
  parentMessageId: string;
  originText: string;         // truncated quote from parent message
  messages: Message[];
  createdAt: Date;
}

interface ChatState {
  messages: Message[];
  threads: Record<string, Thread>;  // keyed by threadId
  activeThreadId: string | null;
  isThreadPanelOpen: boolean;
}
```

---

## What NOT to Include

- No Claude/Anthropic/OpenAI/Gemini branding or visual references
- No purple gradient hero sections
- No light mode
- No authentication screens
- No settings pages
- No mobile-first layout (desktop-first, responsive down to 768px)
- No toast notifications (use inline state feedback only)
- No external icon libraries (Lucide, Heroicons, etc.) — write all SVGs inline
- No animations that feel "playful" — this UI is professional and focused

---

## Deliverable

A fully working Vite + React + TypeScript project that:
1. Renders the pre-loaded conversation correctly
2. Hover any message → action bar appears with thread icon
3. Click thread icon → thread panel slides in, origin message highlights
4. Pre-loaded thread on Message 4 is already visible in the panel
5. User can type and send in both main chat and thread input
6. AI simulates responses with typing delay in both contexts
7. Thread reply count updates in the main chat indicator
8. Closing the thread panel restores the full chat pane width

Run with: `npm install && npm run dev`