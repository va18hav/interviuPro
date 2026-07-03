import CustomInterviewCard from './CustomInterviewCard';
import TemplatesList from './TemplatesList';
import Skeleton from '../../../shared/components/Skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-8 lg:p-12">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 animate-pulse">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 md:w-80" />
          <Skeleton className="h-4 w-48 md:w-60" />
        </div>
        <div className="flex items-center gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[74px] w-24 md:w-28 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Static grid cards visible immediately */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <CustomInterviewCard />
        <TemplatesList />
      </div>

      {/* Table Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-7 w-48 mb-6" />
        <div className="bg-[#111623] border border-gray-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-5 border-b border-gray-800 bg-[#0B0F19]/50">
            <div className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Title</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Duration</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Score</div>
          </div>
          <div className="flex flex-col">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 p-5 items-center border-b border-gray-800 last:border-b-0">
                <div className="col-span-2">
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div>
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div>
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-3 w-12" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
