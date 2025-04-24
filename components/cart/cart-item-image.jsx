import Image from "next/image";

const CartItemImage = ({ image, name }) => {
  return (
    <Image
      src={image}
      alt={name}
      width={70}
      height={70}
      className="w-[70px] h-[70px] object-contain"
    />
  );
};

export default CartItemImage;
