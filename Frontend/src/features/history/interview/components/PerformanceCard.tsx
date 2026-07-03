import { LucideIcon } from 'lucide-react';

export interface PerformanceCategory {
  name: string;
  score: number | null;
  icon: LucideIcon;
}

interface PerformanceCardProps {
  categories: PerformanceCategory[];
}

export default function PerformanceCard({ categories }: PerformanceCardProps) {
  return (
    <div className="bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 w-full">
        <h3 className="text-[15px] font-bold text-gray-500 uppercase tracking-widest">
          Performance Breakdown
        </h3>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const displayScore = cat.score ?? 0;
          return (
            <div key={idx} className="space-y-4">
              <div className="flex items-center justify-between text-[14px] font-semibold">
                <div className="flex items-center gap-2 text-gray-300">
                  <Icon size={14} className="text-gray-400" />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[#00E599] font-mono font-bold">
                  {cat.score !== null ? `${cat.score}/100` : ''}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-gray-800/60 rounded-full overflow-hidden w-full">
                <div
                  className="bg-[#00E599] h-full rounded-full transition-all duration-500"
                  style={{ width: `${displayScore}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
