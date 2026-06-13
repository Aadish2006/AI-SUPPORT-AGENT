import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { truncate } from '../../utils/formatters';

const PAGE_SIZE = 4;

const TrendBadge = ({ trend }) => {
  if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-accent-red" />;
  if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-accent-green" />;
  return <Minus className="w-3.5 h-3.5 text-gray-500" />;
};

const CATEGORY_COLORS = {
  Licensing: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
  Networking: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
  Pricing: 'text-accent-yellow bg-accent-yellow/10 border-accent-yellow/20',
  Warranty: 'text-accent-green bg-accent-green/10 border-accent-green/20',
  Account: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Hardware: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
};

export default function UnresolvedQuestionsTable({ data }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paged = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Top Unresolved Questions</h3>
          <p className="text-xs text-gray-500 mt-0.5">Questions the AI couldn't confidently answer</p>
        </div>
        <span className="status-badge bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px]">
          {data.length} unresolved
        </span>
      </div>

      <div className="space-y-2">
        {paged.map((item) => {
          const catColor = CATEGORY_COLORS[item.category] || 'text-gray-400 bg-surface-600 border-white/10';
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-surface-700/60 hover:bg-surface-700 border border-white/[0.04] rounded-xl transition-all duration-200 group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 group-hover:text-white transition-colors leading-snug">
                  {truncate(item.question, 85)}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${catColor}`}>
                    <Tag className="w-2.5 h-2.5" />
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-600">{item.lastSeen}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{item.occurrences}</p>
                  <p className="text-[10px] text-gray-600">times</p>
                </div>
                <TrendBadge trend={item.trend} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
          <span className="text-xs text-gray-500">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-surface-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-surface-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
