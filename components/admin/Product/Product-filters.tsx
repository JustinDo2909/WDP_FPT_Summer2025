"use client";

import { X, Filter } from "lucide-react";
import { Area, RText, Group } from "@/lib/by/Div";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProductMetaQuery } from "@/process/api/api";

interface ProductFiltersProps {
  searchParams: {
    category: string;
    brand: string;
    skinType: string;
  };
  onUpdateParams: (field: string, value: string) => void;
}

export function ProductFilters({
  searchParams,
  onUpdateParams,
}: ProductFiltersProps) {
  const { data: productMeta } = useGetProductMetaQuery();

  const handleClearAll = () => {
    onUpdateParams("category", "");
    onUpdateParams("brand", "");
    onUpdateParams("skinType", "");
  };

  const hasActiveFilters =
    searchParams.category || searchParams.brand || searchParams.skinType;

  return (
    <Area className="bg-white border-b border-gray-200 p-4 space-y-4">
      {/* Filter Dropdowns */}
      <Group className="flex flex-wrap items-center gap-4">
        <Group className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <RText className="text-sm font-medium text-gray-700">Filters:</RText>
        </Group>

        {/* Category Filter */}
        <Select
          value={searchParams.category || "all"}
          onValueChange={(value) =>
            onUpdateParams("category", value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {productMeta?.data?.categories?.map((category) => (
              <SelectItem key={category.id} value={category.title}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Brand Filter */}
        <Select
          value={searchParams.brand || "all"}
          onValueChange={(value) =>
            onUpdateParams("brand", value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {productMeta?.data?.brands?.map((brand) => (
              <SelectItem key={brand.id} value={brand.title}>
                {brand.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Skin Type Filter */}
        <Select
          value={searchParams.skinType || "all"}
          onValueChange={(value) =>
            onUpdateParams("skinType", value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Skin Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skin Types</SelectItem>
            {productMeta?.data?.skinTypes?.map((skinType) => (
              <SelectItem key={skinType.id} value={skinType.title}>
                {skinType.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </Group>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Group className="flex flex-wrap gap-2">
          {searchParams.category && (
            <FilterTag
              label={`Category: ${searchParams.category}`}
              onRemove={() => onUpdateParams("category", "")}
            />
          )}
          {searchParams.brand && (
            <FilterTag
              label={`Brand: ${searchParams.brand}`}
              onRemove={() => onUpdateParams("brand", "")}
            />
          )}
          {searchParams.skinType && (
            <FilterTag
              label={`Skin Type: ${searchParams.skinType}`}
              onRemove={() => onUpdateParams("skinType", "")}
            />
          )}
        </Group>
      )}
    </Area>
  );
}

// Filter Tag Component
const FilterTag = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
    {label}
    <button
      onClick={onRemove}
      className="hover:text-blue-900 p-0.5 hover:bg-blue-200 rounded-full"
    >
      <X className="h-3 w-3" />
    </button>
  </span>
);
