// utils/useCartItemActions.ts

import { useRemoveFromCartMutation, useUpdateCartMutation } from "@/process/api/apiCart";

export function useCartItemActions() {
  const [removeFromCart, { isLoading: removing }] = useRemoveFromCartMutation();
  const [updateCart, { isLoading: updating }] = useUpdateCartMutation();

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId).unwrap();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCart({ productId, quantity: newQuantity }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  return {
    handleRemove,
    handleUpdateQuantity,
    isRemoving: removing,
    isUpdating: updating,
  };
}
