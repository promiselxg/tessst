import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px] bg-[whitesmoke]">
      <div className="w-[90%] md:w-[1300px] mx-auto space-y-6">
        <Skeleton className="w-40 h-6 bg-gray-300" />
        <div className="w-full bg-white rounded-lg p-4 shadow flex flex-col md:flex-row gap-6">
          <Skeleton className="w-full md:w-1/2 h-[300px] bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-3/4 bg-gray-200" />
            <Skeleton className="h-6 w-1/2 bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
          </div>
        </div>
        <Skeleton className="w-full h-40 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
