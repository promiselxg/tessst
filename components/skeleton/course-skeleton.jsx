export const CourseCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse rounded-lg overflow-hidden bg-white border border-[rgba(0,0,0,0.1)] shadow">
      <div className="bg-gray-200 h-[200px] w-full rounded-t-lg" />
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-3 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
};
