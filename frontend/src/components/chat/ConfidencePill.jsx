import React from 'react';
import { getConfidenceInfo, formatPercent } from '../../utils/formatters';
import { Brain } from 'lucide-react';

export default function ConfidencePill({ score }) {
  const { label, color, bg } = getConfidenceInfo(score);
  const pct = Math.round(score * 100);

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${bg} ${color}`}>
      <Brain className="w-2.5 h-2.5" />
      <span>{label} Confidence</span>
      <span className="opacity-60">·</span>
      <span>{formatPercent(pct, 0)}</span>
    </div>
  );
}
