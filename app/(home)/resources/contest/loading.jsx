import { CalendarCheck2, CalendarX2 } from "lucide-react";

const Loading = () => {
  return (
    <>
      <div className="p-[17px] bg-emerald-950 text-white mt-[85px]">
        <div className="w-[90%] md:w-[1100px] mx-auto">
          <div className="h-4 w-[150px] bg-gray-400 animate-pulse rounded" />
        </div>
      </div>

      <div className="w-full flex h-fit py-[40px] md:py-[50px]">
        <div className="w-[90%] md:w-[1100px] mx-auto">
          <div className="flex flex-col w-full mx-auto">
            <div className="w-full">
              <div className="w-full flex">
                <div className="w-full h-[300px] md:h-[400px] bg-gray-300 animate-pulse rounded" />
              </div>

              <div className="bg-white p-5 flex flex-col gap-4">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />

                <div className="w-full flex gap-5 justify-between md:items-center flex-col md:flex-row">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Start:</span>
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <CalendarCheck2 className="w-4 h-4" />
                      <div className="w-[100px] h-4 bg-gray-200 animate-pulse rounded" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">End:</span>
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <CalendarX2 className="w-4 h-4" />
                      <div className="w-[100px] h-4 bg-gray-200 animate-pulse rounded" />
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 animate-pulse rounded w-full"
                    />
                  ))}
                </div>

                <div className="py-5">
                  <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
                </div>

                <div className="w-full">
                  <div className="bg-gray-300 text-white h-10 rounded-md animate-pulse w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
