"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  formatCurrency,
  calculateTopCustomers,
  calculateCategoryDistribution,
  getCurrentMonthOrders,
} from "@/components/admin/Dashboard/seg/utils";
import map from "lodash/map";
import { StatisticsSectionProps } from "@/types/dashboard/index";
import {
  Area,
  Yard,
  Section,
  Anchor,
  Core,
  Container,
  Block,
  RText,
} from "@/lib/by/Div/index";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import {
  useGetAllOrdersQuery,
  useGetProductsQuery,
  useGetMetaDataQuery,
  api,
} from "@/process/api/api";
import { useGetAllUsersQuery } from "@/process/api/apiUser";
import type { OrderDetail, OrderItem } from "@/types/order";
import { store } from "@/process/api/redux";

const useMultipleOrderDetails = (orderIds: string[]) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderDetails = useCallback(async (ids: string[]) => {
    if (ids.length === 0) {
      setOrderDetails([]);
      return;
    }

    setIsLoading(true);
    try {
      const detailPromises = ids.map(async (orderId) => {
        try {
          const result = await store.dispatch(
            api.endpoints.getOrderDetail.initiate(orderId)
          );

          if (result.data?.order) {
            return result.data.order;
          }
          return null;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Error fetching order ${orderId}:`, error);
          return null;
        }
      });

      const details = await Promise.all(detailPromises);
      const validDetails = details.filter(
        (detail) => detail !== null
      ) as OrderDetail[];

      setOrderDetails(validDetails);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(" Error fetching order details:", error);
      setOrderDetails([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Track previous IDs
  const previousIdsRef = useRef<string>("");
  const currentIdsString = JSON.stringify([...orderIds].sort());

  useEffect(() => {
    if (previousIdsRef.current !== currentIdsString) {
      previousIdsRef.current = currentIdsString;
      fetchOrderDetails(orderIds);
    }
  }, [currentIdsString, fetchOrderDetails, orderIds]);

  return { orderDetails, isLoading };
};

const calculateRealTopProducts = (orderDetails: OrderDetail[]) => {
  const productCount: {
    [key: string]: { name: string; count: number; totalRevenue: number };
  } = {};

  orderDetails.forEach((order) => {
    if (order.orderItems && order.orderItems.length > 0) {
      order.orderItems.forEach((item: OrderItem) => {
        const productId = item.product_id;
        const productName = item.title;
        const revenue = (item.price || 0) * (item.quantity || 0);

        if (productCount[productId]) {
          productCount[productId].count += item.quantity || 1;
          productCount[productId].totalRevenue += revenue;
        } else {
          productCount[productId] = {
            name: productName,
            count: item.quantity || 1,
            totalRevenue: revenue,
          };
        }
      });
    }
  });

  const result = Object.entries(productCount)
    .map(([id, stats]) => ({
      id,
      name: stats.name,
      quantity: stats.count,
      revenue: stats.totalRevenue,
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return result;
};

export function StatisticsSection({
  activeTab,
  setActiveTab,
}: StatisticsSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({
      page: 1,
      pageSize: 1000,
    });
  const { data: metaData, isLoading: metaLoading } = useGetMetaDataQuery();

  const orders = useMemo(() => ordersData?.orders || [], [ordersData?.orders]);
  const users = useMemo(() => usersData || [], [usersData]);
  const products = useMemo(
    () => productsData?.products || [],
    [productsData?.products]
  );
  const categories = useMemo(
    () => metaData?.data?.categories || [],
    [metaData?.data?.categories]
  );

  const currentMonthOrders = useMemo(() => {
    return getCurrentMonthOrders(orders);
  }, [orders]);

  const currentMonthOrderIds = useMemo(() => {
    return currentMonthOrders.map((order) => order.id);
  }, [currentMonthOrders]);

  const { orderDetails, isLoading: orderDetailsLoading } =
    useMultipleOrderDetails(currentMonthOrderIds);

  const topProducts = useMemo(() => {
    return calculateRealTopProducts(orderDetails);
  }, [orderDetails]);

  const topCustomers = useMemo(() => {
    return calculateTopCustomers(currentMonthOrders, users);
  }, [currentMonthOrders, users]);

  const categoryData = useMemo(() => {
    return calculateCategoryDistribution(products, categories);
  }, [products, categories]);

  if (!isMounted) {
    return null;
  }

  if (
    ordersLoading ||
    usersLoading ||
    productsLoading ||
    metaLoading ||
    orderDetailsLoading
  ) {
    return (
      <Core className="grid gap-4 lg:grid-cols-3">
        <Container className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          <Area className="p-6 border-b">
            <RText className="text-lg font-semibold">
              Statistics this month
            </RText>
          </Area>
          <Area className="p-6 animate-pulse">
            <Core className="h-60 bg-gray-200 rounded"></Core>
          </Area>
        </Container>
        <Container className="bg-white rounded-lg shadow-sm border">
          <Area className="p-6 border-b">
            <RText className="text-lg font-semibold">Product Categories</RText>
          </Area>
          <Area className="p-6 animate-pulse">
            <Core className="h-60 bg-gray-200 rounded"></Core>
          </Area>
        </Container>
      </Core>
    );
  }

  return (
    <Core className="grid gap-4 lg:grid-cols-3">
      <Container className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
        <Area className="p-6 border-b">
          <RText className="text-lg font-semibold">Statistics this month</RText>
        </Area>
        <Area className="p-6">
          <Yard className="flex space-x-1 mb-4">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "products"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Top products
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "customers"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Top Customers
            </button>
          </Yard>

          {activeTab === "products" && (
            <Section className="space-y-3">
              {orderDetailsLoading ? (
                <RText className="text-blue-500 text-center py-8">
                  Loading order details to calculate top products...
                </RText>
              ) : topProducts.length === 0 ? (
                <RText className="text-gray-500 text-center py-8">
                  No products data available for this month
                  <br />
                  <span className="text-xs">
                    ({currentMonthOrders.length} orders found,{" "}
                    {orderDetails.length} details fetched)
                  </span>
                </RText>
              ) : (
                map(topProducts, (product) => (
                  <Anchor
                    key={product.id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50"
                  >
                    <Block className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {product.name.charAt(0)}
                      </span>
                    </Block>
                    <Block className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Quantity sold: {product.quantity} items
                      </p>
                    </Block>
                    <Block className="text-right">
                      <p className="text-sm font-medium">
                        {formatCurrency(product.revenue)}
                      </p>
                      <p className="text-xs text-blue-500">
                        #{product.quantity} sold
                      </p>
                    </Block>
                  </Anchor>
                ))
              )}
            </Section>
          )}

          {activeTab === "customers" && (
            <Section className="space-y-3">
              {topCustomers.length === 0 ? (
                <RText className="text-gray-500 text-center py-8">
                  No customers data available for this month
                </RText>
              ) : (
                map(topCustomers, (customer) => (
                  <Anchor
                    key={customer.id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50"
                  >
                    <Block className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {customer.name.charAt(0)}
                      </span>
                    </Block>
                    <Block className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {customer.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {customer.email}
                      </p>
                    </Block>
                    <Block className="text-right">
                      <p className="text-sm font-medium">
                        {formatCurrency(customer.totalSpent)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {customer.totalOrders} orders
                      </p>
                    </Block>
                  </Anchor>
                ))
              )}
            </Section>
          )}
        </Area>
      </Container>

      <Container className="bg-white rounded-lg shadow-sm border">
        <Area className="p-6 border-b">
          <RText className="text-lg font-semibold">Product Categories</RText>
        </Area>
        <Area className="p-6">
          {categoryData.length === 0 ? (
            <RText className="text-gray-500 text-center py-8">
              No categories data available
            </RText>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {map(categoryData, (entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Yard className="space-y-2 mt-4">
                {map(categoryData, (category, index) => (
                  <Section
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <Anchor className="flex items-center space-x-2">
                      <Block
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </Anchor>
                    <span className="text-gray-500">{category.percentage}</span>
                  </Section>
                ))}
              </Yard>
            </>
          )}
        </Area>
      </Container>
    </Core>
  );
}
