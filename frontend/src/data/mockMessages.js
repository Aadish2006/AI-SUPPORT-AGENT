// Mock conversation messages
export const INITIAL_MESSAGES = [
  {
    id: 'sys-1',
    type: 'system',
    content: 'AI Support Agent is online. How can I help you today?',
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
  },
  {
    id: 'user-1',
    type: 'user',
    content: 'My laptop battery drains really quickly. It barely lasts 2 hours.',
    timestamp: new Date(Date.now() - 7 * 60000).toISOString(),
  },
  {
    id: 'ai-1',
    type: 'ai',
    content: `I can help you with that! Battery drain issues are often fixable. Here are the most effective steps:\n\n**1. Battery Calibration**\nFully discharge the battery to 0%, then charge it uninterrupted to 100%. This recalibrates the battery meter.\n\n**2. Check Power Settings**\nGo to *Settings → System → Power & Sleep* and set the power plan to "Balanced" or "Battery Saver".\n\n**3. Identify Power-Hungry Apps**\nOpen Task Manager (Ctrl+Shift+Esc) and check the **Power usage** column to find culprits.\n\nWould you like step-by-step instructions for any of these?`,
    timestamp: new Date(Date.now() - 6.5 * 60000).toISOString(),
    confidence: 0.91,
    sources: ['battery-guide.pdf', 'faq-power.md'],
    feedback: null,
  },
  {
    id: 'user-2',
    type: 'user',
    content: 'How long does the calibration take?',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 'ai-2',
    type: 'ai',
    content: `Battery calibration typically takes **4–6 hours** in total:\n\n- **Discharge phase**: ~2–3 hours of normal use\n- **Charging phase**: ~2–3 hours to reach 100%\n\n> 💡 **Tip:** Do this overnight so it doesn't interrupt your work. Make sure to keep the laptop plugged in until it reads 100% — don't unplug it early.\n\nAfter calibration, your battery indicator should be more accurate. If it still drains unusually fast after this, it may indicate the battery needs replacement.`,
    timestamp: new Date(Date.now() - 4.5 * 60000).toISOString(),
    confidence: 0.88,
    sources: ['battery-guide.pdf'],
    feedback: 'up',
  },
  {
    id: 'user-3',
    type: 'user',
    content: 'What is your refund policy for defective hardware?',
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
  },
  {
    id: 'ai-3',
    type: 'ai',
    content: `I have some information about our hardware return policy, but I want to make sure you get the most accurate and up-to-date details.\n\nBased on our documentation, defective hardware typically qualifies for a **full refund or replacement within 30 days** of purchase with proof of purchase.\n\nHowever, since refund policies can vary based on your specific situation and region, I'd recommend connecting with a human support specialist who can review your order and process this directly.`,
    timestamp: new Date(Date.now() - 2.5 * 60000).toISOString(),
    confidence: 0.41,
    sources: ['returns-policy.pdf'],
    feedback: null,
    escalated: true,
  },
];

export const SUGGESTED_PROMPTS = [
  { icon: '🔋', text: 'My battery drains too fast' },
  { icon: '🔄', text: 'How do I reset my device?' },
  { icon: '📦', text: 'Track my order status' },
  { icon: '🛡️', text: 'What does my warranty cover?' },
  { icon: '🔑', text: 'I forgot my account password' },
  { icon: '💳', text: 'I was charged incorrectly' },
];

export const AI_RESPONSES = [
  {
    triggers: ['warranty', 'coverage', 'covered'],
    confidence: 0.85,
    content: `Your warranty typically covers:\n\n**Standard Coverage (12 months)**\n- Manufacturing defects\n- Hardware failures under normal use\n- Component malfunctions\n\n**NOT Covered**\n- Physical damage (drops, spills)\n- Unauthorized modifications\n- Normal wear and tear\n\nTo check your specific warranty status, visit **My Account → Devices → Warranty Info** or provide your serial number.`,
    sources: ['warranty-policy.pdf'],
  },
  {
    triggers: ['reset', 'factory', 'restore'],
    confidence: 0.92,
    content: `Here's how to factory reset your device:\n\n**⚠️ Warning:** This will erase all data. Back up first!\n\n**Steps:**\n1. Go to **Settings → System → Recovery**\n2. Click "Reset this PC" or "Factory Reset"\n3. Choose "Remove everything"\n4. Follow the on-screen instructions\n\nThe process takes **20–40 minutes**. Make sure you're plugged into power.`,
    sources: ['device-reset-guide.pdf', 'faq-devices.md'],
  },
  {
    triggers: ['password', 'login', 'access', 'forgot'],
    confidence: 0.94,
    content: `To reset your password:\n\n1. Go to our **login page**\n2. Click **"Forgot Password?"**\n3. Enter your registered email address\n4. Check your inbox for a reset link (valid for 24 hours)\n5. Click the link and set a new password\n\nIf you don't receive the email within 5 minutes, check your spam folder. Still no luck? I can escalate this to our account team.`,
    sources: ['account-guide.pdf'],
  },
  {
    triggers: ['order', 'track', 'shipping', 'delivery'],
    confidence: 0.87,
    content: `To track your order:\n\n1. Log into your account at **myaccount.supportai.com**\n2. Navigate to **Orders → Recent Orders**\n3. Click on your order number\n4. You'll see real-time tracking information\n\nAlternatively, check your shipping confirmation email for a direct tracking link.\n\n> Orders typically arrive within **3–5 business days** for standard shipping.`,
    sources: ['shipping-faq.md'],
  },
  {
    triggers: ['refund', 'legal', 'lawyer', 'sue', 'charge', 'charged'],
    confidence: 0.35,
    escalate: true,
    content: `I understand you have a concern about a charge on your account. I want to make sure this gets resolved correctly.\n\nBased on our billing documentation, unauthorized charges are taken very seriously and are typically refunded within **3–5 business days** after verification.\n\nGiven the nature of your request, I'd like to connect you with a billing specialist who has full access to your account history and can resolve this immediately.`,
    sources: ['billing-policy.pdf'],
  },
];

export const DEFAULT_RESPONSE = {
  confidence: 0.72,
  content: `Thanks for your question! I've searched our knowledge base and here's what I found:\n\nThis appears to be a specific issue that I can address. Let me provide you with the most relevant information from our documentation.\n\nIf this doesn't fully resolve your issue, I can connect you with a support specialist who can provide more personalized assistance.`,
  sources: ['general-faq.md'],
};
