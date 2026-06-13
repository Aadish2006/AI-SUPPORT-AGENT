import React from 'react';
import { MessageSquare, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import StatCard from './StatCard';

export default function AdminDashboard() {
  const { stats, error } = useAnalytics();

  // Fallbacks in case backend has no data or is not yet initialized
  const displayTotal = stats?.totalQueries || 0;
  const displayResolved = stats?.resolvedByAI || 0;
  const displayEscalated = stats?.escalated || 0;

  const now = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex flex-col h-full bg-surface-900 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface-800/80 backdrop-blur-sm border-b border-white/[0.05] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">System Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">Last updated: {now}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-ghost text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
        {error && (
          <div className="p-4 bg-accent-yellow/5 border border-accent-yellow/20 rounded-2xl text-xs text-accent-yellow">
            Note: Showing offline cache. Check backend connection to sync live data.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={MessageSquare}
            label="Total Queries"
            value={displayTotal}
            subLabel="All incoming customer requests"
            color="brand"
            delay={0}
          />
          <StatCard
            icon={CheckCircle}
            label="Resolved Queries"
            value={displayResolved}
            subLabel="Questions answered by AI assistant"
            color="green"
            delay={1}
          />
          <StatCard
            icon={AlertTriangle}
            label="Escalated Queries"
            value={displayEscalated}
            subLabel="Transferred to human agents"
            color="yellow"
            delay={2}
          />
        </div>

        {/* Quick System Summary Banner */}
        <div className="glass-card p-6 bg-gradient-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
          <h2 className="text-sm font-semibold text-white mb-2">Platform Overview</h2>
          <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
            The SupportAI system utilizes a Retrieval-Augmented Generation (RAG) framework with Gemini to answer incoming customer questions. Queries that do not match available documentation or require actions are deterministically escalated to support agents.
          </p>
        </div>
      </div>
    </div>
  );
}
