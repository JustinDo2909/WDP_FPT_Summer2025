"use client";

import CustomTable from "@/components/CustomTable";
import { OrderDetailModal } from "@/components/admin/Order/order-detail-modal";
import {
  calculateOrderStats,
  formatCurrency,
  formatDate,
  getPaymentMethodColor,
  getStatusColor,
  useOrdersLogic,
} from "@/components/admin/Order/seg/utils";
import { MiniStatsCard, StatsCard } from "@/components/admin/StatsCard";
import { Area, Container, Core, RText, Yard } from "@/lib/by/Div";
import {
  orderStatusOptions,
  paymentMethodOptions,
  type Order,
} from "@/types/order/index";
import { Clock, CreditCard, Eye, Package, TrendingUp } from "lucide-react";

export default function OrdersPage() {
  const {
    orders,
    selectedOrder,
    isDetailModalOpen,
    isLoading,
    error,
    handleViewOrder,
    handleCloseDetailModal,
    handleUpdateOrderStatus,
    handleExportOrders,
  } = useOrdersLogic();

  const stats = calculateOrderStats(orders);

  // Show loading state
  if (isLoading) {
    return (
      <Core className="flex flex-col h-full bg-gray-50">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <RText className="text-lg font-semibold text-gray-700">
            Order Management
          </RText>
        </header>
        <Container className="flex-1 flex items-center justify-center">
          <RText className="text-gray-500">Loading orders...</RText>
        </Container>
      </Core>
    );
  }

  // Show error state
  if (error) {
    return (
      <Core className="flex flex-col h-full bg-gray-50">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <RText className="text-lg font-semibold text-gray-700">
            Order Management
          </RText>
        </header>
        <Container className="flex-1 flex items-center justify-center">
          <RText className="text-red-500">
            Error loading orders. Please try again.
          </RText>
        </Container>
      </Core>
    );
  }

  const columns = [
    {
      key: "id" as const,
      label: "Order ID",
      sortable: true,
      render: (order: Order) => (
        <RText className="font-mono text-sm font-medium text-blue-600">
          {order.id.substring(0, 8)}...
        </RText>
      ),
    },
    {
      key: "user_id" as const,
      label: "User ID",
      sortable: true,
      render: (order: Order) => (
        <RText className="text-sm text-gray-900">{order.user_id}</RText>
      ),
    },
    {
      key: "createdAt" as const,
      label: "Date",
      sortable: true,
      render: (order: Order) => (
        <Yard>
          <RText className="text-sm text-gray-900">
            {formatDate(order.createdAt)}
          </RText>
          <RText className="text-xs text-gray-500">
            ID: {order.address_id}
          </RText>
        </Yard>
      ),
    },
    {
      key: "status" as const,
      label: "Status",
      filterable: true,
      render: (order: Order) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
        >
          {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
        </span>
      ),
    },
    {
      key: "payment_method" as const,
      label: "Payment",
      filterable: true,
      render: (order: Order) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(order.payment_method)}`}
        >
          {order.payment_method.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "total_amount" as const,
      label: "Total",
      sortable: true,
      render: (order: Order) => (
        <RText className="font-semibold text-gray-900">
          {formatCurrency(order.total_amount)}
        </RText>
      ),
    },
    {
      key: "actions" as any,
      label: "Actions",
      render: (order: Order) => (
        <button
          onClick={() => handleViewOrder(order)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const filters = {
    status: [...orderStatusOptions],
    payment_method: [...paymentMethodOptions],
  };

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Order Management
        </RText>
      </header>

      <Container className="flex-1 overflow-auto p-6 space-y-6">
        <Area>
          <RText className="text-gray-600">
            Monitor and manage customer orders
          </RText>
        </Area>
        {/* Stats */}
        <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={Package}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
            valueColor="text-green-600"
          />
          <StatsCard
            title="Processing Orders"
            value={stats.processingOrders}
            icon={Clock}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
            valueColor="text-blue-600"
          />
          <StatsCard
            title="Avg Order Value"
            value={formatCurrency(stats.averageOrderValue)}
            icon={CreditCard}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
            valueColor="text-purple-600"
          />
        </Area>
        {/* Mini Stats */}
        <Area className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MiniStatsCard
            value={stats.processingOrders}
            label="Processing"
            valueColor="text-blue-600"
          />
          <MiniStatsCard
            value={stats.shippedOrders}
            label="Shipped"
            valueColor="text-purple-600"
          />
          <MiniStatsCard
            value={stats.completedOrders}
            label="Delivered"
            valueColor="text-green-600"
          />
          <MiniStatsCard
            value={stats.cancelledOrders}
            label="Cancelled"
            valueColor="text-red-600"
          />
        </Area>
        {/* Table */}
        <CustomTable
          data={orders}
          columns={columns}
          onExport={handleExportOrders}
          headerTitle="All Orders"
          description="Click on the eye icon to view order details"
          filters={filters}
          showExport={true}
          itemsPerPage={15}
        />
      </Container>

      {/* Detail Modal */}
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        order={selectedOrder}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </Core>
  );
}
