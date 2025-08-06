import { keyBy, mapValues } from "lodash";

/**
 * Creates a map of cartItemId ➔ savings based on the voucher.
 */
export function createVoucherMap(
  voucher: IVoucher | undefined,
  items: ICartLineItem[],
): Record<string, number> {
  // Log inputs
  console.log("Input voucher:", voucher);
  console.log("Input items:", items);

  // Check if voucher is valid and has applicable products
  if (!voucher || !voucher.voucherTemplate.voucherProducts?.length) {
    console.log("No voucher or no applicable products, returning empty map");
    return {};
  }

  // Get applicable product IDs
  const voucherProductIds = voucher.voucherTemplate.voucherProducts.map(
    (vp) => vp.product.id,
  );
  console.log("Voucher product IDs:", voucherProductIds);

  // Key cart items by ID for lookup
  const itemsById = keyBy(items, (item) => item.id);
  console.log("Items keyed by ID:", itemsById);

  // Calculate total eligible price per cart item
  const savingsMap = mapValues(itemsById, (item) => {
    if (!voucherProductIds.includes(item.product_id)) {
      console.log(`Item ${item.id} not eligible for voucher`);
      return 0;
    }

    const price = item.product.sale_price ?? item.product.price;
    const quantity = item.quantity ?? 1;
    const total = price * quantity;
    console.log(
      `Item ${item.id}: price=${price}, quantity=${quantity}, total=${total}`,
    );

    if (voucher.voucherTemplate.type === "PERCENT") {
      const savings = Math.round(total * (voucher.voucherTemplate.discount_value / 100));
      console.log(
        `Item ${item.id}: PERCENT voucher, discount_value=${
          voucher.voucherTemplate.discount_value
        }%, savings=${savings}`,
      );
      return savings;
    } else {
      console.log(`Item ${item.id}: Non-PERCENT voucher, initial savings=0`);
      return 0; // will compute below
    }
  });
  console.log("Initial savings map:", savingsMap);

  // For FIXED/AMOUNT, distribute evenly across applicable items
  if (voucher.voucherTemplate.type !== "PERCENT") {
    const applicableItems = items.filter((item) =>
      voucherProductIds.includes(item.product_id),
    );
    console.log("Applicable items for FIXED/AMOUNT:", applicableItems);

    if (applicableItems.length > 0) {
      const perItem = Math.floor(
        voucher.voucherTemplate.discount_value / applicableItems.length,
      );
      console.log(
        `FIXED/AMOUNT voucher: total_discount=${
          voucher.voucherTemplate.discount_value
        }, perItem=${perItem}`,
      );
      applicableItems.forEach((item) => {
        savingsMap[item.id] = perItem;
        console.log(`Updated savings for item ${item.id}: ${perItem}`);
      });
    } else {
      console.log("No applicable items for FIXED/AMOUNT voucher");
    }
  }

  console.log("Final savings map:", savingsMap);
  return savingsMap;
}