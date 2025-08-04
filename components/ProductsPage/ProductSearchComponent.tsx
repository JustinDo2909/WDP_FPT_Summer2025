"use client";
import { Group, RText, Section } from "@/lib/by/Div";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { map } from "lodash";
import { useState } from "react";

interface ProductsSearchComponentProps {
  searchParams: ProductQueryParams;
  onChangeParams: (newParams: Partial<ProductQueryParams>) => void;
  productMetas: IProductMeta;
  isLoading: boolean;
}

export const ProductsSearchComponent = ({
  searchParams,
  onChangeParams,
  isLoading,
  productMetas,
}: ProductsSearchComponentProps) => {
  const params = useSearchParams();
  const query = params.get("title") ?? "";
  const [querry, setQuerry] = useState(query);

  const handleClearAll = () => {
    onChangeParams({
      title: "",
      category: "",
      brand: "",
      skinType: "",
      sort: "",
    });
    setQuerry("");
  };

  const handleRemoveFilter = (filter: keyof ProductQueryParams) => {
    onChangeParams({ [filter]: "" });
  };

  return (
    <Section className="flex flex-col gap-4 px-4 sm:px-6">
      {/* Search Section */}
      <Group className="flex flex-col items-center w-full gap-4">
        <Group className="relative w-full max-w-3xl">
          <input
            id="search"
            placeholder="What are you looking for today?..."
            className="w-full px-6 py-3 text-base rounded-full border-2 border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 pr-14"
            value={querry}
            onChange={(e) => setQuerry(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && onChangeParams({ title: querry })
            }
          />
          <button
            aria-label="Search"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-pink-500 rounded-full hover:bg-pink-600 
                       border-2 border-pink-500 hover:border-pink-600
                       transition-transform duration-200 focus:ring-2 focus:ring-pink-300
                       disabled:opacity-50 shadow-md"
            onClick={() => onChangeParams({ title: querry })}
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

        {query && (
          <RText className="text-sm text-pink-600 dark:text-gray-300">
            Showing results for &quot;{query}&quot;
          </RText>
        )}
      </Group>

      {/* Active Filters */}
      <Group className="flex justify-center flex-wrap gap-2">
        {searchParams.title && (
          <FilterTag
            label={searchParams.title}
            onRemove={() => handleRemoveFilter("title")}
          />
        )}
        {searchParams.category && (
          <FilterTag
            label={searchParams.category}
            onRemove={() => handleRemoveFilter("category")}
          />
        )}
        {searchParams.brand && (
          <FilterTag
            label={searchParams.brand}
            onRemove={() => handleRemoveFilter("brand")}
          />
        )}
        {searchParams.skinType && (
          <FilterTag
            label={searchParams.skinType}
            onRemove={() => handleRemoveFilter("skinType")}
          />
        )}
        {searchParams.sort && (
          <FilterTag
            label={`Sorted: ${searchParams.sort}`}
            onRemove={() => handleRemoveFilter("sort")}
          />
        )}
        <Group className="py-1 text-sm"> </Group>
      </Group>

      {/* Filters and Sort */}
      <Group className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <Group className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <Select
            value={searchParams.category ?? "all"}
            onValueChange={(value) =>
              onChangeParams({ category: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-full sm:w-[180px] rounded-full flex items-center gap-2 border-2 border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100">
              <img
                src="/images/category.png"
                alt="Category Icon"
                className="w-8 h-8"
              />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {map(productMetas.categories, (category) => (
                <SelectItem key={category.title} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand Filter */}
          <Select
            value={searchParams.brand ?? "all"}
            onValueChange={(value) =>
              onChangeParams({ brand: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-full sm:w-[160px] rounded-full flex items-center gap-2 border-2 border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100">
              <img
                src="/images/brand.png"
                alt="Brand Icon"
                className="w-8 h-8"
              />
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              {map(productMetas.brands, (brand) => (
                <SelectItem key={brand.title} value={brand.title}>
                  {brand.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Skin Type Filter */}
          <Select
            value={searchParams.skinType ?? "all"}
            onValueChange={(value) =>
              onChangeParams({ skinType: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-full sm:w-auto rounded-full flex items-center gap-2 border-2 border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100">
              <img
                src="/images/skintype.png"
                alt="Skin Type Icon"
                className="w-7 h-7"
              />
              <SelectValue placeholder="All Skin Types" />
            </SelectTrigger>
            <SelectContent>
              {map(productMetas.skinTypes, (skintype) => (
                <SelectItem key={skintype.id} value={skintype.title}>
                  {skintype.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear All Button */}
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-sm flex items-center rounded-full bg-gray-100 dark:bg-gray-700 
                       text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-600 
                       transition-colors shadow-sm"
          >
            <X size={16} className="mr-1" /> Clear
          </button>
        </Group>

        {/* Sort */}
        <Group className="flex gap-2 items-center">
          <RText className="text-gray-900 dark:text-gray-100 text-sm">
            Sort by price:
          </RText>
          <button
            className={`px-4 py-2 text-sm rounded-full ${searchParams.sort === "lowToHigh" ? "bg-pink-500 text-white" : "bg-gray-100 dark:bg-gray-700"}`}
            onClick={() => onChangeParams({ sort: "lowToHigh" })}
          >
            Low to High
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-full ${searchParams.sort === "highToLow" ? "bg-pink-500 text-white" : "bg-gray-100 dark:bg-gray-700"}`}
            onClick={() => onChangeParams({ sort: "highToLow" })}
          >
            High to Low
          </button>
        </Group>
      </Group>
    </Section>
  );
};

// Filter Tag Component
const FilterTag = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <span className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full">
    {label}
    <button onClick={onRemove} className="hover:text-pink-900">
      <X size={12} />
    </button>
  </span>
);
