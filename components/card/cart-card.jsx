"use client";

import { useCartStore } from "@/store/cartStore";
import React from "react";
import CartItem from "../cart/cart-item";
import CartPriceSummary from "../cart/cart-price-summary";
import { ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";

const CartItems = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCartStore();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
      {cart.length > 0 && (
        <div className="flex gap-8 w-full mt-7 flex-col md:flex-row">
          <div className="w-full md:w-[70%] bg-white  shadow-sm border border-[#eee]">
            <div className="p-3 border-b-[1px] border-[#eee] flex items-center w-full">
              <h1 className="font-euclid text-[20px] font-[400]">
                Cart ({cart.length}){" "}
              </h1>
            </div>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onIncrease={() => addToCart(item)}
                  onDecrease={() => decreaseQuantity(item.id)}
                />
              ))}
            </div>
          </div>
          <CartPriceSummary subtotal={subtotal} />
        </div>
      )}

      {cart.length < 1 && (
        <div className="flex gap-8 w-full mt-7 flex-col md:flex-row">
          <div className="w-full bg-white  shadow-sm border border-[#eee]">
            <div className="p-10 flex flex-col justify-center gap-y-3 text-center items-center">
              <span>
                <ShoppingBasket size={100} />
              </span>
              <p className="text-[16px] font-euclid font-[600]">
                Your cart is empty!
              </p>
              <p className="text-sm text-[--course-text-color]">
                Browse our categories and discover our best deals!
              </p>
              <Button className="h-12 bg-[--app-primary-color] my-5">
                Continue shopping
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItems;
