import { formatPrice } from "@/lib/share/formatPrice";

export function calculateVoucherSavings(
  voucher: IVoucher,
  cartItems: ICartLineItem[],
): number {
  const voucherProductIds = voucher.voucherTemplate.voucherProducts?.map((vp) => vp.product.id);
  const matchingCartItems = cartItems.filter((item) =>
    voucherProductIds?.includes(item.product_id),
  );

  const totalPrice = matchingCartItems.reduce((sum, item) => {
    const price = item.product.sale_price ?? item.product.price;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  if (voucher.voucherTemplate.type === "PERCENT") {
    return Math.round(totalPrice * (voucher.voucherTemplate.discount_value / 100));
  } else {
    return voucher.voucherTemplate.discount_value;
  }
}

export const formatDiscount = (voucher: IVoucher) =>
  voucher.voucherTemplate.type === "PERCENT"
    ? `${voucher.voucherTemplate.discount_value}% OFF`
    : `${formatPrice(voucher.voucherTemplate.discount_value)} OFF`;
