import React from "react";

export default function OrderCard({
  shopName,
  shopLink,
  status,
  products,
  total,
  onBuyAgain,
  onContactSeller,
}: {
  shopName: string;
  shopLink: string;
  status: string;
  products: Array<{
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    variant?: string;
  }>;
  total: number;
  onBuyAgain?: () => void;
  onContactSeller?: () => void;
}) {
  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      {/* <div className="flex items-center justify-between mb-4">
        <a href={shopLink} className="font-semibold text-gray-800 hover:text-pink-600">
          {shopName}
        </a>
        <span className="text-green-600 font-medium">{status}</span>
      </div> */}
      <div className="divide-y">
        {products.map((product, idx) => (
          <div key={idx} className="flex py-4 items-center">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover mr-4" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">{product.name}</div>
              {product.variant && <div className="text-xs text-gray-500">{product.variant}</div>}
              <div className="text-xs text-gray-500">x{product.quantity}</div>
            </div>
            <div className="text-right">
              {product.originalPrice && (
                <span className="line-through text-gray-400 text-sm mr-2">₫{product.originalPrice.toLocaleString()}</span>
              )}
              <span className="text-pink-600 font-semibold">₫{product.price.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-700 font-medium">
          Total: <span className="text-pink-600 text-lg">₫{total.toLocaleString()}</span>
        </div>
        <div className="space-x-2">
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
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}
