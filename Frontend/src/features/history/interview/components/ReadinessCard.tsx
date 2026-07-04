
interface ReadinessCardProps {
  percentage: number | null;
}

export default function ReadinessCard({ percentage }: ReadinessCardProps) {
  const displayPercentage = percentage ?? 0;
  const hasPercentage = percentage !== null;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div className="bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[220px]">
      <h3 className="text-[14px] font-bold text-gray-500 uppercase tracking-widest mb-4 w-full text-left">
        Overall Readiness
      </h3>

      <div className="relative flex items-center justify-center">
        {/* SVG Circular Progress */}
        <svg className="w-36 h-36 transform -rotate-90">
          {/* Background Track */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-gray-800/60"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Active Fill */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-[#00E599] transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        {/* Percentage Text inside Circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono text-white">
            {hasPercentage ? `${percentage}%` : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}
