"use client";

import type React from "react";

import { useState } from "react";
import type { Order } from "@/constants/manage-orders/index";
import { sampleOrders } from "@/constants/manage-orders/index";

// Hook quản lý orders (chỉ xem và cập nhật trạng thái)
export const useOrdersLogic = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    // Cập nhật selectedOrder nếu đang xem chi tiết
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  const handleUpdatePaymentStatus = (
    orderId: string,
    newPaymentStatus: Order["paymentStatus"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, paymentStatus: newPaymentStatus }
          : order
      )
    );
    // Cập nhật selectedOrder nếu đang xem chi tiết
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) =>
        prev ? { ...prev, paymentStatus: newPaymentStatus } : null
      );
    }
  };

  const handleUpdateTrackingNumber = (
    orderId: string,
    trackingNumber: string
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, trackingNumber } : order
      )
    );
    // Cập nhật selectedOrder nếu đang xem chi tiết
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, trackingNumber } : null));
    }
  };

  const handleExportOrders = () => {
    // Simple CSV export
    const headers = [
      "Order ID",
      "Customer",
      "Date",
      "Status",
      "Payment Status",
      "Total",
      "Payment Method",
    ];
    const csvContent = [
      headers.join(","),
      ...orders.map((order) =>
        [
          order.id,
          `"${order.customerName}"`,
          new Date(order.orderDate).toLocaleDateString(),
          order.status,
          order.paymentStatus,
          `$${order.total.toFixed(2)}`,
          order.paymentMethod.replace("_", " "),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    orders,
    selectedOrder,
    isDetailModalOpen,
    handleViewOrder,
    handleCloseDetailModal,
    handleUpdateOrderStatus,
    handleUpdatePaymentStatus,
    handleUpdateTrackingNumber,
    handleExportOrders,
  };
};

// Utility functions
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const calculateOrderStats = (orders: Order[]) => {
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  ).length;
  const shippedOrders = orders.filter(
    (order) => order.status === "shipped"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  ).length;

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    processingOrders,
    shippedOrders,
    completedOrders,
    cancelledOrders,
    averageOrderValue,
  };
};

export interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod:
    | "credit_card"
    | "paypal"
    | "bank_transfer"
    | "cash_on_delivery";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  trackingNumber: string;
  notes: string;
  items: { productName: string; quantity: number; price: number }[];
}

// Hook quản lý form modal
export const useOrderForm = (editOrder?: Order | null) => {
  const initialFormData: OrderFormData = {
    customerName: editOrder?.customerName || "",
    customerEmail: editOrder?.customerEmail || "",
    customerPhone: editOrder?.customerPhone || "",
    shippingAddress: editOrder?.shippingAddress || "",
    status: editOrder?.status || "pending",
    paymentMethod: editOrder?.paymentMethod || "credit_card",
    paymentStatus: editOrder?.paymentStatus || "pending",
    trackingNumber: editOrder?.trackingNumber || "",
    notes: editOrder?.notes || "",
    items: editOrder?.items.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    })) || [{ productName: "", quantity: 1, price: 0 }],
  };

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productName: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
    if (errors[`item_${index}_${field}`]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[`item_${index}_${field}`];
        return newErrors;
      });
    }
  };

  const validateForm = (data: OrderFormData) => {
    const errors: any = {};

    if (!data.customerName?.trim()) {
      errors.customerName = "Customer name is required";
    }

    if (!data.customerEmail?.trim()) {
      errors.customerEmail = "Customer email is required";
    }

    if (!data.customerPhone?.trim()) {
      errors.customerPhone = "Customer phone is required";
    }

    if (!data.shippingAddress?.trim()) {
      errors.shippingAddress = "Shipping address is required";
    }

    data.items.forEach((item, index) => {
      if (!item.productName?.trim()) {
        errors[`item_${index}_productName`] = "Product name is required";
      }
      if (!item.quantity || item.quantity <= 0) {
        errors[`item_${index}_quantity`] = "Quantity must be greater than 0";
      }
      if (!item.price || item.price <= 0) {
        errors[`item_${index}_price`] = "Price must be greater than 0";
      }
    });

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Order) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const total = formData.items.reduce(
      (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
      0
    );

    const orderData: Order = {
      ...formData,
      id: editOrder?.id || `ORD-${Math.floor(Math.random() * 10000)}`,
      total: total,
      orderDate: editOrder?.orderDate || new Date().toISOString(),
      items: formData.items.map((item, index) => ({
        id:
          editOrder?.items[index]?.id ||
          `ITEM-${Math.floor(Math.random() * 10000)}`,
        productName: item.productName,
        productImage: "/placeholder.svg?height=50&width=50",
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
    };

    try {
      await onSubmit(orderData);
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    addItem,
    removeItem,
    updateItem,
    handleSubmit,
  };
};
