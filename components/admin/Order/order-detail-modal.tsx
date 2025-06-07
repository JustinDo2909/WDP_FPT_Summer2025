"use client";

import {
  X,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Edit2,
  Save,
} from "lucide-react";
import { useState } from "react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getPaymentStatusColor,
} from "@/components/admin/Order/seg/utils";
import {
  orderStatusOptions,
  paymentStatusOptions,
} from "@/constants/manage-orders/index";
import { type Order } from "@/constants/manage-orders/index";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus?: (orderId: string, newStatus: Order["status"]) => void;
  onUpdatePaymentStatus?: (
    orderId: string,
    newPaymentStatus: Order["paymentStatus"]
  ) => void;
  onUpdateTrackingNumber?: (orderId: string, trackingNumber: string) => void;
}

export function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  onUpdatePaymentStatus,
  onUpdateTrackingNumber,
}: OrderDetailModalProps) {
  const [isEditingTracking, setIsEditingTracking] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  if (!isOpen || !order) return null;

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "processing":
        return <Package className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const handleSaveTrackingNumber = () => {
    if (onUpdateTrackingNumber && trackingNumber.trim()) {
      onUpdateTrackingNumber(order.id, trackingNumber.trim());
    }
    setIsEditingTracking(false);
    setTrackingNumber("");
  };

  const startEditingTracking = () => {
    setTrackingNumber(order.trackingNumber || "");
    setIsEditingTracking(true);
  };

  return (
    <>
      {/* Backdrop */}
      <Core
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[9998] ${
          isOpen ? "bg-opacity-60" : "bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <Core
        className={`fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
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
            {/* Order Status Management */}
            <Yard className="bg-gray-50 rounded-lg p-6">
              <RText className="text-lg font-medium text-gray-900 mb-4">
                Order Management
              </RText>

              <Area className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Status */}
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-2">
                    Order Status
                  </RText>
                  <Area className="flex items-center gap-3 mb-3">
                    <Yard
                      className={`p-2 rounded-full ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                    </Yard>
                    <Yard>
                      <RText className="font-medium capitalize">
                        {order.status.replace("_", " ")}
                      </RText>
                      <RText className="text-sm text-gray-500">
                        Last updated {formatDate(order.orderDate)}
                      </RText>
                    </Yard>
                  </Area>
                  {onUpdateStatus && (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onUpdateStatus(
                          order.id,
                          e.target.value as Order["status"]
                        )
                      }
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

                {/* Payment Status */}
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </RText>
                  <Area className="flex items-center gap-3 mb-3">
                    <Yard
                      className={`p-2 rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}
                    >
                      <CreditCard className="w-5 h-5" />
                    </Yard>
                    <Yard>
                      <RText className="font-medium capitalize">
                        {order.paymentStatus.replace("_", " ")}
                      </RText>
                      <RText className="text-sm text-gray-500 capitalize">
                        {order.paymentMethod.replace("_", " ")}
                      </RText>
                    </Yard>
                  </Area>
                  {onUpdatePaymentStatus && (
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        onUpdatePaymentStatus(
                          order.id,
                          e.target.value as Order["paymentStatus"]
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {paymentStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </Yard>
              </Area>

              {/* Tracking Number */}
              <Yard className="mt-6">
                <RText className="text-sm font-medium text-gray-700 mb-2">
                  Tracking Number
                </RText>
                {isEditingTracking ? (
                  <Area className="flex items-center gap-2">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSaveTrackingNumber}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsEditingTracking(false)}
                      className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </Area>
                ) : (
                  <Area className="flex items-center gap-2">
                    <RText className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm">
                      {order.trackingNumber || "No tracking number"}
                    </RText>
                    {onUpdateTrackingNumber && (
                      <button
                        onClick={startEditingTracking}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </Area>
                )}
              </Yard>
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
                  <RText className="text-gray-900">{order.customerName}</RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-500">
                    Email
                  </RText>
                  <RText className="text-gray-900">{order.customerEmail}</RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-500">
                    Phone
                  </RText>
                  <RText className="text-gray-900">{order.customerPhone}</RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-500">
                    Order Date
                  </RText>
                  <RText className="text-gray-900">
                    {formatDate(order.orderDate)}
                  </RText>
                </Yard>
              </Area>
            </Yard>

            {/* Shipping Information */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4">
                Shipping Information
              </RText>
              <Yard>
                <RText className="text-sm font-medium text-gray-500">
                  Shipping Address
                </RText>
                <RText className="text-gray-900">{order.shippingAddress}</RText>
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
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <Area className="flex items-center">
                            <img
                              src={item.productImage || "/placeholder.svg"}
                              alt={item.productName}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                            <RText className="font-medium text-gray-900">
                              {item.productName}
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
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Area>

              {/* Order Total */}
              <Area className="mt-4 border-t border-gray-200 pt-4">
                <Yard className="flex justify-end">
                  <RText className="text-xl font-semibold text-gray-900">
                    Total: {formatCurrency(order.total)}
                  </RText>
                </Yard>
              </Area>
            </Yard>

            {/* Notes */}
            {order.notes && (
              <Yard>
                <RText className="text-lg font-medium text-gray-900 mb-4">
                  Notes
                </RText>
                <Area className="bg-gray-50 rounded-lg p-4">
                  <RText className="text-gray-700">{order.notes}</RText>
                </Area>
              </Yard>
            )}
          </Container>
        </Container>
      </Core>
    </>
  );
}
