import React from "react";
import VoucherCard from "./VoucherCard";
import { Box } from "@/lib/by/Div";
import { map } from "lodash";

export default function VoucherList({
  vouchers,
}: {
  readonly vouchers: IVoucher[];
}) {
  return (
    <Box className="flex-col flex space-y-4">
      {map(vouchers, (voucher) => (
        <VoucherCard key={voucher.id} voucher={voucher} />
      ))}
    </Box>
  );
}
