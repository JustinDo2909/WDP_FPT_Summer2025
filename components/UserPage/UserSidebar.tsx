'use client'

import React from "react";
import { User, ClipboardList, Ticket, Star } from "lucide-react";
import Link from "next/link";
import { Begin, Box, Column, RText, Wrap } from "@/lib/by/Div";
import { useUser } from "@/hooks/useUser";

const menuItems = [
    { label: "Profile", icon: <User size={18} />, href: "/user" },
    { label: "Orders", icon: <ClipboardList size={18} />, href: "/user/orders" },
    { label: "Vouchers", icon: <Ticket size={18} />, href: "/user/vouchers" },
    { label: "Favorites", icon: <Star size={18} />, href: "/user/favorites" },
];

export default function UserSidebar() {
    const {user} = useUser()

    return (
        <aside className="w-64  border-r min-h-screen p-6">
            <Box className="flex items-center space-x-3 mb-8">
                <Wrap className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center relative">
                <RText className="font-semibold text-center">{user.name[0]}</RText>
                </Wrap>

                <Wrap>
                    <RText  className="font-semibold">{user?.name}</RText>
                    <button className="text-xs text-blue-500">Edit Profile</button>
                </Wrap>
            </Box>
            <Column className="">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        <RText>{item.icon}</RText>
                        <RText className="text-sm font-semibold">{item.label}</RText>
                    </Link>
                ))}
            </Column>
        </aside>
    );
}
