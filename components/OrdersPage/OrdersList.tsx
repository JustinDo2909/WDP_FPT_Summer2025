import React from "react";
import OrderCard from "../OrdersPage/OrderCard";

const dummyOrders = [
  {
    shopName: "89 Japan Shop",
    shopLink: "#",
    status: "Completed",
    products: [
      {
        name: "Matcha Premium Kanes 30g (Exp: 08/2025)",
        image: "/images/facecare.png",
        price: 139500,
        originalPrice: 155000,
        quantity: 1,
      },
    ],
    total: 128340,
  },
  {
    shopName: "caseiphone12.vn",
    shopLink: "#",
    status: "Completed",
    products: [
      {
        name: "Samsung A50/A50S/A30S Soft TPU Case",
        image: "/images/facecare.png",
        price: 37800,
        originalPrice: 75600,
        quantity: 1,
        variant: "ZhiZhuXia, Samsung A50/A50S/A30S",
      },
    ],
    total: 38276,
  },
];

export default function OrdersList() {
  return (
    <div>
      {dummyOrders.map((order, idx) => (
        <OrderCard key={idx} {...order} />
      ))}
    </div>
  );
}
