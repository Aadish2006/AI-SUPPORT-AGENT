/**
 * Format a timestamp to a human-readable relative or absolute time
 */
export const formatTime = (iso) => {
  const date = new Date(iso);
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format a large number with K/M suffixes
 */
export const formatNumber = (n) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
};

/**
 * Format a percentage
 */
export const formatPercent = (value, decimals = 1) => {
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Get confidence label and color classes
 */
export const getConfidenceInfo = (score) => {
  if (score >= 0.80) return { label: 'High', color: 'text-accent-green', bg: 'bg-accent-green/10 border-accent-green/20' };
  if (score >= 0.55) return { label: 'Medium', color: 'text-accent-yellow', bg: 'bg-accent-yellow/10 border-accent-yellow/20' };
  return { label: 'Low', color: 'text-accent-red', bg: 'bg-accent-red/10 border-accent-red/20' };
};

/**
 * Generate a unique ID
 */
export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

/**
 * Capitalize first letter
 */
export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

/**
 * Truncate text to maxLen characters
 */
export const truncate = (str, maxLen = 80) =>
  str && str.length > maxLen ? `${str.slice(0, maxLen)}…` : str;
