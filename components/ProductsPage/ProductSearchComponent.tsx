'use client'
import { Group, RText, Section } from "@/lib/by/Div";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsSearchComponentProps {
  searchParams: ProductQueryParams;
  onChangeParams: (newParams: Partial<ProductQueryParams>) => void;
  onSearch: () => void;
  isLoading: boolean
}

import { useSearchParams } from 'next/navigation';
import { map } from 'lodash';
import { BRANDS, CATEGORIES } from "./seg/utils";


export const ProductsSearchComponent = ({
  searchParams,
  onChangeParams,
  onSearch,
  isLoading
}: ProductsSearchComponentProps) => {
  const params = useSearchParams();
  const query = params.get('query') ?? '';

  return (
    <Section className="flex flex-col gap-6 px-4 sm:px-6">
      {/* Search Section */}
      <Group className="flex flex-col items-center w-full gap-4">
        {/* Show heading only if no search query */}

        <Group className="relative w-full max-w-3xl">
          <label htmlFor="search" className="sr-only">
            What are you looking for today?
          </label>
          <input
            id="search"
            placeholder="What are you looking for today?..."
            aria-label="Search for cleansers, supplements, treatments, etc."
            className="w-full px-6 py-3 text-base rounded-full border-2 border-pink-300 
                       focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       placeholder-pink-500 dark:placeholder-pink-400 pr-14
                       transition-shadow duration-200 hover:shadow-lg"
            value={searchParams.query}
            onChange={(e) => onChangeParams({ query: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
          <button
            aria-label="Search"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-pink-500 hover:bg-pink-600 
                       border-2 border-pink-500 hover:border-pink-600 rounded-full
                       transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-pink-300
                       disabled:opacity-50 shadow-md"
            onClick={onSearch}
          >
            {isLoading ? (
              <svg
                className="w-6 h-6 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              <Search className="w-6 h-6 text-white" />
            )}
          </button>
        </Group>

        {/* Show results text after search */}
        {query &&
          <RText className="text-sm text-pink-600 dark:text-gray-300">
            Showing results for &quot;{query}&quot;
          </RText>
        }
      </Group>

      {/* Filter and Sort Bar */}
      <Group className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <Group className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <Select 
            value={searchParams.category ?? 'all'} 
            onValueChange={(value) => onChangeParams({ category: value === 'all' ? undefined : value,})}
          >
            <SelectTrigger
              aria-label="Select product category"
              className="w-full sm:w-[160px] rounded-full border-gray-300 dark:border-gray-600 
                         shadow-sm text-sm focus:ring-pink-200 dark:focus:ring-pink-300
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {map(CATEGORIES,(category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand Filter */}
          <Select 
            value={searchParams.brand ?? 'all'} 
            onValueChange={(value) => onChangeParams({ brand: value === 'all' ? undefined : value,})}
          >
            <SelectTrigger
              aria-label="Select brand"
              className="w-full sm:w-[160px] rounded-full border-gray-300 dark:border-gray-600 
                         shadow-sm text-sm focus:ring-pink-200 dark:focus:ring-pink-300
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              {map(BRANDS,(brand) => (
                <SelectItem key={brand.value} value={brand.value}>
                  {brand.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          <button
            aria-label="Clear all filters"
            className="px-4 py-2 text-sm flex items-center rounded-full bg-gray-100 dark:bg-gray-700 
                       text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-600 
                       transition-colors shadow-sm"
          >
            <X size={16} className="mr-1"/> Clear 
          </button>
        </Group>

        {/* Sort Buttons */}
        <Group className="flex gap-2 items-center">
          <RText className="text-gray-900 dark:text-gray-100 text-sm">Sort by price:</RText>
          <button
            className={`px-4 py-2 text-sm rounded-full transition-colors shadow-sm
                       ${
                         searchParams.sort === "lowToHigh"
                           ? "bg-pink-500 text-white"
                           : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-600"
                       }`}
            onClick={() => onChangeParams({ sort: "lowToHigh" })}
          >
            Low to High
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-full transition-colors shadow-sm
                       ${
                         searchParams.sort === "highToLow"
                           ? "bg-pink-500 text-white"
                           : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-600"
                       }`}
            onClick={() => onChangeParams({ sort: "highToLow" })}
          >
            High to Low
          </button>
        </Group>
      </Group>
    </Section>
  );
}