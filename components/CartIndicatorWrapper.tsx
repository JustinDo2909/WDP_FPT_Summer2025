'use client'

import { Begin } from "@/lib/by/Div";
import { useGetCartQuery } from "@/process/api/apiCart";
import { setCartItems } from "@/process/store/cartSlice";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";


interface CartIndicatorProps {
  children: ReactNode;
}

export const CartIndicatorWrapper: React.FC<CartIndicatorProps> = ({ children }) => {
  const { data: cartData, isLoading } = useGetCartQuery();
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartData?.cart.cartItems) {
      dispatch(setCartItems(cartData.cart.cartItems)); //dispatch to redux store
      setCartItemCount(cartData.cart.cartItems.length);
    }
  }, [cartData, dispatch]);

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
