import { SearchResults } from "@/components/ProductsPage/SearchResults";
import { Core, Container } from "@/lib/by/Div";
import { fetchProducts } from "./seg";

export default async function SearchPage({ searchParams }: {searchParams: ProductQueryParams}) {
  const params = await searchParams;
  const stringParams = {
    ...params,
    page: params.page !== undefined ? String(params.page) : "1",
    limit: params.limit !== undefined ? String(params.limit) : "5",
  };

  const productsData:PaginatedResponse<IProduct, 'products'> = await fetchProducts(stringParams);
  
  return (
    <Core className="min-h-screen bg-background py-10">
      <Container className="max-w-7xl mx-auto px-4">
        <SearchResults initialData={productsData} />
      </Container>
    </Core>
  );
}