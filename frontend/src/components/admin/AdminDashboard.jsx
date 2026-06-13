import React from 'react';
import {
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Brain,
  TrendingUp,
  Users,
  Star,
  Clock,
  Download,
  RefreshCw,
} from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import StatCard from './StatCard';
import ResolutionPieChart from './ResolutionPieChart';
import QueriesLineChart from './QueriesLineChart';
import TopicsBarChart from './TopicsBarChart';
import UnresolvedQuestionsTable from './UnresolvedQuestionsTable';
import FeedbackStatsPanel from './FeedbackStatsPanel';

export default function AdminDashboard() {
  const {
    stats,
    dailyQueries,
    topicDistribution,
    resolutionData,
    feedbackStats,
    unresolvedQuestions,
    negativeFeedback,
  } = useAnalytics();

  const now = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-surface-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface-800/80 backdrop-blur-sm border-b border-white/[0.05] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Analytics Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">Last updated: {now}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-xs">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button className="btn-ghost text-xs">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={MessageSquare}
            label="Total Queries"
            value={stats.totalQueries}
            subLabel="All time"
            trend="up"
            trendValue="+12.4%"
            color="brand"
            delay={0}
          />
          <StatCard
            icon={CheckCircle}
            label="Resolution Rate"
            value={`${stats.resolutionRate}%`}
            subLabel="AI resolved"
            trend="up"
            trendValue="+2.1%"
            color="green"
            delay={1}
          />
          <StatCard
            icon={AlertTriangle}
            label="Escalation Rate"
            value={`${stats.escalationRate}%`}
            subLabel="Human handoff"
            trend="down"
            trendValue="-1.3%"
            color="yellow"
            delay={2}
          />
          <StatCard
            icon={Brain}
            label="Avg Confidence"
            value={`${Math.round(stats.avgConfidence * 100)}%`}
            subLabel="AI certainty"
            trend="up"
            trendValue="+0.8%"
            color="blue"
            delay={3}
          />
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={Users} label="Active Users" value={stats.activeUsers} subLabel="Past 30 days" trend="up" trendValue="+8%" color="brand" delay={4} />
          <StatCard icon={Star} label="Satisfaction" value={`${stats.satisfactionScore * 20}`} subLabel="Out of 100" trend="up" trendValue="+3.2%" color="green" delay={5} />
          <StatCard icon={Clock} label="Avg Response" value={0} subLabel="1.4 seconds" color="blue" delay={6} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <ResolutionPieChart data={resolutionData} />
          </div>
          <div className="lg:col-span-3 flex">
            <QueriesLineChart data={dailyQueries} />
          </div>
        </div>

        {/* Topics + Unresolved */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopicsBarChart data={topicDistribution} />
          <UnresolvedQuestionsTable data={unresolvedQuestions} />
        </div>

        {/* Feedback */}
        <FeedbackStatsPanel stats={feedbackStats} negativeList={negativeFeedback} />
      </div>
    </div>
  );
}
