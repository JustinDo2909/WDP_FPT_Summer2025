"use client";

import {
  LayoutDashboard,
  Package,
  Grid3X3,
  ShoppingCart,
  Users,
  Ticket,
  MessageSquare,
  Warehouse,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
import { menuItems } from "@/constants/dashboard/index";
import map from "lodash/map";
import { Area, Anchor, Section, RText, Yard } from "@/lib/by/Div";

const iconMap = {
  LayoutDashboard,
  Package,
  Grid3X3,
  ShoppingCart,
  Users,
  Ticket,
  MessageSquare,
  Warehouse,
};

export function Sidebar() {
  return (
    <Area className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <Yard className="border-b px-6 py-4">
        <Section className="flex items-center space-x-2">
          <Anchor className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-white" />
          </Anchor>
          <Anchor>
            <RText className="text-lg font-semibold">BeautyAdmin</RText>
            <RText className="text-xs text-gray-500">Cosmetics Dashboard</RText>
          </Anchor>
        </Section>
      </Yard>

      <Yard className="flex-1 py-4">
        <Section className="px-3">
          <RText className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Menu
          </RText>
          <nav className="space-y-1">
            {map(menuItems, (item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              return (
                <a
                  key={item.title}
                  href={item.url}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    item.active
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-3" />
                  {item.title}
                </a>
              );
            })}
          </nav>
        </Section>
      </Yard>

      <Area className="border-t p-4">
        <Section className="flex items-center space-x-2 mb-2">
          <Anchor className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium">AD</span>
          </Anchor>
          <Anchor className="flex-1 min-w-0">
            <RText className="text-sm font-medium truncate">Admin User</RText>
            <RText className="text-xs text-gray-500 truncate">
              admin@beauty.com
            </RText>
          </Anchor>
        </Section>
        <Section className="flex space-x-1">
          <button className="flex-1 p-2 text-gray-400 hover:text-gray-600 rounded">
            <Settings className="h-4 w-4" />
          </button>
          <button className="flex-1 p-2 text-gray-400 hover:text-gray-600 rounded">
            <LogOut className="h-4 w-4" />
          </button>
        </Section>
      </Area>
    </Area>
  );
}
