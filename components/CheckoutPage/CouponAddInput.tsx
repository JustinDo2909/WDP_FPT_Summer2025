import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Button from "../CustomButton";
import { formatPrice } from "@/lib/share/formatPrice";
import { Row } from "@/lib/by/Div";

// The IVoucher interface remains the same
export interface IVoucher {
  id: string;
  user_id: string;
  event_reward_id: string;
  stripe_coupon_id: string;
  discount_value: number;
  type: "PERCENT" | "AMOUNT";
  redeemed: boolean;
  redeemed_at: string | null;
  created_at: string;
}

interface CouponAddInputProps {
  vouchers?: IVoucher[];
  onSelect: (voucher: IVoucher) => void;
}

// Helper function to format the discount for display
const formatDiscount = (voucher: IVoucher) => {
  return voucher.type === "PERCENT"
    ? `${voucher.discount_value}% OFF`
    : `${formatPrice(voucher.discount_value)} OFF`;
};

// A dedicated component for rendering the voucher item for better readability
const VoucherItem: React.FC<{ voucher: IVoucher }> = ({ voucher }) => {
  const isRedeemed = voucher.redeemed;

  const voucherClasses = `
    relative w-full p-4 min-w-72 rounded-lg border-2 border-dashed transition-all duration-200
    ${isRedeemed
      ? 'border-gray-300 bg-gray-50 opacity-60 cursor-not-allowed'
      : 'border-primary-light bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100'
    }
  `;
  
  const statusClasses = `
    px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide
    ${isRedeemed
      ? 'bg-red-100 text-red-700'
      : 'bg-green-100 text-green-700'
    }
  `;

  return (
    <div className={voucherClasses}>
      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              {formatDiscount(voucher)}
            </span>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            Coupon 
          </span>
        </div>

        <div className="flex flex-col items-end">
          <div className={statusClasses}>
            {isRedeemed ? "Used" : "Valid"}
          </div>
          {!isRedeemed && (
            <div className="text-xs text-gray-500 mt-1">
              Expires soon
            </div>
          )}
        </div>
      </div>
       {/* Voucher pattern background */}
       <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
    </div>
  );
};


export const CouponAddInput: React.FC<CouponAddInputProps> = ({ vouchers, onSelect }) => {
  const [selectedId, setSelectedId] = React.useState<string | undefined>(undefined);
  const selectedVoucher = vouchers?.find(v => v.id === selectedId);

  // Decoupled handler: Selecting only updates the state. The button click triggers the onSelect prop.
  const handleAddClick = () => {
    if (selectedVoucher) {
      onSelect(selectedVoucher);
      // Optional: Clear selection after adding
      // setSelectedId(undefined); 
    }
  };

  return (
    // The `items-end` class will align the bottom of the Select and Button for a cleaner look
    <Row className="flex items-end gap-2">
      <Select value={selectedId} onValueChange={setSelectedId}>
        {/* Removed fixed height `h-20` to allow for natural content height and better alignment with button */}
        <SelectTrigger className="w-80 border-2 border-dashed border-primary bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all duration-200 focus-visible:ring-0">
          <SelectValue placeholder="🎫 Select a voucher" className="text-primary font-medium">
            {/* When a voucher is selected, display its value in the trigger */}
            {selectedVoucher ? (
              <span className="text-primary font-semibold">{formatDiscount(selectedVoucher)}</span>
            ) : (
              "🎫 Select a voucher"
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-80">
          {vouchers?.length === 0 && (
            <div className="px-4 py-2 text-muted-foreground">No coupons available</div>
          )}
          {vouchers?.map(voucher => (
            <SelectItem
              key={voucher.id}
              value={voucher.id}
              disabled={voucher.redeemed}
              className="p-0 focus:bg-transparent" // Use p-0 to let child fill the space
            >
              <VoucherItem voucher={voucher} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        label={'Add'}
        type="button"
        disabled={!selectedId}
        onClick={handleAddClick}
      />
    </Row>
  );
};

export default CouponAddInput;