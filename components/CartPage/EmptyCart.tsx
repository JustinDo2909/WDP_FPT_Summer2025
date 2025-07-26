import React from "react";
import { Section, Box } from "@/lib/by/Div";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <Section className="flex col-span-4 flex-col items-center justify-center py-16 px-4 text-center">
      <Box className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-muted-foreground" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <ShoppingCart/>
        </svg>
      </Box>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Your cart is empty
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Link href="/products" className="text-pink-500 hover:underline font-medium">
        Continue shopping
      </Link>
    </Section>
  );
}
