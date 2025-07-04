// Voucher Types
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

// API Response Types
export interface VouchersResponse {
  success: boolean;
  vouchers: Voucher[];
}

// Computed properties for display
export interface VoucherDisplay extends Voucher {
  // Computed fields for table display
  discountDisplay: string;
  statusText: string;
  formattedCreatedAt: string;
}

// Filter options
export type VoucherFilterType = "ALL" | "PERCENT" | "AMOUNT";
export type VoucherStatusType = "ALL" | "REDEEMED" | "AVAILABLE";

// Stats interface
export interface VoucherStats {
  total: number;
  redeemed: number;
  available: number;
  totalValue: number;
  percentVouchers: number;
  amountVouchers: number;
}
