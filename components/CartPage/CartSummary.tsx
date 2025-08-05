import { formatPrice } from "../../lib/share/formatPrice";
import { Begin, Card, Column, Row, RText } from "@/lib/by/Div";

export default function CartSummary({
  subtotal,
  total,
  shipping,
  shippingLoading,
  actionButton,
  voucherDiscount,
}: {
  subtotal: number;
  total: number;
  shipping?: number;
  shippingLoading?: boolean;
  actionButton: React.ReactNode;
  voucherDiscount?: number;
}) {
  const finalTotal = total + (shipping ?? 0) - (voucherDiscount ?? 0);
  return (
    <Card className="border rounded-md p-4 space-y-4 relative pt-4 text-sm">
      {/* Pink top border */}
      <Begin className="absolute top-0 left-0 w-full h-1 bg-pink-500 rounded-t-md" />

      <h3 className="font-bold text-xl tracking-wide">Order summary</h3>

      <hr className="border-t border-gray-200" />
      <Column className="flex-col flex space-y-2">
        <Row className="flex justify-between">
          <RText>Subtotal:</RText>
          <RText className="font-semibold">{formatPrice(subtotal)}</RText>
        </Row>

        <Row className="flex text-gray-400 justify-between">
          <RText>Shipping:</RText>
          <RText>
            {shippingLoading ? "Calculating..." : formatPrice(shipping ?? 0)}
          </RText>
        </Row>

        {voucherDiscount !== 0 && (
          <Row className="flex text-primary justify-between">
            <RText>Voucher:</RText>
            <RText>-{formatPrice(voucherDiscount)}</RText>
          </Row>
        )}
      </Column>

      <hr className="border-t border-gray-200" />

      <Row className="flex justify-between text-pink-600 font-bold text-base">
        <RText>Total:</RText>
        <RText>{formatPrice(finalTotal)}</RText>
      </Row>

      <hr className="border-t border-gray-200" />
      {actionButton}
    </Card>
  );
}
