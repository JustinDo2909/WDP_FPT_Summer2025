export interface Voucher {
  id: string;
  code: string;
  name: string;
  description: string;
  discountType: "percentage" | "fixed_amount";
  discountValue: number;
  pointsRequired: number;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired" | "exhausted";
  usageLimit: number | null; // null = unlimited
  usedCount: number;
  createdDate: string;
  createdBy: string;
  minOrderAmount?: number; // minimum order amount to use voucher
  maxDiscountAmount?: number; // maximum discount for percentage vouchers
  applicableCategories?: string[]; // categories this voucher applies to
}

export interface VoucherUsage {
  id: string;
  voucherId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderId?: string;
  usedDate: string;
  discountAmount: number;
  orderAmount: number;
}

export interface VoucherRedemption {
  id: string;
  voucherId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  pointsUsed: number;
  redeemedDate: string;
  status: "redeemed" | "used" | "expired";
}

export const sampleVouchers: Voucher[] = [
  {
    id: "VOU-001",
    code: "WELCOME10",
    name: "Welcome Discount",
    description: "10% discount for new customers",
    discountType: "percentage",
    discountValue: 10,
    pointsRequired: 500,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    status: "active",
    usageLimit: 1000,
    usedCount: 245,
    createdDate: "2023-12-15T10:00:00Z",
    createdBy: "Admin",
    minOrderAmount: 50,
    maxDiscountAmount: 20,
    applicableCategories: ["Skincare", "Makeup"],
  },
  {
    id: "VOU-002",
    code: "SAVE50",
    name: "Fixed $50 Off",
    description: "$50 off on orders over $200",
    discountType: "fixed_amount",
    discountValue: 50,
    pointsRequired: 1000,
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-06-30T23:59:59Z",
    status: "active",
    usageLimit: 500,
    usedCount: 123,
    createdDate: "2024-01-10T14:30:00Z",
    createdBy: "Admin",
    minOrderAmount: 200,
  },
  {
    id: "VOU-003",
    code: "SUMMER25",
    name: "Summer Sale",
    description: "25% off summer collection",
    discountType: "percentage",
    discountValue: 25,
    pointsRequired: 1500,
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    status: "expired",
    usageLimit: 200,
    usedCount: 200,
    createdDate: "2024-05-20T09:15:00Z",
    createdBy: "Admin",
    minOrderAmount: 100,
    maxDiscountAmount: 100,
    applicableCategories: ["Fragrance", "Haircare"],
  },
  {
    id: "VOU-004",
    code: "LOYALTY15",
    name: "Loyalty Reward",
    description: "15% off for loyal customers",
    discountType: "percentage",
    discountValue: 15,
    pointsRequired: 750,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    status: "active",
    usageLimit: null, // unlimited
    usedCount: 89,
    createdDate: "2023-12-01T16:45:00Z",
    createdBy: "Admin",
    minOrderAmount: 75,
    maxDiscountAmount: 50,
  },
  {
    id: "VOU-005",
    code: "FLASH100",
    name: "Flash Sale",
    description: "$100 off flash sale",
    discountType: "fixed_amount",
    discountValue: 100,
    pointsRequired: 2000,
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2024-02-03T23:59:59Z",
    status: "exhausted",
    usageLimit: 50,
    usedCount: 50,
    createdDate: "2024-01-25T11:20:00Z",
    createdBy: "Admin",
    minOrderAmount: 300,
  },
];

export const sampleVoucherUsages: VoucherUsage[] = [
  {
    id: "VU-001",
    voucherId: "VOU-001",
    customerId: "CUST-001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    orderId: "ORD-001",
    usedDate: "2024-01-15T14:30:00Z",
    discountAmount: 15.7,
    orderAmount: 156.99,
  },
  {
    id: "VU-002",
    voucherId: "VOU-002",
    customerId: "CUST-002",
    customerName: "Michael Chen",
    customerEmail: "michael.chen@email.com",
    orderId: "ORD-002",
    usedDate: "2024-01-14T16:20:00Z",
    discountAmount: 50,
    orderAmount: 289.99,
  },
  {
    id: "VU-003",
    voucherId: "VOU-004",
    customerId: "CUST-003",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    orderId: "ORD-003",
    usedDate: "2024-01-13T10:15:00Z",
    discountAmount: 10.2,
    orderAmount: 67.98,
  },
];

export const sampleVoucherRedemptions: VoucherRedemption[] = [
  {
    id: "VR-001",
    voucherId: "VOU-001",
    customerId: "CUST-001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    pointsUsed: 500,
    redeemedDate: "2024-01-10T09:30:00Z",
    status: "used",
  },
  {
    id: "VR-002",
    voucherId: "VOU-002",
    customerId: "CUST-002",
    customerName: "Michael Chen",
    customerEmail: "michael.chen@email.com",
    pointsUsed: 1000,
    redeemedDate: "2024-01-12T11:45:00Z",
    status: "used",
  },
  {
    id: "VR-003",
    voucherId: "VOU-004",
    customerId: "CUST-003",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    pointsUsed: 750,
    redeemedDate: "2024-01-08T15:20:00Z",
    status: "used",
  },
  {
    id: "VR-004",
    voucherId: "VOU-001",
    customerId: "CUST-004",
    customerName: "David Wilson",
    customerEmail: "david.wilson@email.com",
    pointsUsed: 500,
    redeemedDate: "2024-01-16T13:10:00Z",
    status: "redeemed",
  },
];

export const voucherStatusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Expired", value: "expired" },
  { label: "Exhausted", value: "exhausted" },
];

export const discountTypeOptions = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed Amount", value: "fixed_amount" },
];

export const categoryOptions = [
  { label: "Skincare", value: "Skincare" },
  { label: "Makeup", value: "Makeup" },
  { label: "Haircare", value: "Haircare" },
  { label: "Fragrance", value: "Fragrance" },
  { label: "Supplements", value: "Supplements" },
];
