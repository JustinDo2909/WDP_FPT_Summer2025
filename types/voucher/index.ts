export interface Voucher {
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

export interface VouchersResponse {
  success: boolean;
  vouchers: Voucher[];
}

export interface VoucherDisplay extends Voucher {
  discountDisplay: string;
  statusText: string;
  formattedCreatedAt: string;
}

export type VoucherFilterType = "ALL" | "PERCENT" | "AMOUNT";
export type VoucherStatusType = "ALL" | "REDEEMED" | "AVAILABLE";

export interface VoucherStats {
  total: number;
  redeemed: number;
  available: number;
  usageRate: number;
  percentVouchers: number;
  amountVouchers: number;
}
