
'use client'

import { ProductsSearchComponent } from "@/components/ProductsPage/ProductSearchComponent";
import { Section, Area, Content } from "@/lib/by/Div";
import { ProductGrid } from "@/lib/pattern/share/ProductGrid";
import { useGetProductsQuery } from "@/process/api/api";
import { useState } from "react";
import { useAutoRefetch } from "./seg/utils";

interface SearchResultsProps {
  initialData?: PaginatedResponse<IProduct, 'products'>;
}

export const SearchResults = ({ initialData }: SearchResultsProps) => {
  const [searchParams, setSearchParams] = useState({
    category: "",
    brand: "",
    sort: "",
    page: 1,
    limit: 10,
    query: ""
  });

  const shouldFetch = true;
  const { data: fetchedData , isLoading, refetch } = useGetProductsQuery(
    searchParams
  );

  useAutoRefetch(searchParams, refetch, shouldFetch, ['query']);


  return (
    <>
      <Section className="mb-8">
        <ProductsSearchComponent
          searchParams={searchParams}
          isLoading={isLoading}
          onSearch={refetch}
          onChangeParams={(newParams:ProductQueryParams) => {
            // Important: create a NEW object reference
            setSearchParams((prev) => ({ ...prev, ...newParams }));
          }}
        />
      </Section>

      <Area className="bg-muted rounded-xl shadow-sm">
        <Content className="mt-4">
          <ProductGrid products={fetchedData?.products ?? initialData?.products} />
        </Content>
      </Area>
    </>
  );
};

