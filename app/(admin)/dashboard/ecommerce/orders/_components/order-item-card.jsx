import { formatCurrency } from "@/lib/utils/formatCurrency";
import Image from "next/image";

const OrderItemCard = ({ product, price, quantity }) => (
  <div className="grid grid-cols-6 gap-6 items-center p-4 border-b bg-white">
    <div className="col-span-3 flex items-center gap-4">
      <Image
        src={product?.product_main_image[0]?.public_url}
        alt={product?.name}
        width={50}
        height={50}
        className="rounded-md object-cover w-12 h-12"
      />
      <p className="text-xs font-medium text-slate-700">{product?.name}</p>
    </div>
    <div className="col-span-1 text-sm font-semibold text-slate-800">
      {formatCurrency(price)}
    </div>
    <div className="col-span-1 text-sm text-slate-600">{quantity}</div>
    <div className="col-span-1 text-sm font-semibold text-slate-800">
      {formatCurrency(price * quantity)}
    </div>
  </div>
);

export default OrderItemCard;
