import { formatCurrency } from "@/lib/utils/formatCurrency";
import CartItemImage from "./cart-item-image";
import CartItemInfo from "./cart-item-info";
import QuantityController from "./cart-qty-control";
import RemoveButton from "./cart-remove-btn";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-start justify-between gap-4 border-b py-4">
      <div className="w-full flex justify-between p-5 ">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex items-center gap-4">
            <CartItemImage
              image={item?.product_main_image[0]?.public_url}
              name={item?.name}
            />
            <CartItemInfo item={item} />
            <div className="h-fit">
              <p className="font-bold md:text-lg mt-1">
                {formatCurrency(item?.price)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <RemoveButton onRemove={onRemove} />
            <QuantityController
              quantity={item.quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              productId={item.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
