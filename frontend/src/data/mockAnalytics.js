// Generate last 30 days of query data
const generateDailyQueries = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const base = isWeekend ? 45 : 120;
    const variance = Math.floor(Math.random() * 40 - 20);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      queries: Math.max(10, base + variance),
      resolved: Math.floor((base + variance) * 0.73),
      escalated: Math.floor((base + variance) * 0.18),
    });
  }
  return data;
};

export const DAILY_QUERIES = generateDailyQueries();

export const SUMMARY_STATS = {
  totalQueries: 3847,
  resolvedByAI: 2809,
  escalated: 692,
  avgConfidence: 0.81,
  avgResponseTime: '1.4s',
  activeUsers: 284,
  resolutionRate: 73.0,
  escalationRate: 18.0,
  satisfactionScore: 4.3,
};

export const TOPIC_DISTRIBUTION = [
  { topic: 'Battery & Power', count: 612, color: '#6366f1' },
  { topic: 'Account & Login', count: 489, color: '#8b5cf6' },
  { topic: 'Shipping & Orders', count: 421, color: '#06b6d4' },
  { topic: 'Device Reset', count: 378, color: '#22d3a5' },
  { topic: 'Warranty', count: 312, color: '#f59e0b' },
  { topic: 'Billing & Refunds', count: 287, color: '#f87171' },
  { topic: 'Software Issues', count: 241, color: '#a78bfa' },
  { topic: 'Other', count: 185, color: '#64748b' },
];

export const RESOLUTION_DATA = [
  { name: 'Resolved by AI', value: 73, color: '#22d3a5', fill: '#22d3a5' },
  { name: 'Escalated', value: 18, color: '#f87171', fill: '#f87171' },
  { name: 'Pending', value: 9, color: '#fbbf24', fill: '#fbbf24' },
];

export const FEEDBACK_STATS = {
  totalFeedback: 1842,
  thumbsUp: 1489,
  thumbsDown: 353,
  positiveRate: 80.8,
};

export const UNRESOLVED_QUESTIONS = [
  {
    id: 1,
    question: 'How do I transfer my license to a new device?',
    occurrences: 47,
    lastSeen: '2 hours ago',
    category: 'Licensing',
    trend: 'up',
  },
  {
    id: 2,
    question: 'My device won\'t connect to the company VPN after the update',
    occurrences: 38,
    lastSeen: '45 min ago',
    category: 'Networking',
    trend: 'up',
  },
  {
    id: 3,
    question: 'Can I get a student discount on hardware purchases?',
    occurrences: 31,
    lastSeen: '3 hours ago',
    category: 'Pricing',
    trend: 'stable',
  },
  {
    id: 4,
    question: 'How long does the warranty claim process take?',
    occurrences: 29,
    lastSeen: '1 hour ago',
    category: 'Warranty',
    trend: 'down',
  },
  {
    id: 5,
    question: 'Is there an enterprise bulk pricing plan?',
    occurrences: 24,
    lastSeen: '5 hours ago',
    category: 'Pricing',
    trend: 'stable',
  },
  {
    id: 6,
    question: 'How do I export my data before cancelling?',
    occurrences: 21,
    lastSeen: '6 hours ago',
    category: 'Account',
    trend: 'down',
  },
];

export const NEGATIVE_FEEDBACK = [
  {
    id: 1,
    message: 'The answer about VPN configuration was incorrect for our setup.',
    timestamp: '10 min ago',
    category: 'Networking',
    confidence: 0.62,
  },
  {
    id: 2,
    message: 'Couldn\'t find info about upgrading storage on older models.',
    timestamp: '1 hour ago',
    category: 'Hardware',
    confidence: 0.48,
  },
  {
    id: 3,
    message: 'The battery calibration steps didn\'t match my OS version.',
    timestamp: '2 hours ago',
    category: 'Battery',
    confidence: 0.71,
  },
  {
    id: 4,
    message: 'Refund process description was outdated.',
    timestamp: '4 hours ago',
    category: 'Billing',
    confidence: 0.39,
  },
];

export const CONFIDENCE_DISTRIBUTION = [
  { range: '0–20%', count: 52, color: '#f87171' },
  { range: '20–40%', count: 98, color: '#fb923c' },
  { range: '40–60%', count: 187, color: '#fbbf24' },
  { range: '60–80%', count: 894, color: '#a3e635' },
  { range: '80–100%', count: 2616, color: '#22d3a5' },
];
