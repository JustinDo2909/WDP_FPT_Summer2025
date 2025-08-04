export interface OrderItem {
  title: string;
  image_url: string;
  quantity: number;
  unit_price: number;
  discount_per_item: number;
  final_price: number;
  total_price: number;
}

export interface OrderAddress {
  address: string;
  city: string;
  pincode: string;
  phone: string;
  full_name: string;
}

export interface OrderUser {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  address_id: string;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  total_amount: number;
  checkout_session_id: string;
  payment_intent_id: string;
  payment_method: "card" | "paypal" | "bank_transfer" | "cash_on_delivery";
  payment_status: "PAID" | "PENDING" | "FAILED";
  receipt_url: string;
  reason: string | null;
  images: string[];
  voucher_id: string | null;
  createdAt: string;
  updatedAt: string;
  user?: OrderUser;
}

export interface OrderDetail extends Order {
  orderItems: OrderItem[];
  address: OrderAddress;
  user: OrderUser;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}

export interface OrderDetailResponse {
  success: boolean;
  order: OrderDetail;
}

export interface OrderUpdateRequest {
  status?: Order["status"];
}

// Updated status options to match API
export const orderStatusOptions = [
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
] as const;

export const paymentMethodOptions = [
  { value: "card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
] as const;

export const paymentStatusOptions = [
  { value: "PAID", label: "Paid" },
  { value: "PENDING", label: "Pending" },
  { value: "FAILED", label: "Failed" },
] as const;
