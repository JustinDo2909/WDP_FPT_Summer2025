"use client";

import {
  formatCurrency,
  getStatusBadgeConfig,
  getPaymentMethodIcon,
  getRecentTransactions,
} from "@/components/admin/Dashboard/seg/utils";
import map from "lodash/map";
import {
  Area,
  Yard,
  Section,
  RText,
  Core,
  Container,
} from "@/lib/by/Div/index";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "@/process/api/api";
import { useGetAllUsersQuery } from "@/process/api/apiUser";

export function TransactionsTable() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // API queries
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();

  // Process data
  const orders = ordersData?.orders || [];
  const users = usersData || [];
  const transactions = getRecentTransactions(orders, users);

  // Show loading state for both mounting and data loading
  if (!isMounted || ordersLoading || usersLoading) {
    return (
      <Core className="bg-white rounded-lg shadow-sm border">
        <Container className="p-6 border-b">
          <Area className="flex items-center justify-between">
            <Yard>
              <RText className="text-lg font-semibold">Transactions</RText>
              <RText className="text-sm text-gray-600">
                This is a list of latest transactions
              </RText>
            </Yard>
          </Area>
        </Container>
        <Container className="p-6 animate-pulse">
          <Core className="h-60 bg-gray-200 rounded"></Core>
        </Container>
      </Core>
    );
  }

  return (
    <Core className="bg-white rounded-lg shadow-sm border">
      <Container className="p-6 border-b">
        <Area className="flex items-center justify-between">
          <Yard>
            <RText className="text-lg font-semibold">Transactions</RText>
            <RText className="text-sm text-gray-600">
              This is a list of latest transactions
            </RText>
          </Yard>
        </Area>
      </Container>
      <Container className="p-6">
        <Area className="overflow-x-auto">
          {transactions.length === 0 ? (
            <RText className="text-gray-500 text-center py-8">
              No transactions available
            </RText>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    TRANSACTION
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    DATE & TIME
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    AMOUNT
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    REFERENCE NUMBER
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    PAYMENT METHOD
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {map(transactions, (transaction) => {
                  const statusConfig = getStatusBadgeConfig(transaction.status);
                  const paymentIcon = getPaymentMethodIcon(
                    transaction.paymentMethod,
                  );

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <Yard className="font-medium">
                          Payment from {transaction.customer}
                        </Yard>
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="py-4 px-4">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {transaction.reference}
                      </td>
                      <td className="py-4 px-4">
                        <Yard className="flex items-center space-x-2">
                          <Section className={paymentIcon.className}>
                            {paymentIcon.text}
                          </Section>
                          <span className="text-gray-500">
                            {transaction.paymentMethod}
                          </span>
                        </Yard>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig.className}`}
                        >
                          {statusConfig.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Area>
      </Container>
    </Core>
  );
}
