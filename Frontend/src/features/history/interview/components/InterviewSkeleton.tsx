import { Filter } from 'lucide-react';
import Skeleton from '../../../../shared/components/Skeleton';

export default function InterviewSkeleton() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-8 font-sans relative overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00E599]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header Block Skeleton */}
        <div className="space-y-4 animate-pulse">
          <Skeleton className="h-10 w-2/3 md:w-1/2" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-32 rounded" />
            <span className="text-gray-700 font-normal">•</span>
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </div>

        {/* Overview Row: Readiness & Performance Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Card: Readiness Skeleton */}
          <div className="md:col-span-1">
            <div className="bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[220px] animate-pulse">
              <h3 className="text-[14px] font-bold text-gray-500 uppercase tracking-widest mb-4 w-full text-left">
                Overall Readiness
              </h3>
              <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gray-800/20 border-8 border-gray-800/40">
                <Skeleton className="h-6 w-12 rounded" />
              </div>
            </div>
          </div>

          {/* Right Card: Performance Breakdown Skeleton */}
          <div className="md:col-span-2">
            <div className="bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px] animate-pulse">
              <h3 className="text-[15px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                Performance Breakdown
              </h3>
              <div className="space-y-5 flex-1 flex flex-col justify-center">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-1.5 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Session History Table Skeleton */}
        <div className="bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 space-y-6 animate-pulse">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Session History
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-800 bg-[#181d2c]/30 text-gray-500 rounded-lg text-xs font-semibold tracking-wide"
              disabled
            >
              <Filter size={12} />
              <span>Filter</span>
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-800 text-[14px] font-bold text-gray-500 uppercase tracking-widest">
                  <th className="pb-3 font-semibold">Round Type</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Duration</th>
                  <th className="pb-3 font-semibold text-center">Score</th>
                  <th className="pb-3 font-semibold text-right">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {[...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-8 h-8 rounded-lg" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </td>
                    <td className="py-4">
                      <Skeleton className="h-3.5 w-20" />
                    </td>
                    <td className="py-4">
                      <Skeleton className="h-3.5 w-10" />
                    </td>
                    <td className="py-4 flex justify-center">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="py-4 text-right">
                      <div className="inline-block">
                        <Skeleton className="h-6 w-24 rounded" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
