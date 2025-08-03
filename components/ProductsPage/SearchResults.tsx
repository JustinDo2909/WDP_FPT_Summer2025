"use client";

import { ProductsSearchComponent } from "@/components/ProductsPage/ProductSearchComponent";
import { Section, Area, Content, Box } from "@/lib/by/Div";
import { ProductGrid } from "@/lib/pattern/share/ProductGrid";
import { useGetProductsQuery } from "@/process/api/api";
import { useState } from "react";
import { useAutoRefetch } from "./seg/utils";
import CirclePagination from "@/lib/pattern/share/CirclePagination";
import LoadingSpinner from "../ui/LoadingSpinner";

interface SearchResultsProps {
  initialData?: PaginatedResponse<IProduct, "products">;
  productMetas: IProductMeta;
}

export const SearchResults = ({
  initialData,
  productMetas,
}: SearchResultsProps) => {
  const [searchParams, setSearchParams] = useState({
    category: "",
    brand: "",
    sort: "",
    skinType: "",
    page: 1,
    limit: 5,
    title: "",
  });

  const shouldFetch = true;
  const {
    data: fetchedData,
    isFetching,
    refetch,
  } = useGetProductsQuery(searchParams);

  useAutoRefetch(searchParams, refetch, shouldFetch, ["title"]);

  return (
    <>
      <Section className="mb-8">
        <ProductsSearchComponent
          productMetas={productMetas}
          searchParams={searchParams}
          isLoading={isFetching}
          // onSearch={refetch}
          onChangeParams={(newParams: ProductQueryParams) => {
            // Important: create a NEW object reference
            setSearchParams((prev) => ({ ...prev, ...newParams }));
          }}
        />
      </Section>

      <Area className="bg-muted rounded-xl shadow-sm">
        <Content className="mt-4 pb-2">
          {isFetching ? (
            <LoadingSpinner />
          ) : !fetchedData.pagination.total ? (
            <EmptySearchResults />
          ) : (
            <>
              <ProductGrid
                products={fetchedData?.products ?? initialData?.products}
              />
              <CirclePagination
                onPageChange={(value) =>
                  setSearchParams((prev) => ({ ...prev, page: value }))
                }
                pagination={fetchedData?.pagination ?? initialData?.pagination}
              />
            </>
          )}
        </Content>
      </Area>
    </>
  );
};

const EmptySearchResults = () => {
  return (
    <Section className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Box className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
        <svg
          className="w-12 h-12 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </Box>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        No products found
      </h3>

      <p className="text-muted-foreground max-w-md mb-6">
        We couldn&apos;t find any products matching your search criteria. Try
        adjusting your filters or search terms.
      </p>
    </Section>
  );
};
