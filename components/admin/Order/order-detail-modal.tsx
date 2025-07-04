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
import { useMemo, useCallback } from "react";
import clsx from "clsx";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetail | null;
  onUpdateStatus?: (orderId: string, newStatus: OrderDetail["status"]) => void;
}

export function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

  const statusIcon = useMemo(() => {
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
  }, [order.status]);

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onUpdateStatus?.(order.id, e.target.value as OrderDetail["status"]);
    },
    [onUpdateStatus, order.id]
  );

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
                Order ID: {order.id}
              </RText>
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
                {order.address.notes && (
                  <RText className="text-sm text-gray-500 mt-1">
                    Note: {order.address.notes}
                  </RText>
                )}
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
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.orderItems.map((item) => (
                      <tr key={item.id}>
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
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Area>

              {/* Total */}
              <Area className="mt-4 border-t border-gray-200 pt-4">
                <Yard className="flex justify-end">
                  <RText className="text-xl font-semibold text-gray-900">
                    Total: {formatCurrency(order.total_amount)}
                  </RText>
                </Yard>
              </Area>
            </Yard>
          </Container>
        </Container>
      </Core>
    </>
  );
}
