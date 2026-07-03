import { ChevronLeft } from 'lucide-react';
import Skeleton from '../../../../shared/components/Skeleton';

export default function SessionSkeleton() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Decorative gradient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00E599]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="no-scrollbar flex-1 w-full max-w-6xl mx-auto px-4 pt-8 md:pt-12 space-y-8 relative z-10 animate-pulse">
        {/* Header Block Skeleton */}
        <div className="flex items-center gap-4 border-b border-gray-800 pb-6">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-800 bg-[#181d2c]/50 text-gray-400"
            disabled
          >
            <ChevronLeft size={20} />
          </button>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-2/3 md:w-1/3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 rounded" />
              <span className="text-gray-700 font-normal">•</span>
              <Skeleton className="h-4 w-12 rounded" />
            </div>
          </div>
        </div>

        {/* First Row: Score and AI Summary Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Score Card Skeleton */}
          <div className="md:col-span-1">
            <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] max-h-[300px]">
              <span className="text-[14px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                Overall Score
              </span>
              <div className="flex items-baseline gap-1 mb-4">
                <Skeleton className="h-12 w-16" />
                <span className="text-lg font-bold text-gray-400">/100</span>
              </div>
              <Skeleton className="h-6 w-24 rounded" />
            </div>
          </div>

          {/* AI Summary Card Skeleton */}
          <div className="md:col-span-2">
            <div className="bg-[#111623]/20 border border-gray-800/40 rounded-xl p-6 flex flex-col justify-start min-h-[180px] max-h-[300px]">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-5 rounded" />
                <span className="text-[15px] font-bold text-gray-500 uppercase tracking-widest">
                  AI Summary
                </span>
              </div>
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Strengths, Focus Areas, Next Steps Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {/* Strengths Skeleton */}
          <div className="bg-[#111623] border border-gray-800 rounded-xl p-5 flex flex-col min-h-[180px] max-h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5 rounded" />
              <span className="text-[15px] font-bold text-gray-500 uppercase tracking-widest">
                Strengths
              </span>
            </div>
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Focus Areas Skeleton */}
          <div className="bg-[#111623] border border-gray-800 rounded-xl p-5 flex flex-col min-h-[180px] max-h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5 rounded" />
              <span className="text-[15px] font-bold text-gray-500 uppercase tracking-widest">
                Focus Areas
              </span>
            </div>
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Next Steps Skeleton */}
          <div className="bg-[#111623] border border-gray-800 rounded-xl p-5 flex flex-col min-h-[180px] max-h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5 rounded" />
              <span className="text-[15px] font-bold text-gray-500 uppercase tracking-widest">
                Next Steps
              </span>
            </div>
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* Third Row: Dialog Transcript Header */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Transcript
            </h2>
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="w-full h-px bg-gray-800/80" />
        </div>
      </div>
    </div>
  );
}
