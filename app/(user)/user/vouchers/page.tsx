'use client'

import VoucherList from "../../../../components/VouchersPage/VoucherList";
import { VouchersSearch } from "@/components/VouchersPage/VouchersSearch";
import { Box } from "@/lib/by/Div";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/pattern/share/Tabs";
import { useGetUserVouchersQuery } from '@/process/api/api';



export default function VouchersPage() {
  const { data, isLoading } = useGetUserVouchersQuery();
  const vouchers = data?.vouchers || [];

  const filterVouchers = (type: "all" | "usable" | "redeemed" | "expired"): IVoucher[] => {
    if (!vouchers) return [];
    const now = new Date();
    return vouchers.filter(v => {
      const expiry = new Date(new Date(v.created_at).getTime() + 2 * 24 * 60 * 60 * 1000);
      if (type === "redeemed") return v.redeemed === true;
      if (type === "expired") return expiry < now && !v.redeemed;
      if (type === "usable") return  v.redeemed === false;
      return true; // all
    });
    }

  return (
      <Box className="flex-1">
        <Tabs defaultValue="usable">
  <TabsList>
    <TabsTrigger value="usable">Usable</TabsTrigger>
    <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
    <TabsTrigger value="expired">Expired</TabsTrigger>
  </TabsList>

  <TabsContent value="usable">
    <VouchersSearch />
    {!isLoading && <VoucherList vouchers={filterVouchers("usable")} />}
  </TabsContent>

  <TabsContent value="redeemed">
    <VouchersSearch />
    {!isLoading && <VoucherList vouchers={filterVouchers("redeemed")} />}
  </TabsContent>

  <TabsContent value="expired">
    <VouchersSearch />
    {!isLoading && <VoucherList vouchers={filterVouchers("expired")} />}
  </TabsContent>

</Tabs>
      </Box>
  );
}
