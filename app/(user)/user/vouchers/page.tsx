'use client'

import VoucherList from "../../../../components/VouchersPage/VoucherList";
import { VouchersSearch } from "@/components/VouchersPage/VouchersSearch";
import { Box } from "@/lib/by/Div";
import { useGetUserVouchersQuery } from '@/process/api/api';

export default function VouchersPage() {
  const { data, isLoading } = useGetUserVouchersQuery();
  const vouchers = data?.vouchers || [];

  return (
      <Box className="flex-1">
        
            <VouchersSearch />
            {!isLoading && <VoucherList vouchers={vouchers} />}
      </Box>
  );
}
