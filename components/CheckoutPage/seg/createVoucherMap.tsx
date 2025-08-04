import { keyBy, mapValues } from "lodash";

/**
 * Creates a map of cartItemId ➔ savings based on the voucher.
 */
export function createVoucherMap(
  voucher: IVoucher | undefined,
  items: ICartLineItem[],
): Record<string, number> {
  if (!voucher || !voucher.voucherTemplate.voucherProducts?.length) {
    return {};
  }

  // Get applicable product IDs
  const voucherProductIds = voucher.voucherTemplate.voucherProducts.map(
    (vp) => vp.product.id,
  );

  // Key cart items by ID for lookup
  const itemsById = keyBy(items, (item) => item.id);

  // Calculate total eligible price per cart item
  const savingsMap = mapValues(itemsById, (item) => {
    if (!voucherProductIds.includes(item.product_id)) return 0;

    const price = item.product.sale_price ?? item.product.price;
    const quantity = item.quantity ?? 1;
    const total = price * quantity;

    if (voucher.voucherTemplate.type === "PERCENT") {
      return Math.round(total * (voucher.discount_value / 100));
    } else {
      // For FIXED/AMOUNT type, spread evenly across applicable items
      return 0; // will compute below
    }
  });

  // For FIXED/AMOUNT, distribute evenly across applicable items
  if (voucher.voucherTemplate.type !== "PERCENT") {
    const applicableItems = items.filter((item) =>
      voucherProductIds.includes(item.product_id),
    );
    if (applicableItems.length > 0) {
      const perItem = Math.floor(
        voucher.voucherTemplate.discount_value / applicableItems.length,
      );
      applicableItems.forEach((item) => {
        savingsMap[item.id] = perItem;
      });
    }
  }

  return savingsMap;
}
