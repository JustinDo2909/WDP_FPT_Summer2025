export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  title: string;
  price: number;
  image_url: string;
  quantity: number;
}

export interface OrderAddress {
  id: string;
  user_id: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}

export interface OrderUser {
  email: string;
  name: string;
}

export interface Order {
  id: string;
  user_id: string;
  address_id: string;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  total_amount: number;
  checkout_session_id: string;
  payment_intent_id: string;
  payment_method: "card" | "paypal" | "bank_transfer" | "cash_on_delivery";
  createdAt: string;
  updatedAt: string;
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
  { value: "CANCELLED", label: "Cancelled" },
] as const;

export const paymentMethodOptions = [
  { value: "card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
] as const;
