import Link from "next/link";
import ImageFadeIn from "../animation/imageFadeIn";
import { Progress } from "../ui/progress";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function DonationCard({
  id,
  title,
  image,
  description,
  by,
  target,
  raised,
  daysLeft,
  progress,
}) {
  return (
    <Link href={`/donate/${id}`}>
      <div className="flex flex-col">
        <div className="w-full">
          <ImageFadeIn
            src={image}
            alt={title}
            width={200}
            height={200}
            priority
            className="w-full h-[200px] object-cover"
          />
        </div>

        <div className="p-5 bg-white shadow-sm border border-[#eee] border-t-0">
          <h1 className="font-semibold text-lg mb-1">{title}</h1>
          <p className="text-sm line-clamp-2">{description}</p>

          {/* Progress Info */}
          <div className="flex flex-col my-4 space-y-1">
            <p className="text-sm text-gray-600">by {by}</p>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Stats */}
          <div className="flex justify-between gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-sm md:font-semibold">
                &#8358;{target.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">Target</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm md:font-semibold">
                &#8358;{raised.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">Raised</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm md:font-semibold">{daysLeft}</span>
              <span className="text-sm text-gray-500">Days Left</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
