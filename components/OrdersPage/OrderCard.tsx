import { Begin, Card, Column, Row, RText, Wrap } from "@/lib/by/Div";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OrderCardProps {
  order: IOrder;
  onBuyAgain?: () => void;
  onContactSeller?: () => void;
}

export default function OrderCard({
  order,
  onBuyAgain,
  onContactSeller,
}: OrderCardProps): JSX.Element {
  const { orderItems, status, total_amount } = order;

  return (
    <Card className="bg-white rounded shadow p-6 mb-6">
      <Row className="flex items-center justify-between mb-4">
        <span className="text-green-600 font-medium">{status}</span>
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
                <RText className="font-medium text-gray-900 truncate">{item.title}</RText>
                <RText className="text-xs text-gray-500">x{item.quantity}</RText>
              </Begin>
              <Begin className="flex-1">
                <RText className="text-xs text-gray-900">Price</RText>
                <RText className=" text-gray-500">₫{item.price.toLocaleString()}</RText>
              </Begin>
              <RText className="text-right">
                <span className="text-pink-600 font-semibold">
                  ₫{(item.price * item.quantity).toLocaleString()}
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
        <RText className="text-gray-700 font-medium">
          Total:{" "}
          <span className="text-pink-600 text-lg">
            ₫{total_amount.toLocaleString()}
          </span>
        </RText>
        <Wrap className="space-x-2">
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            onClick={onBuyAgain}
          >
            Buy Again
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            onClick={onContactSeller}
          >
            Contact
          </button>
        </Wrap>
      </Row>
    </Card>
  );
}
