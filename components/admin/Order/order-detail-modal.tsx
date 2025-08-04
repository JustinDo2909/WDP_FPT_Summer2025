"use client";

import {
  X,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  CreditCard,
} from "lucide-react";

import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getPaymentMethodColor,
} from "@/components/admin/Order/seg/utils";
import { orderStatusOptions, type OrderDetail } from "@/types/order/index";
import { useMemo, useCallback, useState } from "react";
import clsx from "clsx";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetail | null;
  onUpdateStatus?: (orderId: string, newStatus: OrderDetail["status"]) => void;
}

// Hooks must always run, so we move them outside any conditional return
export function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}: OrderDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const statusIcon = useMemo(() => {
    if (!order) return <Package className="w-5 h-5" />;

    const iconProps = { className: "w-5 h-5" };

    switch (order.status) {
      case "PROCESSING":
        return <Package {...iconProps} />;
      case "SHIPPED":
        return <Truck {...iconProps} />;
      case "DELIVERED":
        return <CheckCircle {...iconProps} />;
      case "CANCELLED":
        return <XCircle {...iconProps} />;
      default:
        return <Package {...iconProps} />;
    }
  }, [order?.status]);

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!order) return;
      onUpdateStatus?.(order.id, e.target.value as OrderDetail["status"]);
    },
    [onUpdateStatus, order?.id]
  );

  if (!isOpen || !order) return null;

  return (
    <>
      <Core
        className={clsx(
          "fixed inset-0 bg-black transition-opacity duration-300 z-[9998]",
          isOpen ? "bg-opacity-60" : "bg-opacity-0"
        )}
        onClick={onClose}
      />

      <Core
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="h-full overflow-y-auto">
          {/* Header */}
          <Area className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <Yard>
              <RText className="text-xl font-semibold text-gray-900">
                Order Details
              </RText>
              <RText className="text-sm text-gray-500">
                Order Number: {order.order_number}
              </RText>
              <RText className="text-xs text-gray-400">ID: {order.id}</RText>
            </Yard>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </Area>

          <Container className="p-6 space-y-6">
            {/* Order Management */}
            <Yard className="bg-gray-50 rounded-lg p-6">
              <RText className="text-lg font-medium text-gray-900 mb-4">
                Order Management
              </RText>

              <Area className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status */}
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-2">
                    Order Status
                  </RText>
                  <Area className="flex items-center gap-3 mb-3">
                    <Yard
                      className={clsx(
                        "p-2 rounded-full",
                        getStatusColor(order.status)
                      )}
                    >
                      {statusIcon}
                    </Yard>
                    <Yard>
                      <RText className="font-medium capitalize">
                        {order.status.toLowerCase()}
                      </RText>
                      <RText className="text-sm text-gray-500">
                        Last updated {formatDate(order.updatedAt)}
                      </RText>
                    </Yard>
                  </Area>
                  {onUpdateStatus && (
                    <select
                      value={order.status}
                      onChange={handleStatusChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {orderStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </Yard>

                {/* Payment Method */}
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </RText>
                  <Area className="flex items-center gap-3 mb-3">
                    <Yard
                      className={clsx(
                        "p-2 rounded-full",
                        getPaymentMethodColor(order.payment_method)
                      )}
                    >
                      <CreditCard className="w-5 h-5" />
                    </Yard>
                    <Yard>
                      <RText className="font-medium capitalize">
                        {order.payment_method.replace("_", " ")}
                      </RText>
                      <RText className="text-sm text-gray-500">
                        {formatCurrency(order.total_amount)}
                      </RText>
                    </Yard>
                  </Area>
                </Yard>

                {/* Payment Status */}
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </RText>
                  <Area className="flex items-center gap-3 mb-3">
                    <Yard
                      className={clsx(
                        "p-2 rounded-full",
                        order.payment_status === "PAID"
                          ? "bg-green-100 text-green-600"
                          : order.payment_status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      )}
                    >
                      <CreditCard className="w-5 h-5" />
                    </Yard>
                    <Yard>
                      <RText className="font-medium">
                        {order.payment_status}
                      </RText>
                      <RText className="text-sm text-gray-500">
                        {order.receipt_url && (
                          <a
                            href={order.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            View Receipt
                          </a>
                        )}
                      </RText>
                    </Yard>
                  </Area>
                </Yard>

                {/* Voucher */}
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-2">
                    Voucher Applied
                  </RText>
                  <RText className="text-gray-900">
                    {order.voucher_id ? "Yes" : "No"}
                  </RText>
                  {order.voucher_id && (
                    <RText className="text-sm text-gray-500">
                      Voucher ID: {order.voucher_id}
                    </RText>
                  )}
                </Yard>

                {/* Cancel Info - Only show for cancelled orders */}
                {order.status === "CANCELLED" && (
                  <Yard>
                    <RText className="text-sm font-medium text-gray-700 mb-2">
                      Cancellation Details
                    </RText>
                    {order.reason && (
                      <Yard className="mb-3">
                        <RText className="text-sm font-medium text-gray-600 mb-1">
                          Reason:
                        </RText>
                        <RText className="text-gray-900 bg-red-50 p-3 rounded-lg border border-red-200">
                          {order.reason}
                        </RText>
                      </Yard>
                    )}
                    {order.images && order.images.length > 0 && (
                      <Yard>
                        <RText className="text-sm font-medium text-gray-600 mb-2">
                          Supporting Images ({order.images.length}):
                        </RText>
                        <Area className="grid grid-cols-2 gap-2">
                          {order.images.map((image, index) => (
                            <Yard
                              key={index}
                              className="border rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setSelectedImage(image)}
                            >
                              <img
                                src={image}
                                alt={`Cancel evidence ${index + 1}`}
                                className="w-full h-24 object-cover"
                              />
                            </Yard>
                          ))}
                        </Area>
                      </Yard>
                    )}
                  </Yard>
                )}
              </Area>
            </Yard>

            {/* Customer Information */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4">
                Customer Information
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-500">
                    Name
                  </RText>
                  <RText className="text-gray-900">{order.user.name}</RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-500">
                    Email
                  </RText>
                  <RText className="text-gray-900">{order.user.email}</RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-500">
                    Phone
                  </RText>
                  <RText className="text-gray-900">{order.address.phone}</RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-500">
                    Order Date
                  </RText>
                  <RText className="text-gray-900">
                    {formatDate(order.createdAt)}
                  </RText>
                </Yard>
              </Area>
            </Yard>

            {/* Shipping Info */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4">
                Shipping Information
              </RText>
              <Yard>
                <RText className="text-sm font-medium text-gray-500">
                  Shipping Address
                </RText>
                <RText className="text-gray-900">
                  {order.address.address}, {order.address.city} -{" "}
                  {order.address.pincode}
                </RText>
              </Yard>
            </Yard>

            {/* Order Items */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4">
                Order Items
              </RText>
              <Area className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Discount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Final Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <Area className="flex items-center">
                            <img
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.title || "product image"}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                            <RText className="font-medium text-gray-900">
                              {item.title}
                            </RText>
                          </Area>
                        </td>
                        <td className="px-4 py-3 text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-gray-900">
                          {formatCurrency(item.unit_price)}
                        </td>
                        <td className="px-4 py-3 text-red-600">
                          -{formatCurrency(item.discount_per_item)}
                        </td>
                        <td className="px-4 py-3 text-gray-900">
                          {formatCurrency(item.final_price)}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {formatCurrency(item.total_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Area>

              <Area className="mt-4 border-t border-gray-200 pt-4">
                <Yard className="flex justify-end">
                  <RText className="text-xl font-semibold text-gray-900">
                    <Yard className="space-y-2">
                      <Yard className="flex justify-between">
                        <RText className="text-gray-600">Subtotal:</RText>
                        <RText className="text-gray-900">
                          {formatCurrency(order.subtotal)}
                        </RText>
                      </Yard>
                      <Yard className="flex justify-between">
                        <RText className="text-gray-600">Discount:</RText>
                        <RText className="text-red-600">
                          -{formatCurrency(order.discount_amount)}
                        </RText>
                      </Yard>
                      <Yard className="flex justify-between">
                        <RText className="text-gray-600">Shipping Fee:</RText>
                        <RText className="text-gray-900">
                          {formatCurrency(order.shipping_fee)}
                        </RText>
                      </Yard>
                      <Yard className="flex justify-between border-t pt-2">
                        <RText className="font-semibold text-gray-900">
                          Total:
                        </RText>
                        <RText className="font-semibold text-gray-900">
                          {formatCurrency(order.total_amount)}
                        </RText>
                      </Yard>
                    </Yard>
                  </RText>
                </Yard>
              </Area>
            </Yard>
          </Container>
        </Container>
      </Core>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <>
          <Core
            className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <Yard className="relative max-w-4xl max-h-full p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 hover:bg-black bg-opacity-50 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Zoomed image"
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </Yard>
          </Core>
        </>
      )}
    </>
  );
}
