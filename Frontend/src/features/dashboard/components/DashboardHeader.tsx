import type { DashboardStats } from '../types/dashboard.types';

interface DashboardHeaderProps {
  firstName: string;
  stats: DashboardStats;
}

// Small presentational component — only used here, so no need for a separate file.
function StatsCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#111623] border border-gray-800 rounded-xl px-5 py-3 min-w-[100px]">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardHeader({ firstName, stats }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          {getGreeting()}, {firstName || '—'}.
        </h1>
        <p className="text-sm font-mono text-gray-400">
          Here is your interview performance summary.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <StatsCard label="Interviews" value={stats.totalSessions} />
        <StatsCard label="Avg. Score" value={`${stats.averageScore}%`} />
        <StatsCard label="Hours" value={`${stats.totalHours}h`} />
      </div>
    </div>
  );
}
