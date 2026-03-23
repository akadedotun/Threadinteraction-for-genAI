export const mainChatResponses = [
  "Great question. For a financial services role, you'll want to lead with risk awareness. Frame every answer around the consequence of inaction — panels respond to candidates who understand downside, not just upside. What specific scenario are you trying to build out?",
  "That's a strong instinct. One thing panels often look for in product roles is **evidence of stakeholder alignment without authority** — meaning you got people to agree not because you had power, but because you built trust and presented a compelling case. Do you have an example like that in your history?",
  "Let me give you a mock question to work with:\n\n*\"Describe a time when you had to make a decision with incomplete information. What was the outcome?\"*\n\nThis is a classic **Judgement & Risk** probe. Take 90 seconds and give me your raw answer — I'll sharpen it with you.",
  "The key in financial services panels is to **quantify outcomes wherever possible**. Don't say 'the project improved efficiency' — say 'we reduced processing time by 30%, saving the team ~6 hours per week'. Even estimates are fine if you contextualise them. What's the result from your example?",
  "You're in good shape. One final thing to prepare: they'll almost certainly ask about a failure or a time you got pushback. Have a story ready where you received critical feedback and **visibly changed your approach** as a result. That signal — coachability — is highly weighted in senior financial services roles.",
];

export const threadResponses = [
  "For the second JD, start by mapping the competencies they've listed against your existing STAR stories. Often one story can be reframed for a different role — the facts stay the same, but you shift what you emphasise in the Result. What does this new JD highlight as core competencies?",
  "Good parallel. The key difference between the two roles is likely the **stakeholder surface** — one team probably has more internal clients, the other more external. That changes how you weight your 'Client Focus' answers. Do you want me to help you draft two versions of the same story?",
  "That framing works well. Keep the technical detail out of the headline but ready to deploy if they probe. The panel will respect that you can operate at both levels — strategic when needed, specific when asked.",
  "Exactly right. The distinction between 'I was involved' and 'I owned it' is everything in these panels. Make sure your Task statement uses first-person ownership language consistently throughout.",
];

export function getRandomDelay(): number {
  return 1500 + Math.random() * 1000;
}

export function getMainResponse(index: number): string {
  return mainChatResponses[index % mainChatResponses.length];
}

export function getThreadResponse(index: number): string {
  return threadResponses[index % threadResponses.length];
}
