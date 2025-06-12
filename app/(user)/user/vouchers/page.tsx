'use client'

import VoucherList from "../../../../components/VouchersPage/VoucherList";
import { VouchersSearch } from "@/components/VouchersPage/VouchersSearch";
import { Box } from "@/lib/by/Div";
import { useGetAllVouchersQuery } from '@/process/api/api';

export default function VouchersPage() {
  const { data, isLoading } = useGetAllVouchersQuery();
  const vouchers = data?.vouchers || [];

  return (
      <Box className="flex-1">
        
            <VouchersSearch />
            {!isLoading && <VoucherList vouchers={vouchers} />}
      </Box>
  );
}
