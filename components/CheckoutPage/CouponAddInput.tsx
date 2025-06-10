import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Button from "../CustomButton";
import { formatPrice } from "@/lib/share/formatPrice";

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
    onSelect: (voucher: IVoucher | null) => void;
}

export const CouponAddInput: React.FC<CouponAddInputProps> = ({ vouchers, onSelect }) => {
    const [selectedId, setSelectedId] = React.useState<string | undefined>(undefined);
    const handleSelect = (id: string) => {
        setSelectedId(id);
        const voucher = vouchers?.find(v => v.id === id);
        onSelect(voucher || null);
    };

    return (
        <div className="flex items-center gap-2">
            <Select value={selectedId} onValueChange={handleSelect}>
                <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select a coupon" />
                </SelectTrigger>
                <SelectContent>
                    {vouchers?.length === 0 && (
                        <div className="px-4 py-2 text-muted-foreground">No coupons available</div>
                    )}
                    {vouchers?.map(voucher => (
                        <SelectItem key={voucher.id} value={voucher.id} disabled={voucher.redeemed}>
                            <div className="flex flex-col">
                                <span>
                                    {voucher.type === "PERCENT"
                                        ? `${voucher.discount_value}% off`
                                        : `${formatPrice(voucher.discount_value)} off`}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {voucher.redeemed ? "Redeemed" : "Available"}
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                label={'Add'}
                type="button"
                disabled={!selectedId}
                onClick={() => {
                    const voucher = vouchers?.find(v => v.id === selectedId);
                    onSelect(voucher || null);
                }}
            >
                
            </Button>
        </div>
    );
};

export default CouponAddInput;