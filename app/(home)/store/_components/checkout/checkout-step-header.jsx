import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const CheckoutStepHeader = ({
  icon: Icon,
  label,
  actionText = "Change",
  href,
}) => {
  return (
    <div className="w-full border-b border-[#eee] p-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
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
