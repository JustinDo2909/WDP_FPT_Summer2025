// 'use client'

// import UserLayout from "../../../../components/UserPage/UserLayout";
// import VouchersList from "../../../../components/VouchersPage/VouchersList";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "../../../../lib/pattern/share/Tabs";
// import { VouchersSearch } from "@/components/VouchersPage/VouchersSearch";
// import { Box } from "@/lib/by/Div";
// import { useGetVouchersQuery } from "@/process/api/apiVouchers";

// export default function VouchersPage() {
//   const {data, isLoading } = useGetVouchersQuery();
//   const vouchers = data?.vouchers

//   return (
//     <UserLayout>
//       <Box className="flex-1">
//         <Tabs defaultValue="all">
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="processing">Processing</TabsTrigger>
//             <TabsTrigger value="shipping">Shipping</TabsTrigger>
//             <TabsTrigger value="completed">Completed</TabsTrigger>
//             <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
//             <TabsTrigger value="returns">Returns/Refunds</TabsTrigger>
//           </TabsList>
//           <TabsContent value="all">
//             <VouchersSearch />
//             {!isLoading && <VouchersList vouchers={vouchers} /> }
//           </TabsContent>
//         </Tabs>
//       </Box>
//     </UserLayout>
//   );
// }
