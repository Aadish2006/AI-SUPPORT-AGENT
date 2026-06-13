import { useMemo } from 'react';
import {
  SUMMARY_STATS,
  DAILY_QUERIES,
  TOPIC_DISTRIBUTION,
  RESOLUTION_DATA,
  FEEDBACK_STATS,
  UNRESOLVED_QUESTIONS,
  NEGATIVE_FEEDBACK,
  CONFIDENCE_DISTRIBUTION,
} from '../data/mockAnalytics';

export const useAnalytics = () => {
  const data = useMemo(() => ({
    stats: SUMMARY_STATS,
    dailyQueries: DAILY_QUERIES,
    topicDistribution: TOPIC_DISTRIBUTION,
    resolutionData: RESOLUTION_DATA,
    feedbackStats: FEEDBACK_STATS,
    unresolvedQuestions: UNRESOLVED_QUESTIONS,
    negativeFeedback: NEGATIVE_FEEDBACK,
    confidenceDistribution: CONFIDENCE_DISTRIBUTION,
  }), []);

  return data;
};
