const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'API request failed');
  }

  return payload.data;
}

export const apiClient = {
  sendMessage(body) {
    return request('/chat/message', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  submitFeedback(body) {
    return request('/feedback', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  getAnalyticsSummary() {
    return request('/analytics/summary');
  },

  getUnresolvedQuestions() {
    return request('/analytics/unresolved-questions');
  },

  getTopics() {
    return request('/analytics/topics');
  },

  getFeedbackStats() {
    return request('/analytics/feedback');
  },
};
