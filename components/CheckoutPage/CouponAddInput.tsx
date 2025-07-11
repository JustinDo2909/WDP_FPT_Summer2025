'use client';

import { useMemo, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Button from "../CustomButton";
import { Row, Wrap } from "@/lib/by/Div";
import { calculateVoucherSavings, formatDiscount } from "./seg/calculateVoucherDiscount";
import { VoucherItem } from "./VoucherItem";

interface CouponAddInputProps {
  vouchers?: IVoucher[];
  setVoucherDiscount: (voucherDiscount: number) => void;
  onSelect: (voucher: IVoucher) => void;
  cartItems: ICartLineItem[];
}

export const CouponAddInput: React.FC<CouponAddInputProps> = ({
  vouchers,
  setVoucherDiscount,
  onSelect,
  cartItems,
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const cartProductIds = useMemo(
    () => cartItems.map(item => item.product_id),
    [cartItems]
  );

  const sortedVouchers = useMemo(() => {
    if (!vouchers) return [];
    return vouchers
      .map(voucher => {
        const applicable = Array.isArray(voucher.voucherProducts) &&
          voucher.voucherProducts.some(vp => cartProductIds.includes(vp.product.id));
        const savings = applicable ? calculateVoucherSavings(voucher, cartItems) : 0;
        return { voucher, applicable, savings };
      })
      .sort((a, b) => {
        if (a.applicable !== b.applicable) return a.applicable ? -1 : 1;
        return b.savings - a.savings; // Sort by savings in descending order
      });
  }, [vouchers, cartProductIds, cartItems]);

  const selected = sortedVouchers.find(v => v.voucher.id === selectedId);

  const handleApply = () => {
    if (selected?.voucher && selected.applicable) {
      const discount = calculateVoucherSavings(selected.voucher, cartItems);
      onSelect(selected.voucher);
      setVoucherDiscount(discount);
    }
  };

  return (
    <Row className="flex items-end gap-2">
      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger className="
          w-[450px] border-2 border-dashed border-primary
          bg-gradient-to-r from-primary/5 to-primary/10
          hover:from-primary/10 hover:to-primary/15
          transition-all duration-200 focus-visible:ring-0
        ">
          <SelectValue placeholder="🎫 Select a voucher">
            {selected?.voucher ? (
              <span className="text-primary font-semibold">{formatDiscount(selected.voucher)}</span>
            ) : (
              "Select a voucher"
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[450px] max-h-[400px] overflow-y-auto">
          {sortedVouchers.length === 0 && (
            <Wrap className="px-4 py-2 text-muted-foreground">
              No coupons available
            </Wrap>
          )}
          {sortedVouchers.map(({ voucher, applicable }) => (
            <SelectItem
              key={voucher.id}
              value={voucher.id}
              disabled={voucher.redeemed || !applicable}
              className="py-1 px-0 focus:bg-transparent"
            >
              <VoucherItem
                voucher={voucher}
                applicable={applicable}
                cartItems={cartItems}
              />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        label="Apply"
        type="button"
        disabled={!selected?.voucher || !selected.applicable}
        onClick={handleApply}
      />
    </Row>
  );
};

export default CouponAddInput;