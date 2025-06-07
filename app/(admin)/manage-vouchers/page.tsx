"use client";

import CustomTable from "@/components/CustomTable";
import { StatsCard, MiniStatsCard } from "@/components/admin/StatsCard";
import { VoucherDetailModal } from "@/components/admin/Voucher/voucher-detail-modal";
import { AddVoucherModal } from "@/components/admin/Voucher/add-voucher-modal";
import {
  useVouchersLogic,
  formatCurrency,
  formatDate,
  getStatusColor,
  getDiscountDisplay,
  calculateVoucherStats,
} from "@/components/admin/Voucher/seg/utils";
import {
  voucherStatusOptions,
  discountTypeOptions,
} from "@/constants/manage-vouchers/index";
import { type Voucher } from "@/constants/manage-vouchers/index";
import { Area, RText, Yard, Core, Container, Block } from "@/lib/by/Div";
import {
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  Ticket,
  TrendingUp,
  Gift,
  DollarSign,
  CheckCircle,
  Clock,
  Ban,
} from "lucide-react";

export default function VoucherPage() {
  const {
    vouchers,
    selectedVoucher,
    isDetailModalOpen,
    isAddModalOpen,
    editingVoucher,
    voucherUsages,
    voucherRedemptions,
    handleViewVoucher,
    handleCloseDetailModal,
    handleAddVoucher,
    handleEditVoucher,
    handleCloseAddModal,
    handleSubmitVoucher,
    handleDeleteVoucher,
    handleToggleVoucherStatus,
    handleExportVouchers,
  } = useVouchersLogic();

  const stats = calculateVoucherStats(
    vouchers,
    voucherUsages,
    voucherRedemptions
  );

  const columns = [
    {
      key: "code" as const,
      label: "Voucher Code",
      sortable: true,
      render: (voucher: Voucher) => (
        <RText className="font-mono text-sm font-medium text-purple-600">
          {voucher.code}
        </RText>
      ),
    },
    {
      key: "name" as const,
      label: "Voucher",
      sortable: true,
      render: (voucher: Voucher) => (
        <Yard>
          <RText className="font-medium text-gray-900">{voucher.name}</RText>
          <RText className="text-sm text-gray-500 truncate max-w-xs">
            {voucher.description}
          </RText>
        </Yard>
      ),
    },
    {
      key: "discountType" as const,
      label: "Discount",
      filterable: true,
      render: (voucher: Voucher) => (
        <Yard>
          <RText className="text-lg font-bold text-green-600">
            {getDiscountDisplay(voucher)}
          </RText>
          <RText className="text-xs text-gray-500 capitalize">
            {voucher.discountType.replace("_", " ")}
          </RText>
        </Yard>
      ),
    },
    {
      key: "pointsRequired" as const,
      label: "Points Required",
      sortable: true,
      render: (voucher: Voucher) => (
        <RText className="text-sm font-medium text-blue-600">
          {voucher.pointsRequired}
        </RText>
      ),
    },
    {
      key: "status" as const,
      label: "Status",
      filterable: true,
      render: (voucher: Voucher) => (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(voucher.status)}`}
        >
          {voucher.status === "active" && <CheckCircle className="w-3 h-3" />}
          {voucher.status === "inactive" && <Pause className="w-3 h-3" />}
          {voucher.status === "expired" && <Clock className="w-3 h-3" />}
          {voucher.status === "exhausted" && <Ban className="w-3 h-3" />}
          {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
        </span>
      ),
    },
    {
      key: "usageLimit" as const,
      label: "Usage",
      sortable: true,
      render: (voucher: Voucher) => (
        <Yard>
          <RText className="text-sm text-gray-900">
            {voucher.usedCount} / {voucher.usageLimit || "∞"}
          </RText>
          {voucher.usageLimit && (
            <Area className="w-full bg-gray-200 rounded-full h-1 mt-1">
              <Area
                className="bg-purple-500 h-1 rounded-full"
                style={{
                  width: `${Math.min((voucher.usedCount / voucher.usageLimit) * 100, 100)}%`,
                }}
              />
            </Area>
          )}
        </Yard>
      ),
    },
    {
      key: "endDate" as const,
      label: "Valid Until",
      sortable: true,
      render: (voucher: Voucher) => (
        <RText className="text-sm text-gray-900">
          {formatDate(voucher.endDate)}
        </RText>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (voucher: Voucher) => (
        <Area className="flex items-center space-x-1">
          <button
            onClick={() => handleViewVoucher(voucher)}
            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEditVoucher(voucher)}
            className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors"
            title="Edit Voucher"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToggleVoucherStatus(voucher.id)}
            className={`p-1 rounded transition-colors ${
              voucher.status === "active"
                ? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50"
                : "text-green-600 hover:text-green-800 hover:bg-green-50"
            }`}
            title={voucher.status === "active" ? "Deactivate" : "Activate"}
            disabled={
              voucher.status === "expired" || voucher.status === "exhausted"
            }
          >
            {voucher.status === "active" ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => handleDeleteVoucher(voucher.id)}
            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete Voucher"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </Area>
      ),
    },
  ];

  const filters = {
    status: voucherStatusOptions,
    discountType: discountTypeOptions,
  };

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Page Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Voucher Management
        </RText>
      </header>

      <Container className="flex-1 overflow-auto p-6 space-y-6">
        <Area>
          <RText className="text-gray-600">
            Manage discount vouchers and game score redemptions{" "}
          </RText>
        </Area>

        {/* Main Stats Cards */}
        <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Vouchers"
            value={stats.totalVouchers}
            icon={Ticket}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
          />
          <StatsCard
            title="Total Discount Given"
            value={formatCurrency(stats.totalDiscountGiven)}
            icon={DollarSign}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
            valueColor="text-green-600"
          />
          <StatsCard
            title="Total Redemptions"
            value={stats.totalRedemptions}
            icon={Gift}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
            valueColor="text-blue-600"
          />
          <StatsCard
            title="Points Redeemed"
            value={stats.totalPointsRedeemed.toLocaleString()}
            icon={TrendingUp}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-50"
            valueColor="text-yellow-600"
          />
        </Area>

        {/* Mini Stats Cards */}
        <Area className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MiniStatsCard
            value={stats.activeVouchers}
            label="Active"
            valueColor="text-green-600"
          />
          <MiniStatsCard
            value={stats.expiredVouchers}
            label="Expired"
            valueColor="text-red-600"
          />
          <MiniStatsCard
            value={stats.exhaustedVouchers}
            label="Exhausted"
            valueColor="text-gray-600"
          />
          <MiniStatsCard
            value={`${stats.usageRate.toFixed(1)}%`}
            label="Usage Rate"
            valueColor="text-purple-600"
          />
        </Area>

        {/* Vouchers Table */}
        <CustomTable
          data={vouchers}
          columns={columns}
          onAddItem={handleAddVoucher}
          onExport={handleExportVouchers}
          headerTitle="All Vouchers"
          description="Manage discount vouchers and redemption settings"
          filters={filters}
          showExport={true}
          showBulkActions={false}
          itemsPerPage={15}
        />
      </Container>
      {/* Voucher Detail Modal */}
      <VoucherDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        voucher={selectedVoucher}
        onEdit={handleEditVoucher}
        onDelete={handleDeleteVoucher}
        onToggleStatus={handleToggleVoucherStatus}
      />

      {/* Add/Edit Voucher Modal */}
      <AddVoucherModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmitVoucher}
        editVoucher={editingVoucher}
      />
    </Core>
  );
}
