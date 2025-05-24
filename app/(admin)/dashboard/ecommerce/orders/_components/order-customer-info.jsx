import UserAvatar from "@/components/avatar/avatar";
import { AtSign, PhoneIcon, ShoppingBasket } from "lucide-react";

const CustomerInfoCard = ({ order }) => {
  return (
    <div className="w-full border rounded-[8px] border-[#eee] bg-white h-fit">
      <div className="w-full border-b-[1px] bg-white p-4">
        <h1 className="text-lg font-semibold">Customer</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-5 border-b-[1px]">
          <UserAvatar
            name={order?.user?.name}
            url={order?.user?.avatar ?? "https://github.com/shadcn.png"}
          />

          <div>
            <h1>{order?.user?.name}</h1>
          </div>
        </div>
        {order?.orderItems && (
          <div className="flex items-center gap-3 px-4 py-5 border-b-[1px]">
            <div className="bg-sky-200 p-2 h-10 w-10 flex items-center justify-center rounded-full">
              <ShoppingBasket className="w-5 h-5 text-sky-800" />
            </div>
            <div>
              <h1>{order?.orderItems?.length || 0} orders</h1>
            </div>
          </div>
        )}

        <div className="px-4 py-5 flex flex-col gap-2 border-b-[1px]">
          <h1>Contact info</h1>
          {order?.user?.email && (
            <div className="flex text-xs items-center gap-2">
              <AtSign className="w-4 h-4" />
              <span>{order?.user?.email}</span>
            </div>
          )}

          {order?.user?.phone && (
            <div className="flex text-xs items-center gap-2">
              <PhoneIcon className="w-4 h-4" />
              <span>{order?.user?.phone}</span>
            </div>
          )}
        </div>
        {order?.metadata?.delivery_address && (
          <div className="px-4 py-5 flex flex-col gap-2 border-b-[1px]">
            <h1>Delivery address</h1>
            <p className="text-slate-600 text-sm">
              {order?.metadata?.delivery_address}
            </p>
          </div>
        )}
        {order?.payment?.method && (
          <div className="px-4 py-5 flex flex-col gap-2">
            <h1>Payment Method</h1>
            <p className="text-slate-600 text-sm uppercase">
              {order?.payment?.method || "None"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInfoCard;
