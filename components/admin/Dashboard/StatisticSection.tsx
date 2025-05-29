"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  formatCurrency,
  getTopProductsData,
  getTopCustomersData,
  getCategoryDistribution,
} from "@/app/(admin)/dashboard/seg/utils";
import map from "lodash/map";
import { StatisticsSectionProps } from "@/types/dashboard/index";
import {
  Area,
  Yard,
  Section,
  Anchor,
  Box,
  Column,
  Row,
  Card,
  Block,
  RText,
} from "@/lib/by/Div/index";

export function StatisticsSection({
  activeTab,
  setActiveTab,
}: StatisticsSectionProps) {
  const topProducts = getTopProductsData();
  const topCustomers = getTopCustomersData();
  const categoryData = getCategoryDistribution();

  return (
    <Area className="grid gap-4 lg:grid-cols-3">
      <Yard className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
        <Section className="p-6 border-b">
          <RText className="text-lg font-semibold">Statistics this month</RText>
        </Section>
        <Section className="p-6">
          <Anchor className="flex space-x-1 mb-4">
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
          </Anchor>

          {activeTab === "products" && (
            <Block className="space-y-3">
              {map(topProducts, (product) => (
                <Box
                  key={product.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50"
                >
                  <Column className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {product.name.charAt(0)}
                    </span>
                  </Column>
                  <Column className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <Row className="flex items-center text-xs">
                      {product.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span
                        className={
                          product.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {product.change}%
                      </span>
                      <RText className="text-gray-500 ml-1">
                        vs last month
                      </RText>
                    </Row>
                  </Column>
                  <Column className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(product.revenue)}
                    </p>
                  </Column>
                </Box>
              ))}
            </Block>
          )}

          {activeTab === "customers" && (
            <Block className="space-y-3">
              {map(topCustomers, (customer) => (
                <Box
                  key={customer.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50"
                >
                  <Column className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {customer.name.charAt(0)}
                    </span>
                  </Column>
                  <Column className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {customer.email}
                    </p>
                  </Column>
                  <Column className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(customer.spent)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {customer.orders} orders
                    </p>
                  </Column>
                </Box>
              ))}
            </Block>
          )}
        </Section>
      </Yard>

      <Yard className="bg-white rounded-lg shadow-sm border">
        <Section className="p-6 border-b">
          <RText className="text-lg font-semibold">Product Categories</RText>
        </Section>
        <Section className="p-6">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {map(categoryData, (entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Anchor className="space-y-2 mt-4">
            {map(categoryData, (category, index) => (
              <Card
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <Box className="flex items-center space-x-2">
                  <Column
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </Box>
                <span className="text-gray-500">{category.percentage}</span>
              </Card>
            ))}
          </Anchor>
        </Section>
      </Yard>
    </Area>
  );
}
