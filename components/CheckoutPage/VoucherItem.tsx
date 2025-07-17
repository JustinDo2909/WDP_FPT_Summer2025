import { Column, Row, Wrap } from "@/lib/by/Div";
import { calculateVoucherSavings, formatDiscount } from "./seg/calculateVoucherDiscount";
import { formatPrice } from "@/lib/share/formatPrice";

const formatExpiryDate = (voucher: IVoucher) => {
  const expiry = new Date(new Date(voucher.created_at).getTime() + 2 * 24 * 60 * 60 * 1000);
  return expiry.toLocaleDateString("vi-VN");
};

// Voucher Item Component
export const VoucherItem: React.FC<{
  voucher: IVoucher;
  applicable: boolean;
  cartItems: ICartLineItem[];
}> = ({ voucher, applicable, cartItems }) => {
  const isRedeemed = voucher.redeemed;
  const savings = applicable ? calculateVoucherSavings(voucher, cartItems) : 0;

  return (
    <Row
      className={`
        flex w-full min-w-[450px] overflow-hidden rounded-lg border border-gray-200
        ${isRedeemed || !applicable ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
      `}
    >
      {/* Left Pill */}
      <Column className="flex flex-col items-center justify-center w-36 p-2 bg-pink-500 text-white text-center">
        <Wrap className="text-base font-bold">{formatDiscount(voucher)}</Wrap>
        <Wrap className="text-xs mt-1">Voucher</Wrap>
      </Column>

      {/* Right Content */}
      <Column className="flex flex-col flex-1 justify-between p-3 pr-8 bg-white">
        <Column className="flex flex-col">
          <Wrap className="text-base font-semibold text-gray-800">
            Get {formatDiscount(voucher)}
          </Wrap>
          <Wrap className="inline-block mt-2 px-2 py-0.5 bg-pink-500 text-white text-xs rounded">
            {applicable
              ? `Save ${formatPrice(savings)} on products`
              : "Cannot apply for product"}
          </Wrap>
        </Column>
        <Wrap className="text-xs text-gray-400 mt-2">
          Valid until {formatExpiryDate(voucher)}
        </Wrap>
      </Column>
    </Row>
  );
};