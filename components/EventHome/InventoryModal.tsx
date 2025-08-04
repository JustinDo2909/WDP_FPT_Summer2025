import { Wrap } from "@/lib/by/Div";
import { map } from "lodash";
import React from "react";
import { formatDiscount } from "../CheckoutPage/seg/calculateVoucherDiscount";

export default function InventoryModal({
  open,
  onClose,
  vouchers
}: {
  open: boolean;
  onClose: () => void;
  vouchers?: IVoucher[]
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Your Vouchers</h3>
          <button className="" onClick={onClose}>Close</button>
        </div>
        {vouchers && vouchers.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {map(vouchers, v => (
              <div key={v.id} className="bg-gray-100 p-3 rounded border border-gray-300">
                <div className="font-bold text-purple-700">{formatDiscount(v)}</div>
                <Wrap className="text-base font-semibold text-gray-800">
                  Get {formatDiscount(v)} on
                </Wrap>
                <div className="text-xs text-gray-500">Exp: {v.expired_at}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-lg text-gray-600 font-semibold">
              No vouchers collected
            </p>
            <p className="text-sm text-gray-500">
              Play more to win more!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}