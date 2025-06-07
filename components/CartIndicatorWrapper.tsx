'use client'

import { Begin } from "@/lib/by/Div";
import { useGetCartQuery } from "@/process/api/apiCart";
import { ReactNode, useEffect, useState } from "react";


interface CartIndicatorProps {
  children: ReactNode;
}

export const CartIndicatorWrapper: React.FC<CartIndicatorProps> = ({ children }) => {
  const { data: cartData, isLoading } = useGetCartQuery();
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    if (cartData?.cart.cartItems) {
      setCartItemCount(cartData.cart.cartItems.length);
    }
  }, [cartData]);

  if (isLoading) {
    return (
    <Begin className="relative inline-block">
      {children}
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-10">
          ...
        </span>
    </Begin>
    )
  }

  return (
    <Begin className="relative inline-block">
      {children}
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-10">
          {cartItemCount ?? 0}
        </span>
    </Begin>
  );
};
