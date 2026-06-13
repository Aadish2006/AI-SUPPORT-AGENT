import React from 'react';
import { ThumbsUp, ThumbsDown, AlertCircle, Brain } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';
import { getConfidenceInfo } from '../../utils/formatters';

export default function FeedbackStatsPanel({ stats, negativeList }) {
  const { totalFeedback, thumbsUp, thumbsDown, positiveRate } = stats;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Feedback Statistics</h3>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-surface-700/60 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-white">{totalFeedback.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Total Feedback</p>
        </div>
        <div className="bg-accent-green/5 border border-accent-green/15 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <ThumbsUp className="w-3 h-3 text-accent-green" />
            <p className="text-lg font-bold text-accent-green">{thumbsUp.toLocaleString()}</p>
          </div>
          <p className="text-[10px] text-gray-500">Positive</p>
        </div>
        <div className="bg-accent-red/5 border border-accent-red/15 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <ThumbsDown className="w-3 h-3 text-accent-red" />
            <p className="text-lg font-bold text-accent-red">{thumbsDown.toLocaleString()}</p>
          </div>
          <p className="text-[10px] text-gray-500">Negative</p>
        </div>
      </div>

      {/* Ratio bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-accent-green font-medium">{formatPercent(positiveRate)} positive</span>
          <span className="text-accent-red font-medium">{formatPercent(100 - positiveRate)} negative</span>
        </div>
        <div className="h-2.5 bg-surface-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-green to-brand-500 rounded-full transition-all duration-1000"
            style={{ width: `${positiveRate}%` }}
          />
        </div>
      </div>

      {/* Negative feedback list */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <AlertCircle className="w-3.5 h-3.5 text-accent-red" />
          <h4 className="text-xs font-semibold text-gray-300">Recent Negative Feedback</h4>
        </div>
        <div className="space-y-2">
          {negativeList.map((item) => {
            const conf = getConfidenceInfo(item.confidence);
            return (
              <div
                key={item.id}
                className="p-3 bg-surface-700/50 border border-white/[0.04] rounded-xl"
              >
                <p className="text-xs text-gray-300 leading-relaxed">{item.message}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-gray-600">{item.timestamp}</span>
                  <span className="text-[10px] text-gray-600">·</span>
                  <span className="text-[10px] text-gray-500">{item.category}</span>
                  <div className={`flex items-center gap-1 ml-auto text-[10px] font-medium ${conf.color}`}>
                    <Brain className="w-2.5 h-2.5" />
                    {formatPercent(item.confidence * 100, 0)} conf.
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
