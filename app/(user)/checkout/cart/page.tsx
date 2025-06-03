"use client";

import CartSummary from "@/components/CartPage/CartSummary";
import { CartTable } from "@/components/CartPage/CartTable";
import { mockCartItems } from "@/components/CartPage/seg/useCart";
import Button from "@/components/CustomButton";
import { Core, Row, RText, Section } from "@/lib/by/Div";
import Link from "next/link";

export default function CartPage() {
  const items = mockCartItems;

  return (
    <Core className="p-4 md:p-8 min-h-screen ">
      <Row className="max-w-7xl w-full px-8 py-4">
        <h2 className="text-3xl tracking-wide font-bold ml-4 text-left">
          Shopping Cart
        </h2>
      </Row>
      <Section className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <CartTable items={items.cart_items} />
        <CartSummary
          subtotal={12000}
          total={12000}
          actionButton={
            <Link href='/checkout'>
            <Button
              label={
                <RText className="text-base whitespace-nowrap">
                  Proceed to Checkout
                </RText>
              }
              className="flex-1 h-12 w-full flex bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg items-center justify-center text-sm"
            />
            </Link>
          }
        />
      </Section>
    </Core>
  );
}
