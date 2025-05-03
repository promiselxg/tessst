import Container from "@/components/container/container";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full flex h-fit py-[40px] md:py-[85px] bg-[whitesmoke]">
      <div className="flex flex-col w-full mx-auto">
        <div className="py-5 bg-emerald-950 mt-[45px] md:mt-0">
          <Container className="w-[90%] md:w-[1300px] mx-auto"></Container>
        </div>

        <Container className="w-[90%] md:w-[1300px] mx-auto">
          <div className="w-full flex justify-between gap-5 h-fit mt-10">
            <div className="w-[75%] flex flex-col gap-4">
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
            <div className="w-[25%] flex flex-col gap-4">
              <Skeleton className="h-40 w-full rounded-md" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Loading;
