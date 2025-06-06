"use client";

import CustomTable from "@/components/CustomTable";
import { StatsCard, MiniStatsCard } from "@/components/admin/StatsCard";
import { OrderDetailModal } from "@/components/admin/Order/Order-detail-modal";
import {
  useOrdersLogic,
  formatCurrency,
  formatDate,
  getStatusColor,
  getPaymentStatusColor,
  calculateOrderStats,
} from "@/components/admin/Order/seg/utils";
import {
  orderStatusOptions,
  paymentMethodOptions,
  paymentStatusOptions,
} from "@/constants/manage-orders/index";
import { Area, RText, Core, Yard, Block, Container } from "@/lib/by/Div";
import { Eye, Package, TrendingUp, Clock, CreditCard } from "lucide-react";
import { type Order } from "@/constants/manage-orders/index";
import { getCurrentDate } from "@/components/admin/Dashboard/seg/utils";

export default function OrdersPage() {
  const {
    orders,
    selectedOrder,
    isDetailModalOpen,
    handleViewOrder,
    handleCloseDetailModal,
    handleUpdateOrderStatus,
    handleUpdatePaymentStatus,
    handleUpdateTrackingNumber,
    handleExportOrders,
  } = useOrdersLogic();

  const stats = calculateOrderStats(orders);

  const columns = [
    {
      key: "id" as const,
      label: "Order ID",
      sortable: true,
      render: (order: Order) => (
        <RText className="font-mono text-sm font-medium text-blue-600">
          {order.id}
        </RText>
      ),
    },
    {
      key: "customerName" as const,
      label: "Customer",
      sortable: true,
      render: (order: Order) => (
        <Yard>
          <RText className="font-medium text-gray-900">
            {order.customerName}
          </RText>
          <RText className="text-sm text-gray-500">{order.customerEmail}</RText>
        </Yard>
      ),
    },
    {
      key: "orderDate" as const,
      label: "Date",
      sortable: true,
      render: (order: Order) => (
        <Yard>
          <RText className="text-sm text-gray-900">
            {formatDate(order.orderDate)}
          </RText>
          <RText className="text-xs text-gray-500">
            {order.items.length} items
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
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      ),
    },
    {
      key: "paymentStatus" as const,
      label: "Payment",
      filterable: true,
      render: (order: Order) => (
        <Yard>
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}
          >
            {order.paymentStatus.charAt(0).toUpperCase() +
              order.paymentStatus.slice(1)}
          </span>
          <RText className="text-xs text-gray-500 mt-1 capitalize">
            {order.paymentMethod.replace("_", " ")}
          </RText>
        </Yard>
      ),
    },
    {
      key: "total" as const,
      label: "Total",
      sortable: true,
      render: (order: Order) => (
        <RText className="font-semibold text-gray-900">
          {formatCurrency(order.total)}
        </RText>
      ),
    },
    {
      key: "trackingNumber" as const,
      label: "Tracking",
      render: (order: Order) => (
        <RText className="text-sm font-mono text-gray-600">
          {order.trackingNumber || "—"}
        </RText>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (order: Order) => (
        <button
          onClick={() => handleViewOrder(order)}
          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const filters = {
    status: orderStatusOptions,
    paymentMethod: paymentMethodOptions,
    paymentStatus: paymentStatusOptions,
  };

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Order Management
        </RText>
        <Block className="text-sm text-gray-500">{getCurrentDate()}</Block>
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
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={Clock}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-50"
            valueColor="text-yellow-600"
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
          description="View and manage customer orders"
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
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
        onUpdateTrackingNumber={handleUpdateTrackingNumber}
      />
    </Core>
  );
}
