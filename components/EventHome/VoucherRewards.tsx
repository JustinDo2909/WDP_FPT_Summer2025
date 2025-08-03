import { fallbackRewards } from "@/constants/event";
import { formatPrice } from "@/lib/share/formatPrice";
import { map } from "lodash";
import {
  Star,
  Info,
  Gift,
  X,
  Package,
  TicketPercent,
} from "lucide-react";
import React, { useState } from "react";

export default function VoucherRewards({
  rewards = fallbackRewards,
}: {
  rewards?: ILeaderBoardReward[];
}) {
  const [selectedVoucher, setSelectedVoucher] =
    useState<IVoucherTemplate | null>(null);

  const handleOpenModal = (voucher: IVoucherTemplate) => {
    setSelectedVoucher(voucher);
  };

  const handleCloseModal = () => {
    setSelectedVoucher(null);
  };

  const formatRank = (from: number, to: number) =>
    from === to ? `Rank ${from}` : `Rank ${from}-${to}`;

  const getVoucherText = (voucher: IVoucherTemplate) => {
    if (voucher.type === "Percent") {
      return `${voucher.discount_value}% off your order!`;
    }
    return `${formatPrice(voucher.discount_value)} off your order!`;
  };

  return (
    <div className="border-white bg-pink-100 border-4 rounded-2xl p-4 w-64 shadow-lg">
      <button className="game-button w-full mb-4">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-5 h-5" />
          <span>Rank Rewards</span>
        </div>
      </button>
      <div className="space-y-3">
        {rewards?.map((reward) => (
          <div key={reward.id} className="space-y-2">
            {/* Rank Header */}
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-pink-800">
              <span>{formatRank(reward.rank_from, reward.rank_to)}</span>
            </div>
            {/* Voucher Pills */}
            <div className="space-y-2">
              {reward.voucherTemplates.map((voucher) => (
                <div
                  key={voucher.id}
                  className="bg-white border border-pink-200 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ring-1 ring-white/70"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <TicketPercent
                        size={16}
                        className="text-pink-500 shrink-0"
                      />
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {reward.title}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpenModal(voucher)}
                      className="flex items-center justify-center w-6 h-6 text-pink-600 hover:text-white hover:bg-pink-500 rounded-full transition-colors duration-200"
                      title="View details"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {getVoucherText(voucher)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Enhanced Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Gift size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Voucher Details</h2>
                    <p className="text-pink-100 text-sm">
                      {getVoucherText(selectedVoucher)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center gap-2 mb-4">
                <Package size={18} className="text-pink-500" />
                <h3 className="font-semibold text-gray-800">
                  Applicable Products
                </h3>
              </div>
              {selectedVoucher.voucherProducts &&
              selectedVoucher.voucherProducts.length > 0 ? (
                <div className="space-y-3">
                  {map(selectedVoucher.voucherProducts, (product) => (
                    <div
                      key={product.product.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {product.product.title}
                      </h4>
                      {product.product.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {product.product.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    No specific products attached to this voucher.
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    This voucher can be used on eligible items.
                  </p>
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t">
              <button
                onClick={handleCloseModal}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}