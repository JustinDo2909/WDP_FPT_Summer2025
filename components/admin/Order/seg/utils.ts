"use client";

import { useState, useCallback } from "react";
import type { Order } from "@/types/order/index";
import {
  useGetAllOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
} from "@/process/api/api";

// Hook quản lý orders với real API
export const useOrdersLogic = () => {
  const { data: ordersData, isLoading, error } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Get order detail when modal is open
  const { data: orderDetailData } = useGetOrderDetailQuery(selectedOrderId!, {
    skip: !selectedOrderId,
  });

  const orders = ordersData?.orders || [];
  const selectedOrder = orderDetailData?.order || null;

  const handleViewOrder = useCallback((order: Order) => {
    setSelectedOrderId(order.id);
    setIsDetailModalOpen(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedOrderId(null);
  }, []);

  const handleUpdateOrderStatus = useCallback(
    async (orderId: string, newStatus: Order["status"]) => {
      try {
        await updateOrderStatus({
          orderId,
          status: newStatus,
        }).unwrap();
      } catch (error) {
        console.error("Failed to update order status:", error);
        alert("Failed to update order status. Please try again.");
      }
    },
    [updateOrderStatus],
  );

  const handleExportOrders = useCallback(() => {
    if (!orders.length) {
      alert("No orders to export");
      return;
    }

    const headers = [
      "Order ID",
      "User ID",
      "Status",
      "Total Amount",
      "Payment Method",
      "Created Date",
    ];
    const csvContent = [
      headers.join(","),
      ...orders.map((order) =>
        [
          order.id,
          order.user_id,
          order.status,
          order.total_amount.toString(),
          order.payment_method,
          new Date(order.createdAt).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [orders]);

  return {
    orders,
    selectedOrder,
    isDetailModalOpen,
    isLoading,
    error,
    handleViewOrder,
    handleCloseDetailModal,
    handleUpdateOrderStatus,
    handleExportOrders,
  };
};

// Utility functions
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status: Order["status"]) => {
  const colors = {
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const getPaymentMethodColor = (method: Order["payment_method"]) => {
  const colors = {
    card: "bg-blue-100 text-blue-800",
    paypal: "bg-yellow-100 text-yellow-800",
    bank_transfer: "bg-green-100 text-green-800",
    cash_on_delivery: "bg-gray-100 text-gray-800",
  };
  return colors[method] || "bg-gray-100 text-gray-800";
};

export const calculateOrderStats = (orders: Order[]) => {
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((order) => order.status !== "CANCELLED")
    .reduce((sum, order) => sum + order.total_amount, 0);

  const processingOrders = orders.filter(
    (order) => order.status === "PROCESSING",
  ).length;
  const shippedOrders = orders.filter(
    (order) => order.status === "SHIPPED",
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "DELIVERED",
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "CANCELLED",
  ).length;

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalOrders,
    totalRevenue,
    processingOrders,
    shippedOrders,
    completedOrders,
    cancelledOrders,
    averageOrderValue,
  };
};
