'use client'

import React from "react";
import { useAddToCartMutation } from "@/process/api/apiCart";

interface AddToCartWrapperProps {
  productId: string;
  quantity?: number;
  children: React.ReactElement<any, any>;
}

const AddToCartWrapper: React.FC<AddToCartWrapperProps> = ({
  productId,
  quantity = 1,
  children,
}) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault(); // ✅ prevent default action
    try {
      await addToCart({ productId, quantity }).unwrap();
      // Optionally emit WebSocket event or show a toast
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  return React.cloneElement(children, {
    onClick: handleClick,
    disabled: isLoading || children.props.disabled,
  });
};

export default AddToCartWrapper;
