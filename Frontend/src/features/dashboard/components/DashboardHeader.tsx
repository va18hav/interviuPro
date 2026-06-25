export default function DashboardHeader({ firstName }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
      {/* Welcome Text */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Good morning, {firstName}.
        </h1>
        <p className="text-sm font-mono text-gray-400">
          Here is your interview performance summary.
        </p>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-4">
        {/* Metric 1 */}
        <div className="bg-[#111623] border border-gray-800 rounded-xl px-5 py-3 min-w-[100px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Interviews</p>
          <p className="text-2xl font-bold text-white">3</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#111623] border border-gray-800 rounded-xl px-5 py-3 min-w-[100px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avg. Score</p>
          <p className="text-2xl font-bold text-white">74%</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#111623] border border-gray-800 rounded-xl px-5 py-3 min-w-[100px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hours</p>
          <p className="text-2xl font-bold text-white">1.4h</p>
        </div>
      </div>
    </div>
  );
}
