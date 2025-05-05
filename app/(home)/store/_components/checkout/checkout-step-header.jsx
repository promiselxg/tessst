import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CheckoutStepHeader = ({
  icon: Icon,
  label,
  actionText = "Change",
  href,
  completed,
}) => {
  return (
    <div className="w-full border-b border-[#eee] p-3 flex items-center justify-between">
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-semibold",
          !completed && "opacity-55"
        )}
      >
        {Icon && (
          <Icon
            className={cn("w-5 h-5", completed && "text-green-600 font-[600]")}
          />
        )}
        <span className="text-sm">{label}</span>
      </div>
      {href && (
        <div className="flex items-center gap-2 text-sm">
          <Link href={href} className="flex items-center gap-2 text-blue-600">
            {actionText}
            <FiChevronRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutStepHeader;
