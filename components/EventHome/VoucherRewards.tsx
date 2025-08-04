import { fallbackRewards } from "@/constants/event";
import { Block, Column, Group, Row, RText, Section, Yard } from "@/lib/by/Div";
import { formatPrice } from "@/lib/share/formatPrice";
import { map } from "lodash";
import { Star, Info, Gift, X, Package, TicketPercent } from "lucide-react";
import React, { useState } from "react";

interface VoucherRewardsProps {
  rewards?: ILeaderBoardReward[];
  event: IEvent;
  hideToggleButton?: boolean;
}

export default function VoucherRewards({
  rewards = fallbackRewards,
  event,
  hideToggleButton = false,
}: VoucherRewardsProps) {
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
    if (voucher.type === "PERCENT") {
      return `${voucher.discount_value}% off your order!`;
    }
    return `${formatPrice(voucher.discount_value)} off your order!`;
  };

  return (
    <Yard className="border-white bg-pink-100 border-4 rounded-2xl p-4 w-full shadow-lg">
      {!hideToggleButton && (
        <button className="game-button w-full mb-4">
          <Block className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5" />
            <span>Rank Rewards</span>
          </Block>
        </button>
      )}

      <Section className="space-y-3">
        {rewards?.map((reward) => (
          <Block key={reward.id} className="space-y-2">
            {/* Rank Header */}
            <RText className="flex items-center justify-center gap-2 text-sm font-bold text-pink-800">
              <span>{formatRank(reward.rank_from, reward.rank_to)}</span>
            </RText>
            {/* Voucher Pills */}
            <Column className="space-y-2">
              {reward.voucherTemplates.map((voucher) => (
                <Row
                  key={voucher.id}
                  className="bg-white border border-pink-200 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ring-1 ring-white/70"
                >
                  <Group className="flex items-center justify-between">
                    <Block className="flex items-center gap-2 flex-1">
                      <TicketPercent
                        size={16}
                        className="text-pink-500 shrink-0"
                      />
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {reward.title}
                      </span>
                    </Block>
                    <button
                      onClick={() => handleOpenModal(voucher)}
                      className="flex items-center justify-center w-6 h-6 text-pink-600 hover:text-white hover:bg-pink-500 rounded-full transition-colors duration-200"
                      title="View details"
                    >
                      <Info size={14} />
                    </button>
                  </Group>
                  <Block className="text-xs text-gray-600 mt-1">
                    {getVoucherText(voucher)}
                  </Block>
                </Row>
              ))}

              
            </Column>
          </Block>
        ))}

        <RText className="flex items-center justify-center gap-2 text-sm font-bold text-pink-800">
              <span>Voucher Milestone: {event.milestone_score} points </span>
            </RText>

              <Row
                  className="bg-white border border-pink-200 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ring-1 ring-white/70"
                >
                  <Group className="flex items-center justify-between">
                    <Block className="flex items-center gap-2 flex-1">
                      <TicketPercent
                        size={16}
                        className="text-pink-500 shrink-0"
                      />
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        Voucher Milestone
                      </span>
                    </Block>
                    <button
                      onClick={() => {
                        if (event && event.voucherTemplates && event.voucherTemplates[0]) {
                          handleOpenModal(event.voucherTemplates[0]);
                        }
                      }}
                      className="flex items-center justify-center w-6 h-6 text-pink-600 hover:text-white hover:bg-pink-500 rounded-full transition-colors duration-200"
                      title="View details"
                    >
                      <Info size={14} />
                    </button>
                  </Group>
                  <Block className="text-xs text-gray-600 mt-1">
                    {getVoucherText(event.voucherTemplates[0])}
                  </Block>
                </Row>
      </Section>

      {/* Enhanced Modal */}
      {selectedVoucher && (
        <Section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Block className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <Block className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4">
              <Block className="flex items-center justify-between">
                <Group className="flex items-center gap-3">
                  <RText className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Gift size={18} />
                  </RText>
                  <Block>
                    <h2 className="text-lg font-bold">Voucher Details</h2>
                    <p className="text-pink-100 text-sm">
                      {getVoucherText(selectedVoucher)}
                    </p>
                  </Block>
                </Group>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </Block>
            </Block>
            {/* Modal Content */}
            <Block className="p-4 overflow-y-auto max-h-[60vh]">
              <Block className="flex items-center gap-2 mb-4">
                <Package size={18} className="text-pink-500" />
                <RText className="font-semibold text-gray-800">
                  Applicable Products
                </RText>
              </Block>
              {selectedVoucher.voucherProducts &&
              selectedVoucher.voucherProducts.length > 0 ? (
                <Column className="space-y-3">
                  {map(selectedVoucher.voucherProducts, (product) => (
                    <Row
                      key={product.product.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <RText className="font-semibold text-gray-800 mb-1">
                        {product.product.title}
                      </RText>
                      {product.product.description && (
                        <RText className="text-sm text-gray-600 leading-relaxed">
                          {product.product.description}
                        </RText>
                      )}
                    </Row>
                  ))}
                </Column>
              ) : (
                <Block className="text-center py-8">
                  <Block className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package size={24} className="text-gray-400" />
                  </Block>
                  <RText className="text-gray-500">
                    No specific products attached to this voucher.
                  </RText>
                  <RText className="text-sm text-gray-400 mt-1">
                    This voucher can be used on eligible items.
                  </RText>
                </Block>
              )}
            </Block>
            {/* Modal Footer */}
            <Block className="p-4 bg-gray-50 border-t">
              <button
                onClick={handleCloseModal}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>Close</span>
              </button>
            </Block>
          </Block>
        </Section>
      )}
    </Yard>
  );
}
