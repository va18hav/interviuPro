import Skeleton from '../../../../shared/components/Skeleton';

export default function SessionCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-5 bg-[#111623]/40 border border-gray-800/80 rounded-xl animate-pulse">
      <div className="flex items-center gap-4">
        {/* Left Icon Block */}
        <Skeleton className="w-12 h-12 rounded-lg" />

        {/* Title and Sub-details */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-24" />
            <span className="text-gray-700 font-normal">•</span>
            <Skeleton className="h-3.5 w-12" />
            <span className="text-gray-700 font-normal">•</span>
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
      </div>

      {/* Right Score, Verdict and Arrow */}
      <div className="flex items-center gap-6">
        {/* Score Block */}
        <div className="flex flex-col items-center justify-center min-w-[70px] space-y-1">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-2.5 w-8" />
        </div>

        {/* Verdict Badge */}
        <div className="min-w-[125px] flex justify-center">
          <Skeleton className="h-6 w-full rounded" />
        </div>

        {/* Chevron */}
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>
    </div>
  );
}
