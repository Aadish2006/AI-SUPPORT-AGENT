import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function FeedbackButtons({ messageId, feedback, onFeedback }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <span className="text-[10px] text-gray-600 mr-1">Was this helpful?</span>
      <button
        onClick={() => onFeedback(messageId, 'up')}
        className={`p-1.5 rounded-lg transition-all duration-200 group ${
          feedback === 'up'
            ? 'bg-accent-green/15 text-accent-green'
            : 'text-gray-600 hover:text-accent-green hover:bg-accent-green/10'
        }`}
        title="Helpful"
      >
        <ThumbsUp
          className="w-3 h-3"
          fill={feedback === 'up' ? 'currentColor' : 'none'}
        />
      </button>
      <button
        onClick={() => onFeedback(messageId, 'down')}
        className={`p-1.5 rounded-lg transition-all duration-200 ${
          feedback === 'down'
            ? 'bg-accent-red/15 text-accent-red'
            : 'text-gray-600 hover:text-accent-red hover:bg-accent-red/10'
        }`}
        title="Not helpful"
      >
        <ThumbsDown
          className="w-3 h-3"
          fill={feedback === 'down' ? 'currentColor' : 'none'}
        />
      </button>
    </div>
  );
}
