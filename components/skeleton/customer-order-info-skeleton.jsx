import React from "react";
import { Skeleton } from "../ui/skeleton";

const CustomerOrderInfoSkeleton = () => {
  return (
    <>
      <div className="p-6 bg-[whitesmoke] min-h-screen space-y-4">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="w-48 h-8" />
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-9/12 flex flex-col gap-5">
            <div className="w-full bg-white border rounded-[8px] p-4 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-40 h-3" />
                </div>
              </div>
              <Skeleton className="w-24 h-8" />
            </div>
            <div className="bg-white border rounded-[8px]">
              <div className="p-5 border-b">
                <Skeleton className="w-32 h-4" />
              </div>
              <div className="p-5 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-4" />
                ))}
              </div>
            </div>
          </div>

          <div className="w-1/4 h-fit rounded-[8px] bg-white p-4 border space-y-3">
            <Skeleton className="w-24 h-24 rounded-full mx-auto" />
            <Skeleton className="w-32 h-4 mx-auto" />
            <Skeleton className="w-40 h-3 mx-auto" />
            <div className="space-y-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-full h-3" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrderInfoSkeleton;
