export interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      revenue: number;
      hasData: boolean;
    };
  }[];
  label?: string;
}

export interface StatisticsSectionProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

// Dashboard API integration types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export interface MonthlyRevenue {
  name: string;
  revenue: number;
  hasData: boolean;
}

export interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
}

export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  totalOrders: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

export interface RecentTransaction {
  id: string;
  customer: string;
  amount: number;
  date: string;
  status: string;
  paymentMethod: string;
  reference: string;
}
