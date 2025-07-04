export interface Customer {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "STAFF";
  createdAt: string;
  updatedAt: string;
  // Extended fields for UI
  phone?: string;
  address?: string;
  status?: "active" | "inactive" | "blocked";
  loyaltyTier?: "bronze" | "silver" | "gold" | "platinum";
  gameScore?: number;
  totalSpent?: number;
  totalOrders?: number;
  dateJoined?: string;
  lastLogin?: string;
  notes?: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "blocked";
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
  gameScore: string;
  notes: string;
}

export interface GameScoreTransaction {
  id: string;
  customerId: string;
  type: "game_win" | "manual_add" | "manual_subtract" | "order_bonus";
  amount: number;
  description: string;
  date: string;
}

export interface CustomerOrder {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
}
