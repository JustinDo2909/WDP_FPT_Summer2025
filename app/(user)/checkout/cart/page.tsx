"use client";

import CartSummary from "@/components/CartPage/CartSummary";
import { CartTable } from "@/components/CartPage/CartTable";
import Button from "@/components/CustomButton";
import { Core, Row, RText, Section } from "@/lib/by/Div";
import Link from "next/link";
import { get, sortBy } from "lodash";
import {
  calculateCartTotal,
  calculateCartTotalOriginalPrice,
} from "../seg/calculateSubtotal";
import Breadcrumbs from "@/components/Breadcrumbs";
import EmptyCart from "@/components/CartPage/EmptyCart";
import { useGetCartQuery } from "@/process/api/apiCart";

export default function CartPage() {
  const { data: cartData, isLoading } = useGetCartQuery();
  const cart = cartData?.cart;
  const sortedCartItems = sortBy(get(cart, "cartItems", []), (item) =>
    new Date(item.createdAt).getTime(),
  );

  const total = calculateCartTotal(sortedCartItems);
  const subtotal = calculateCartTotalOriginalPrice(sortedCartItems);

  return (
    <Core className="p-4 md:p-8 min-h-screen ">
      <Row className="max-w-7xl w-full px-8 py-4">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
        />
        <h2 className="text-3xl tracking-wide font-bold ml-4 text-left">
          Shopping Cart
        </h2>
      </Row>
      <Section className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-10 ">
        {!isLoading && cart.cartItems.length !== 0 ? (
          <>
            <CartTable items={sortedCartItems} />
            <CartSummary
              total={total}
              subtotal={subtotal}
              voucherDiscount={0}
              actionButton={
                <Link href="/checkout">
                  <Button
                    disabled={sortedCartItems.length === 0}
                    label={
                      <RText className="text-base font-raleway whitespace-nowrap">
                        Proceed to Checkout
                      </RText>
                    }
                    className="flex-1 h-12 w-full flex bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg items-center justify-center text-sm"
                  />
                </Link>
              }
            />
          </>
        ) : isLoading ? (
          <p className="col-span-full text-center">Loading your cart...</p>
        ) : (
          <EmptyCart />
        )}
      </Section>
    </Core>
  );
}
