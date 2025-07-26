import { SearchResults } from "@/components/ProductsPage/SearchResults";
import { Core, Container } from "@/lib/by/Div";
import { fetchProductMeta, fetchProducts } from "./seg";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<ProductQueryParams>;
}) {
  const params = await searchParams;
  const stringParams = {
    ...params,
    page: params.page !== undefined ? String(params.page) : "1",
    limit: params.limit !== undefined ? String(params.limit) : "5",
  };

  const productsData: PaginatedResponse<IProduct, "products"> =
    await fetchProducts(stringParams);
  const productMeta = await fetchProductMeta();

  //todo change pagination ui

  return (
    <Core className="min-h-screen bg-background py-10">
      <Container className="max-w-7xl mx-auto px-4">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Products" }]}
        />
        <SearchResults
          productMetas={productMeta.data as IProductMeta}
          initialData={productsData}
        />
      </Container>
    </Core>
  );
}
