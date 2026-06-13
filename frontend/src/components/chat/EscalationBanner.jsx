import React from 'react';
import { AlertTriangle, UserCheck, Clock } from 'lucide-react';

export default function EscalationBanner() {
  return (
    <div className="mx-4 mb-3 animate-slide-up">
      <div className="bg-accent-red/5 border border-accent-red/20 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-red/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-accent-red" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-white">Escalated to Human Agent</h4>
              <span className="status-badge bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              This conversation has been escalated. A support specialist will join shortly.
            </p>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-[11px] text-gray-400">Agent assigned: <span className="text-white font-medium">Sarah K.</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-yellow" />
                <span className="text-[11px] text-gray-400">Est. wait: <span className="text-accent-yellow font-medium">~2 min</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
