import { Begin, Card, Column, Row, RText, Wrap } from "@/lib/by/Div";
import { useCancelOrderMutation } from "@/process/api/api";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/share/formatPrice";

interface OrderCardProps {
  order: IOrder;
  onBuyAgain?: () => void;
  onViewReciept?: () => void;
}

export default function OrderCard({
  order,
  onBuyAgain,
  onViewReciept,
}: OrderCardProps): JSX.Element {
  const { orderItems, status, total_amount, createdAt, updatedAt, id } = order;

  // Add cancel mutation
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const handleCancelOrder = async () => {
    try {
      await cancelOrder({ id, reason: cancelReason }).unwrap();
      setShowModal(false);
      toast.success(
        "Order cancelled successfully. You have been refunded " +
          formatPrice(total_amount),
      );
    } catch (err) {
      // Optionally, handle error
      console.error("Cancel order failed:", err);
    }
  };

  return (
    <Card className="bg-white rounded shadow p-6 mb-6">
      <Row className="flex items-center justify-between mb-4">
        <RText className="text-base font-medium text-primary">
          {new Date(createdAt).toLocaleDateString(undefined, {
            dateStyle: "medium",
          })}
        </RText>
        <Begin className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            {status}
          </span>
          <RText className="text-xs text-muted-foreground">
            Last updated{" "}
            {new Date(updatedAt).toLocaleDateString(undefined, {
              dateStyle: "medium",
            })}
          </RText>
        </Begin>
      </Row>

      <Column className="divide-y">
        {orderItems.map((item) => (
          <Row key={item.id} className="flex py-4 items-center w-full">
            <Link
              href={`/user/orders/${order.id}`}
              className="flex items-center flex-1 min-w-0"
            >
              <Image
                width={64}
                height={64}
                src={item.image_url}
                alt={item.title}
                className="w-16 h-16 rounded object-cover mr-4"
              />
              <Begin className="flex-1 min-w-0">
                <RText className="font-medium text-gray-900 truncate">
                  {item.title}
                </RText>
                <RText className="text-xs text-gray-500">
                  x{item.quantity}
                </RText>
              </Begin>
              <Begin className="flex-1">
                <RText className="text-xs text-gray-900">Price</RText>
                {item.unit_price !== item.final_price ? (
                  <>
                    <RText className="">{formatPrice(item.final_price)}</RText>
                    <RText className="text-sm text-gray-500 line-through">
                      {formatPrice(item.unit_price)}
                    </RText>
                  </>
                ) : (
                  <RText className="">{formatPrice(item.unit_price)}</RText>
                )}
              </Begin>
              <RText className="text-right">
                <span className="text-pink-600 font-semibold">
                  {formatPrice(item.total_price)}
                </span>
              </RText>
            </Link>
            <Wrap className="ml-4">
              <Link
                href={`/products/${item.product_id}#reviews`}
                className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-all text-xs"
                scroll={true}
              >
                Review
              </Link>
            </Wrap>
          </Row>
        ))}
      </Column>
      <Row className="flex justify-between items-center mt-4">
        <Begin className="space-y-1">
          <RText className="text-sm text-muted-foreground">
            Price:{" "}
            <span className="font-medium text-primary">
              {formatPrice(order.subtotal)}
            </span>
          </RText>
          <RText className="text-sm text-muted-foreground">
            Shipping:{" "}
            <span className="font-medium text-primary">
              {formatPrice(order.shipping_fee)}
            </span>
          </RText>
          <RText className="text-sm text-muted-foreground">
            Discount:{" "}
            <span className="font-medium text-primary">
              -{formatPrice(order.discount_amount)}
            </span>
          </RText>
          <RText className="text-base font-semibold text-primary">
            Total: {formatPrice(total_amount)}
          </RText>
        </Begin>
        <Wrap className="space-x-2">
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            onClick={onBuyAgain}
          >
            Buy Again
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            onClick={onViewReciept}
          >
            View Receipt
          </button>
          {status === "PROCESSING" && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowModal(true)}
              disabled={isCancelling}
            >
              Refund
            </button>
          )}
          {status === "DELIVERED" && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              Upload Proof
            </button>
          )}
        </Wrap>
      </Row>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              {status === "PROCESSING"
                ? "Refund Order"
                : "Upload Delivery Proof"}
            </h3>
            <p className="mb-6">
              {status === "PROCESSING"
                ? "Are you sure you want to refund this order?"
                : "Please upload proof of delivery."}
            </p>
            {(status === "PROCESSING" || status === "DELIVERED") && (
              <div className="mb-4">
                <label
                  htmlFor="cancelReason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Cancellation
                </label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter reason for cancellation"
                />
              </div>
            )}

            <Row className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
                disabled={isCancelling}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleCancelOrder}
                disabled={isCancelling}
              >
                {isCancelling
                  ? "Processing..."
                  : status === "PROCESSING"
                    ? "Yes, Cancel"
                    : "Upload"}
              </button>
            </Row>
          </div>
        </div>
      )}
    </Card>
  );
}
