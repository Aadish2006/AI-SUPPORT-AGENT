export const CONFIDENCE_THRESHOLD = 0.55;
export const HIGH_CONFIDENCE = 0.80;

export const ROUTES = {
  CHAT: '/',
  ADMIN: '/admin',
};

export const MESSAGE_TYPES = {
  USER: 'user',
  AI: 'ai',
  SYSTEM: 'system',
};

export const ESCALATION_KEYWORDS = [
  'refund', 'legal', 'lawyer', 'sue', 'litigation', 'fraud',
  'scam', 'charged', 'unauthorized', 'dispute', 'chargeback',
];

export const AGENT_NAME = 'SupportAI';
export const TYPING_DELAY_MS = 1200;
export const MIN_RESPONSE_DELAY_MS = 800;
export const MAX_RESPONSE_DELAY_MS = 2200;
