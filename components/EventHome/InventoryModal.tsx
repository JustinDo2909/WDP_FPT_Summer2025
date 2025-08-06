import { map } from "lodash";
import React from "react";

const vouchers = [
  { code: "SUMMER25", desc: "₫25,000 OFF", expiry: "2025-12-31" },
  { code: "GLOW10", desc: "10% OFF", expiry: "2025-08-31" },
  { code: "VIP50", desc: "₫50,000 OFF", expiry: "2025-09-30" },
  { code: "FREESHIP", desc: "Free Shipping", expiry: "2025-10-15" },
];

export default function InventoryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Your Vouchers</h3>
          <button className="" onClick={onClose}>Close</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {map(vouchers, v => (
            <div key={v.code} className="bg-gray-100 p-3 rounded border border-gray-300">
              <div className="font-bold text-purple-700">{v.code}</div>
              <div className="text-lg font-semibold">{v.desc}</div>
              <div className="text-xs text-gray-500">Exp: {v.expiry}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
