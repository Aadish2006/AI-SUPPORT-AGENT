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
      <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
        <div className="glass-card relative overflow-hidden p-6 sm:p-7 bg-gradient-card">
          <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-[11px] font-medium text-brand-300 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                Live support overview
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">System Dashboard</h1>
              <p className="text-sm text-gray-400 mt-2 max-w-xl leading-relaxed">
                Track AI-assisted customer support activity, resolution trends, and escalation volume from one place.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start">
              <button
                onClick={() => window.location.reload()}
                className="btn-ghost text-xs bg-surface-700/70 border border-white/[0.06]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-accent-yellow/5 border border-accent-yellow/20 rounded-2xl text-xs text-accent-yellow">
            Note: Showing offline cache. Check backend connection to sync live data.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 lg:col-span-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />
            <div className="relative space-y-4">
              <h2 className="text-sm font-semibold text-white mb-2">Platform Overview</h2>
              <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                The SupportAI system uses a retrieval-augmented workflow to answer customer questions from the knowledge base first, then escalates unresolved or high-risk cases for human review.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-white/[0.05] bg-surface-700/50 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">Routing mode</p>
                  <p className="mt-1 text-sm font-semibold text-white">Hybrid AI + human</p>
                </div>
                <div className="rounded-xl border border-white/[0.05] bg-surface-700/50 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">Last refresh</p>
                  <p className="mt-1 text-sm font-semibold text-white">{now}</p>
                </div>
                <div className="rounded-xl border border-white/[0.05] bg-surface-700/50 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">Data source</p>
                  <p className="mt-1 text-sm font-semibold text-white">Knowledge base</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-sm font-semibold text-white mb-3">Operational snapshot</h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-surface-700/60 px-3 py-2 border border-white/[0.04]">
                <span className="text-gray-400">Total requests</span>
                <span className="font-semibold text-white">{displayTotal}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-700/60 px-3 py-2 border border-white/[0.04]">
                <span className="text-gray-400">AI resolved</span>
                <span className="font-semibold text-accent-green">{displayResolved}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-700/60 px-3 py-2 border border-white/[0.04]">
                <span className="text-gray-400">Escalated</span>
                <span className="font-semibold text-accent-yellow">{displayEscalated}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-700/60 px-3 py-2 border border-white/[0.04]">
                <span className="text-gray-400">Snapshot time</span>
                <span className="font-semibold text-white">{now}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
