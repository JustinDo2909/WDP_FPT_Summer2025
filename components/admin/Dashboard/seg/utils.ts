import type { Order, OrderDetail } from "@/types/order";
import type { User } from "@/types/user";
import type { Product, CategoryOption } from "@/types/productManagement";

//#region fomatCurrency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Math.abs(amount));
};
//#endregion
//#region fomatCurrencyShort
export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K`;
  }
  return amount.toString();
};
//#endregion

//#region getStatusBadgeConfig
export const getStatusBadgeConfig = (status: string) => {
  const statusConfig = {
    PROCESSING: {
      label: "Processing",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    SHIPPED: {
      label: "Shipped",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    DELIVERED: {
      label: "Delivered",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  };

  return (
    statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      className: "bg-gray-100 text-gray-800 border-gray-200",
    }
  );
};
//#endregion
//#region getPaymentMethodIcon
export const getPaymentMethodIcon = (method: string) => {
  if (method === "card") {
    return {
      className:
        "w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-white text-xs flex items-center justify-center font-bold",
      text: "CARD",
    };
  } else if (method === "paypal") {
    return {
      className:
        "w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold",
      text: "PP",
    };
  } else if (method === "bank_transfer") {
    return {
      className:
        "w-8 h-5 bg-gradient-to-r from-green-500 to-green-700 rounded text-white text-xs flex items-center justify-center font-bold",
      text: "BANK",
    };
  } else if (method === "cash_on_delivery") {
    return {
      className:
        "w-8 h-5 bg-gradient-to-r from-orange-500 to-orange-700 rounded text-white text-xs flex items-center justify-center font-bold",
      text: "COD",
    };
  }

  return {
    className:
      "w-8 h-5 bg-gradient-to-r from-gray-500 to-gray-700 rounded text-white text-xs flex items-center justify-center font-bold",
    text: "OTHER",
  };
};
//#endregion
//#region getCurrentDate
export const getCurrentDate = (): string => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

//#endregion

// Color palette for categories
const CATEGORY_COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#22c55e", // green
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
  "#ec4899", // pink
  "#6b7280", // gray
];

//#region API-based utility functions

// Calculate dashboard stats from API data
export const calculateDashboardStats = (
  orders: any[],
  users: any[],
  products: any[]
) => {
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total_amount || 0),
    0
  );
  const totalOrders = orders.length;
  const totalCustomers = users.filter((user) => user.role === "USER").length;
  const totalProducts = products.length;

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
  };
};

// Calculate monthly revenue from orders
export const calculateMonthlyRevenue = (orders: any[]) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Initialize all months with 0 revenue
  const monthlyData = months.map((month, index) => ({
    name: month,
    revenue: 0,
    hasData: index <= currentMonth,
  }));

  // Calculate revenue for each month
  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    if (orderDate.getFullYear() === currentYear) {
      const monthIndex = orderDate.getMonth();
      if (monthIndex <= currentMonth) {
        monthlyData[monthIndex].revenue += order.total_amount || 0;
      }
    }
  });

  return monthlyData;
};

// Calculate top products from order items
export const calculateTopProducts = (orders: any[]) => {
  // eslint-disable-next-line no-console
  console.log("calculateTopProducts - Input orders:", orders.length);
  // eslint-disable-next-line no-console
  console.log("calculateTopProducts - First order structure:", orders[0]);

  // TEMPORARY FIX: Since getAllOrders doesn't have orderItems,
  // we'll create mock data based on order amounts until we implement proper order details fetching
  if (orders.length === 0) {
    return [];
  }

  // Check if orders have orderItems
  const hasOrderItems = orders.some((order) => order.orderItems);
  // eslint-disable-next-line no-console
  console.log("calculateTopProducts - Orders have orderItems:", hasOrderItems);

  if (!hasOrderItems) {
    // MOCK DATA: Create fake top products from order data
    // This is temporary until we properly fetch order details
    return [
      {
        id: "mock-product-1",
        name: "Product A (Mock - Need orderItems)",
        revenue:
          orders.reduce((sum, order) => sum + (order.total_amount || 0), 0) *
          0.3,
        quantity: Math.floor(orders.length * 1.5),
      },
      {
        id: "mock-product-2",
        name: "Product B (Mock - Need orderItems)",
        revenue:
          orders.reduce((sum, order) => sum + (order.total_amount || 0), 0) *
          0.25,
        quantity: Math.floor(orders.length * 1.2),
      },
      {
        id: "mock-product-3",
        name: "Product C (Mock - Need orderItems)",
        revenue:
          orders.reduce((sum, order) => sum + (order.total_amount || 0), 0) *
          0.2,
        quantity: Math.floor(orders.length * 1.0),
      },
    ];
  }

  // Original logic for when we have orderItems
  const productStats: {
    [key: string]: { name: string; revenue: number; quantity: number };
  } = {};

  orders.forEach((order) => {
    if (order.orderItems) {
      order.orderItems.forEach((item: any) => {
        const productId = item.product_id;
        const productName = item.title;
        const revenue = (item.price || 0) * (item.quantity || 0);
        const quantity = item.quantity || 0;

        if (productStats[productId]) {
          productStats[productId].revenue += revenue;
          productStats[productId].quantity += quantity;
        } else {
          productStats[productId] = {
            name: productName,
            revenue,
            quantity,
          };
        }
      });
    }
  });

  const result = Object.entries(productStats)
    .map(([id, stats]) => ({ id, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // eslint-disable-next-line no-console
  console.log("calculateTopProducts - Final result:", result);

  return result;
};

// Calculate top customers from orders
export const calculateTopCustomers = (orders: any[], users: any[]) => {
  const customerStats: {
    [key: string]: { totalSpent: number; totalOrders: number };
  } = {};

  orders.forEach((order) => {
    const userId = order.user_id;
    const amount = order.total_amount || 0;

    if (customerStats[userId]) {
      customerStats[userId].totalSpent += amount;
      customerStats[userId].totalOrders += 1;
    } else {
      customerStats[userId] = {
        totalSpent: amount,
        totalOrders: 1,
      };
    }
  });

  const topCustomers = Object.entries(customerStats)
    .map(([userId, stats]) => {
      const user = users.find((u) => u.id === userId);
      return {
        id: userId,
        name: user?.name || "Unknown User",
        email: user?.email || "Unknown Email",
        ...stats,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  return topCustomers;
};

// Calculate category distribution from products
export const calculateCategoryDistribution = (
  products: any[],
  categories: any[]
) => {
  const categoryStats: { [key: string]: number } = {};

  products.forEach((product) => {
    const categoryId = product.product_category_id;
    categoryStats[categoryId] = (categoryStats[categoryId] || 0) + 1;
  });

  const totalProducts = products.length;

  return Object.entries(categoryStats)
    .map(([categoryId, count], index) => {
      const category = categories.find((c) => c.id === categoryId);
      const percentage = totalProducts > 0 ? (count / totalProducts) * 100 : 0;

      return {
        name: category?.title || "Unknown Category",
        value: count,
        percentage: `${percentage.toFixed(1)}%`,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      };
    })
    .sort((a, b) => b.value - a.value);
};

// Get recent transactions from orders
export const getRecentTransactions = (orders: any[], users: any[]) => {
  return [...orders] // Create a copy to avoid mutating the original read-only array
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5)
    .map((order) => {
      const user = users.find((u) => u.id === order.user_id);

      return {
        id: order.id,
        customer: user?.name || "Unknown Customer",
        amount: order.total_amount || 0,
        date: new Date(order.createdAt).toLocaleDateString(),
        status: order.status,
        paymentMethod: order.payment_method,
        reference:
          order.checkout_session_id || order.payment_intent_id || order.id,
      };
    });
};

// Filter current month orders
export const getCurrentMonthOrders = (orders: any[]) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  });
};

//#endregion
