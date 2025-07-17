"use client";
import { Area, Group, RText, Section, Wrap } from "@/lib/by/Div";
import React from "react";
import Image from "next/image";
import FloatingGameButton from "@/components/floating_game_button";
import { useGetProductsQuery } from "@/process/api/api";
import { useAutoRefetch } from "@/components/ProductsPage/seg/utils";
import ListProductDisplay from "@/components/ListProductDisplay";

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
    <Area className="bg-slate-50">
      {/* Hero Section - Elevated Design */}
      <Section className="relative h-screen overflow-hidden">
        <Wrap className="absolute inset-0 bg-[url('/images/backgroundBanner.png')] bg-cover bg-center bg-no-repeat"></Wrap>
        <Wrap className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></Wrap>
        
        {/* Floating geometric elements */}
        <Wrap className="absolute top-20 left-20 w-32 h-32 bg-rose-200/30 rounded-full blur-xl"></Wrap>
        <Wrap className="absolute bottom-40 right-32 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl"></Wrap>
        <Wrap className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg"></Wrap>
        
        <Section className="relative z-10 h-full flex items-center justify-center">
          <Group className="text-center max-w-4xl px-8">
            <Wrap className="relative mb-6">
              <Wrap className="absolute inset-0 bg-black/30 blur-md rounded-lg"></Wrap>
              <RText className="relative text-7xl md:text-8xl lg:text-9xl font-thin text-white tracking-wider drop-shadow-2xl">
                COSME<span className="font-light text-rose-200">PLAY</span>
              </RText>
            </Wrap>
            <Group className="w-24 h-px bg-rose-300 mx-auto mb-8 shadow-lg"></Group>
            <Wrap className="relative mb-8">
              <Wrap className="absolute inset-0 bg-black/25 blur-sm rounded-lg"></Wrap>
              <RText className="relative text-xl md:text-2xl text-white font-light leading-relaxed max-w-3xl mx-auto drop-shadow-xl">
                Where luxury meets nature. Experience the art of skincare through scientifically crafted formulas that reveal your skin's natural radiance.
              </RText>
            </Wrap>
            <Wrap className="relative">
              <Wrap className="absolute inset-0 bg-black/20 blur-sm rounded-lg"></Wrap>
              <RText className="relative text-lg text-rose-200 font-light italic drop-shadow-lg">
                — Your Journey to Timeless Beauty —
              </RText>
            </Wrap>
          </Group>
        </Section>
        
        {/* Scroll indicator */}
        <Wrap className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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
                  <span className="block text-rose-600 font-normal">Collection</span>
                </RText>
                <Group className="w-16 h-px bg-rose-400"></Group>
              </Group>
              <RText className="text-lg text-slate-600 leading-relaxed">
                Discover our most coveted skincare essentials, now available at exceptional prices. Each product is meticulously formulated with premium ingredients to deliver transformative results.
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
                  <span className="block text-rose-600 font-normal">Redefined</span>
                </RText>
                <Group className="w-16 h-px bg-rose-400"></Group>
              </Group>
              
              <RText className="text-lg text-slate-600 leading-relaxed">
                Our approach transcends traditional skincare. We combine cutting-edge science with time-honored botanical wisdom to create products that don't just treat your skin—they transform it.
              </RText>
              
              <Group className="space-y-4">
                <Group className="flex items-center space-x-4">
                  <Wrap className="w-2 h-2 bg-rose-500 rounded-full"></Wrap>
                  <RText className="text-slate-700">Clinically proven ingredients</RText>
                </Group>
                <Group className="flex items-center space-x-4">
                  <Wrap className="w-2 h-2 bg-rose-500 rounded-full"></Wrap>
                  <RText className="text-slate-700">Sustainable luxury formulations</RText>
                </Group>
                <Group className="flex items-center space-x-4">
                  <Wrap className="w-2 h-2 bg-rose-500 rounded-full"></Wrap>
                  <RText className="text-slate-700">Personalized skincare solutions</RText>
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
              Handpicked essentials that represent the pinnacle of luxury skincare innovation
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
                Sourced from the finest botanical gardens worldwide, ensuring purity and potency in every formula.
              </RText>
            </Group>
            
            <Group className="text-center space-y-4">
              <Wrap className="w-16 h-16 bg-rose-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                <Wrap className="w-8 h-8 bg-rose-400 rounded-full"></Wrap>
              </Wrap>
              <RText className="text-xl font-light">Scientific Innovation</RText>
              <RText className="text-slate-400 leading-relaxed">
                Advanced research and development creating breakthrough formulations for visible results.
              </RText>
            </Group>
            
            <Group className="text-center space-y-4">
              <Wrap className="w-16 h-16 bg-rose-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                <Wrap className="w-8 h-8 bg-rose-400 rounded-full"></Wrap>
              </Wrap>
              <RText className="text-xl font-light">Sustainable Beauty</RText>
              <RText className="text-slate-400 leading-relaxed">
                Committed to environmental responsibility without compromising on luxury or effectiveness.
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