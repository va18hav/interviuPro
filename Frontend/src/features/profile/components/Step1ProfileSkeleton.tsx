import Skeleton from '../../../shared/components/Skeleton';

export default function Step1ProfileSkeleton() {
  return (
    <div className="w-full relative max-w-2xl mx-auto flex flex-col items-center animate-pulse">
      {/* Header text skeleton */}
      <div className="text-center mb-10 mt-8 space-y-3 flex flex-col items-center w-full">
        <Skeleton className="h-9 w-80" />
        <Skeleton className="h-4 w-11/12 md:w-3/4" />
      </div>

      <div className="w-full space-y-8">
        {/* Personal Info Section Skeleton */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-2 mb-3">
            <h2 className="text-[10px] font-bold text-[#00E599] uppercase tracking-[0.2em]">Personal Info</h2>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-[46px] w-full rounded-md" />
            </div>
            <div className="flex-1 space-y-2.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-[46px] w-full rounded-md" />
            </div>
          </div>
        </section>

        {/* Technical Skills Section Skeleton */}
        <section className="space-y-2.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-[78px] w-full rounded-md" />
        </section>

        {/* Bottom Actions Skeleton */}
        <div className="pt-8">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
