"use client";
import { Area, Group, RText, Section, Wrap } from "@/lib/by/Div";
import React from "react";
import Image from "next/image";
import FloatingGameButton from "@/components/floating_game_button";
import { useGetProductsQuery } from "@/process/api/api";
import { useAutoRefetch } from "@/components/ProductsPage/seg/utils";
import ListProductDisplay from "@/components/ListProductDisplay";
import { Gamepad2, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const productDisplaySearchParams = {
    category: "",
    brand: "",
    sort: "highToLow",
    skinType: "",
    page: 1,
    pageSize: 6,
    title: "",
    sale: "true",
  };
  const bestCateSearchParams = {
    category: "",
    brand: "",
    sort: "lowToHigh",
    skinType: "",
    page: 1,
    pageSize: 5,
    title: "",
    sale: "",
  };

  const shouldFetch = true;
  const {
    data: productsDisplay,
    isLoading: isLoadingProducts,
    refetch: refetchProducts,
  } = useGetProductsQuery(productDisplaySearchParams);

  const {
    data: featuredProducts,
    isLoading: isLoadingFeatured,
    refetch: refetchFeatured,
  } = useGetProductsQuery(bestCateSearchParams);

  useAutoRefetch(productDisplaySearchParams, refetchProducts, shouldFetch, [
    "title",
  ]);
  useAutoRefetch(bestCateSearchParams, refetchFeatured, shouldFetch, ["title"]);

  return (
    <Area
      className="bg-slate-50
    "
    >
      {/* Hero Section - Fresh Skin Design */}
      <Section className="relative h-[91vh]  overflow-hidden bg-white">
        {/* Background Image */}
        <Wrap className="absolute inset-0 w-full h-full p-4 pt-0">
          <Wrap className="w-full relative h-full inset-0 bg-[url('/images/backgroundBanner.png')] bg-cover bg-center bg-no-repeat rounded-3xl">
            <Wrap className="absolute inset-0 bg-black/30 rounded-3xl" />
          </Wrap>
        </Wrap>

        {/* Dark Overlay */}

        {/* Hero Content */}
        <Section className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Top Banner */}
          <Wrap className="mt-10  text-white text-sm uppercase tracking-widest font-semibold">
            NOTHING BEATS A JET2 HOLIDAY, AND RIGHT NOW YOU CAN SAVE UP TO 50
            POUNDS. THAT&apos;S 200 POUNDS OFF FOR A FAMILY OF FOUR
          </Wrap>
          {/* Headline */};
          <Wrap className="flex items-center mb-48 justify-center h-full px-6 md:px-12">
            {/* Centered Content Container */}
            <Wrap className="w-full max-w-5xl text-left">
              {/* Top Line */}
              <Wrap className="mb-4 text-white text-2xl md:text-3xl font-raleway">
                Your <span className="italic text-lime-900">one stop shop</span>{" "}
                for
              </Wrap>

              {/* Headline */}
              <Wrap className="mb-2">
                <RText className="font-modak text-white text-6xl md:text-8xl lg:text-[140px] drop-shadow-xl leading-none">
                  FRESH SKIN
                </RText>
              </Wrap>

              {/* Call-to-Actions */}
              <Wrap className="flex justify-center flex-wrap items-center gap-4">
                {/* Button 1 */}
                <Link className="cursor-pointer" href={"/products"}>
                  <Wrap className="flex items-center gap-3 px-2 pr-6 py-2 bg-rose-400 text-white rounded-full font-semibold shadow-lg hover:bg-rose-500 transition">
                    <Wrap className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-rose-400" />
                    </Wrap>
                    <RText className="text-lg">Come shop with us</RText>
                  </Wrap>
                </Link>

                {/* "and" in Modak */}
                <RText className="font-modak text-white text-[40px] tracking-wide">
                  and
                </RText>

                {/* Button 2 */}
                <Link className="cursor-pointer" href={"/event"}>
                  <Wrap className="flex pr-6 items-center gap-3 px-2 py-2 bg-rose-400 text-white rounded-full font-semibold shadow-lg hover:bg-rose-500 transition">
                    <Wrap className="w-10 h-10 flex-shrink-0 rounded-full bg-white flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-rose-400" />
                    </Wrap>
                    <RText className="text-lg text-center w-full ">
                      Play games to earn vouchers
                    </RText>
                  </Wrap>
                </Link>
              </Wrap>
            </Wrap>
          </Wrap>
          {/* Footer Tagline */}
          <Wrap className="absolute bottom-6 text-white text-xs tracking-wide flex items-center justify-center gap-2">
            <span className="font-medium">COSMEPLAY</span>
            <span className="opacity-70">est. 2025</span>
          </Wrap>
        </Section>

        {/* Scroll Indicator */}
        <Wrap className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Wrap className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
            <Wrap className="w-1 h-3 bg-white/90 rounded-full mt-2"></Wrap>
          </Wrap>
        </Wrap>
      </Section>

      {/* Premium Sale Section */}
      <Section className="py-20 bg-white">
        <Group className="max-w-7xl mx-auto px-6">
          <Group className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <Group className="space-y-8">
              <Group className="space-y-4">
                <RText className="text-sm uppercase tracking-[0.3em] text-rose-500 font-medium">
                  LIMITED TIME OFFER
                </RText>
                <RText className="text-5xl md:text-6xl font-light text-slate-900 leading-tight">
                  Exclusive
                  <span className="block text-rose-600 font-normal">
                    Collection
                  </span>
                </RText>
                <Group className="w-16 h-px bg-rose-400"></Group>
              </Group>
              <RText className="text-lg text-slate-600 leading-relaxed">
                Discover our most coveted skincare essentials, now available at
                exceptional prices. Each product is meticulously formulated with
                premium ingredients to deliver transformative results.
              </RText>
              <Group className="pt-4">
                <button className="group relative px-8 py-4 bg-slate-900 text-white font-medium tracking-wide overflow-hidden transition-all duration-300 hover:bg-slate-800">
                  <span className="relative z-10">EXPLORE COLLECTION</span>
                  <Wrap className="absolute inset-0 bg-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></Wrap>
                </button>
              </Group>
            </Group>

            <Group className="grid col-span-2 grid-cols-1 md:grid-cols-3 gap-6">
              {isLoadingProducts && (
                <Group className="col-span-full flex justify-center items-center py-16">
                  <Wrap className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></Wrap>
                </Group>
              )}
              {productsDisplay?.products?.length > 0 ? (
                <ListProductDisplay products={productsDisplay.products} />
              ) : (
                !isLoadingProducts && (
                  <RText className="col-span-full text-center text-slate-500 py-16">
                    No products available at the moment.
                  </RText>
                )
              )}
            </Group>
          </Group>
        </Group>
      </Section>

      {/* Face Care Philosophy Section */}
      <Section className="py-24 bg-slate-100">
        <Group className="max-w-6xl mx-auto px-6">
          <Group className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Group className="order-2 lg:order-1">
              <Group className="relative">
                <Image
                  src="/images/faceCare.png"
                  alt="Premium Face Care"
                  width={500}
                  height={400}
                  className="rounded-none shadow-2xl"
                />
                <Wrap className="absolute -top-6 -right-6 w-full h-full border-2 border-rose-300 rounded-none -z-10"></Wrap>
              </Group>
            </Group>

            <Group className="order-1 lg:order-2 space-y-8">
              <Group className="space-y-4">
                <RText className="text-sm uppercase tracking-[0.3em] text-rose-500 font-medium">
                  OUR PHILOSOPHY
                </RText>
                <RText className="text-5xl md:text-6xl font-light text-slate-900 leading-tight">
                  Face Care
                  <span className="block text-rose-600 font-normal">
                    Redefined
                  </span>
                </RText>
                <Group className="w-16 h-px bg-rose-400"></Group>
              </Group>

              <RText className="text-lg text-slate-600 leading-relaxed">
                Our approach transcends traditional skincare. We combine
                cutting-edge science with time-honored botanical wisdom to
                create products that don't just treat your skin—they transform
                it.
              </RText>

              <Group className="space-y-4">
                <Group className="flex items-center space-x-4">
                  <Wrap className="w-2 h-2 bg-rose-500 rounded-full"></Wrap>
                  <RText className="text-slate-700">
                    Clinically proven ingredients
                  </RText>
                </Group>
                <Group className="flex items-center space-x-4">
                  <Wrap className="w-2 h-2 bg-rose-500 rounded-full"></Wrap>
                  <RText className="text-slate-700">
                    Sustainable luxury formulations
                  </RText>
                </Group>
                <Group className="flex items-center space-x-4">
                  <Wrap className="w-2 h-2 bg-rose-500 rounded-full"></Wrap>
                  <RText className="text-slate-700">
                    Personalized skincare solutions
                  </RText>
                </Group>
              </Group>
            </Group>
          </Group>
        </Group>
      </Section>

      {/* Featured Products - Gallery Style */}
      <Section className="py-24 bg-white">
        <Group className="max-w-7xl mx-auto px-6">
          <Group className="text-center mb-16">
            <RText className="text-sm uppercase tracking-[0.3em] text-rose-500 font-medium mb-4">
              CURATED SELECTION
            </RText>
            <RText className="text-5xl md:text-6xl font-light text-slate-900 mb-6">
              Featured Products
            </RText>
            <RText className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Handpicked essentials that represent the pinnacle of luxury
              skincare innovation
            </RText>
            <Group className="w-20 h-px bg-rose-400 mx-auto mt-8"></Group>
          </Group>

          <Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {isLoadingFeatured ? (
              <Group className="col-span-full flex justify-center items-center py-16">
                <Wrap className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></Wrap>
              </Group>
            ) : featuredProducts?.products?.length > 0 ? (
              <ListProductDisplay products={featuredProducts.products} />
            ) : (
              <RText className="col-span-full text-center text-slate-500 py-16">
                Featured products coming soon.
              </RText>
            )}
          </Group>
        </Group>
      </Section>

      {/* Brand Values Section */}
      <Section className="py-24 bg-slate-900 text-white">
        <Group className="max-w-6xl mx-auto px-6">
          <Group className="text-center mb-16">
            <RText className="text-sm uppercase tracking-[0.3em] text-rose-400 font-medium mb-4">
              OUR COMMITMENT
            </RText>
            <RText className="text-4xl md:text-5xl font-light mb-6">
              Luxury with Purpose
            </RText>
            <Group className="w-20 h-px bg-rose-400 mx-auto"></Group>
          </Group>

          <Group className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Group className="text-center space-y-4">
              <Wrap className="w-16 h-16 bg-rose-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                <Wrap className="w-8 h-8 bg-rose-400 rounded-full"></Wrap>
              </Wrap>
              <RText className="text-xl font-light">Natural Ingredients</RText>
              <RText className="text-slate-400 leading-relaxed">
                Sourced from the finest botanical gardens worldwide, ensuring
                purity and potency in every formula.
              </RText>
            </Group>

            <Group className="text-center space-y-4">
              <Wrap className="w-16 h-16 bg-rose-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                <Wrap className="w-8 h-8 bg-rose-400 rounded-full"></Wrap>
              </Wrap>
              <RText className="text-xl font-light">
                Scientific Innovation
              </RText>
              <RText className="text-slate-400 leading-relaxed">
                Advanced research and development creating breakthrough
                formulations for visible results.
              </RText>
            </Group>

            <Group className="text-center space-y-4">
              <Wrap className="w-16 h-16 bg-rose-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                <Wrap className="w-8 h-8 bg-rose-400 rounded-full"></Wrap>
              </Wrap>
              <RText className="text-xl font-light">Sustainable Beauty</RText>
              <RText className="text-slate-400 leading-relaxed">
                Committed to environmental responsibility without compromising
                on luxury or effectiveness.
              </RText>
            </Group>
          </Group>
        </Group>
      </Section>

      {/* Newsletter Section */}
      <Section className="py-16 bg-rose-50">
        <Group className="max-w-4xl mx-auto px-6 text-center">
          <RText className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Stay Connected
          </RText>
          <RText className="text-lg text-slate-600 mb-8">
            Be the first to discover new arrivals and exclusive offers
          </RText>
          <Group className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-slate-300 focus:outline-none focus:border-rose-500 bg-white"
            />
            <button className="px-8 py-4 bg-slate-900 text-white font-medium tracking-wide hover:bg-slate-800 transition-colors">
              SUBSCRIBE
            </button>
          </Group>
        </Group>
      </Section>

      <FloatingGameButton />
    </Area>
  );
}
