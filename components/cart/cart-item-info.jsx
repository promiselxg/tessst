import Link from "next/link";

const CartItemInfo = ({ item }) => {
  return (
    <div className="flex-1">
      <Link
        href={`/store/${item?.slug}`}
        className="font-medium text-sm line-clamp-2 md:line-clamp-none leading-4 md:leading-none mb-1  md:mb-0"
      >
        {item.name}
      </Link>
      <p className="text-xs text-red-500">{item?.stock} units left</p>
    </div>
  );
};

export default CartItemInfo;
