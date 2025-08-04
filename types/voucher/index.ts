export interface Voucher {
  id: string;
  voucher_template_id: string;
  stripe_coupon_id: string;
  user_id: string;
  order_id: string | null;
  redeemed: boolean;
  redeemed_at: string | null;
  expired_at: string;
  created_at: string;
  updated_at: string;
  voucherTemplate: VoucherTemplate;
  user: {
    id: string;
    email: string;
    name: string;
  };
  order: unknown | null;
}

export interface VouchersResponse {
  success: boolean;
  vouchers: Voucher[];
}

export interface VoucherDisplay extends Voucher {
  type: "PERCENT" | "AMOUNT";
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

// Voucher Template Types
export interface VoucherTemplateProduct {
  product: {
    id: string;
    title: string;
    image_url: string;
    price: number;
    sale_price: number | null;
  };
}

export interface VoucherTemplate {
  id: string;
  discount_value: number;
  type: "PERCENT" | "AMOUNT";
  user_limit: number;
  user_count: number;
  min_order_amount: number;
  is_active: boolean;
  event_id: string;
  leaderboard_reward_id: string | null;
  created_at: string;
  updated_at: string;
  voucherProducts: VoucherTemplateProduct[];
  leaderboardReward: unknown | null;
  _count: {
    vouchers: number;
  };
}

export interface VoucherTemplatesResponse {
  success: boolean;
  voucher_templates: VoucherTemplate[];
}

export interface VoucherTemplateResponse {
  success: boolean;
  voucher_template: VoucherTemplate;
}

export interface CreateVoucherTemplateRequest {
  discount_value: number;
  type: "PERCENT" | "AMOUNT";
  user_limit: number;
  productIds: string[];
}

export interface UpdateVoucherTemplateRequest {
  discount_value?: number;
  type?: "PERCENT" | "AMOUNT";
  user_limit?: number;
  productIds?: string[];
  is_active?: boolean;
}

export interface VoucherTemplateFilterParams {
  is_active?: boolean;
  include_leaderboard?: boolean;
}
