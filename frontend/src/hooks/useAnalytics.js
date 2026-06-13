import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../api/client';

const colors = ['#6366f1', '#06b6d4', '#22d3a5', '#f59e0b', '#f87171', '#8b5cf6'];

const emptyAnalytics = {
  stats: {
    totalQueries: 0,
    resolvedByAI: 0,
    escalated: 0,
    avgConfidence: 0,
    avgResponseTime: '0s',
    activeUsers: 1,
    resolutionRate: 0,
    escalationRate: 0,
    satisfactionScore: 0,
  },
  dailyQueries: [
    {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      queries: 0,
      resolved: 0,
      escalated: 0,
    },
  ],
  topicDistribution: [],
  resolutionData: [
    { name: 'Resolved by AI', value: 0, color: '#22d3a5', fill: '#22d3a5' },
    { name: 'Escalated', value: 0, color: '#f87171', fill: '#f87171' },
  ],
  feedbackStats: {
    totalFeedback: 0,
    thumbsUp: 0,
    thumbsDown: 0,
    positiveRate: 0,
  },
  unresolvedQuestions: [],
  negativeFeedback: [],
  confidenceDistribution: [],
};

export const useAnalytics = () => {
  const [data, setData] = useState(emptyAnalytics);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadAnalytics = async () => {
      try {
        const [summary, unresolved, topics, feedbackRows] = await Promise.all([
          apiClient.getAnalyticsSummary(),
          apiClient.getUnresolvedQuestions(),
          apiClient.getTopics(),
          apiClient.getFeedbackStats(),
        ]);

        if (cancelled) return;

        const thumbsUp = feedbackRows.find((row) => row.rating === 'thumbs_up')?.count || 0;
        const thumbsDown = feedbackRows.find((row) => row.rating === 'thumbs_down')?.count || 0;
        const totalFeedback = thumbsUp + thumbsDown;

        setData({
          stats: {
            totalQueries: summary.totalQueries,
            resolvedByAI: summary.aiResolvedQueries,
            escalated: summary.escalatedQueries,
            avgConfidence: 0,
            avgResponseTime: '0s',
            activeUsers: 1,
            resolutionRate: summary.resolutionRate,
            escalationRate: summary.escalationRate,
            satisfactionScore: totalFeedback ? Number(((thumbsUp / totalFeedback) * 5).toFixed(1)) : 0,
          },
          dailyQueries: [
            {
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              queries: summary.totalQueries,
              resolved: summary.aiResolvedQueries,
              escalated: summary.escalatedQueries,
            },
          ],
          topicDistribution: topics.map((topic, index) => ({
            topic: topic.topic,
            count: topic.count,
            color: colors[index % colors.length],
          })),
          resolutionData: [
            { name: 'Resolved by AI', value: summary.resolutionRate, color: '#22d3a5', fill: '#22d3a5' },
            { name: 'Escalated', value: summary.escalationRate, color: '#f87171', fill: '#f87171' },
          ],
          feedbackStats: {
            totalFeedback,
            thumbsUp,
            thumbsDown,
            positiveRate: totalFeedback ? Number(((thumbsUp / totalFeedback) * 100).toFixed(1)) : 0,
          },
          unresolvedQuestions: unresolved.map((item, index) => ({
            id: index + 1,
            question: item.question,
            occurrences: item.count,
            lastSeen: 'recently',
            category: 'Escalated',
            trend: 'stable',
          })),
          negativeFeedback: [],
          confidenceDistribution: [],
        });
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    };

    loadAnalytics();
    const interval = setInterval(loadAnalytics, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return useMemo(() => ({ ...data, error }), [data, error]);
};
