import Skeleton from '../../../../shared/components/Skeleton';

export default function InterviewCardSkeleton() {
  return (
    <div className="bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px]">
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2.5 flex-1">
            <Skeleton className="h-5 w-2/3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        </div>
        <div className="flex flex-wrap gap-1.5 min-h-[64px] my-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
      <div className="pt-4 border-t border-gray-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}
