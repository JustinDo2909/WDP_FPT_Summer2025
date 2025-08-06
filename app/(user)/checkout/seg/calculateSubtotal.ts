export function calculateCartTotal(cartItems: ICartLineItem[]): number {
  return cartItems.reduce((total, item) => {
    const unitPrice = item.product.sale_price ?? item.product.price;
    return total + unitPrice * item.quantity;
  }, 0);
}

export function calculateCartTotalOriginalPrice(
  cartItems: ICartLineItem[],
): number {
  return cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

export function calculateOrderTotalOriginalPrice(
  orderItems: IOrderItem[],
): number {
  return orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}
