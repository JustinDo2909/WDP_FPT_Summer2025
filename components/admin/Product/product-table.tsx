"use client";

import { useState, useMemo } from "react";
import { Edit, Trash2, AlertTriangle } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import {
  formatPrice,
  calculateDiscountedPrice,
  useProductSearch,
} from "@/components/admin/Product/seg/utils";
import { ProductTableProps, Product } from "@/types/productManagement/index";
import CustomTable from "@/components/CustomTable";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/process/api/api";
import { ProductFilters } from "@/components/admin/Product/Product-filters";

export function ProductTable({
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductTableProps) {
  const { searchParams, updateSearchParams } = useProductSearch();
  const [page, setPage] = useState(1);
  const [sortLowStock, setSortLowStock] = useState(false);
  const pageSize = 10;

  const { data, isLoading, isError, error } = useGetProductsQuery({
    page,
    pageSize,
    category: searchParams.category,
    brand: searchParams.brand,
    skinType: searchParams.skinType,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Sort products to prioritize low stock items when enabled
  const sortedProducts = useMemo(() => {
    if (!data?.products || !sortLowStock) {
      return data?.products || [];
    }

    return [...data.products].sort((a, b) => {
      const aIsLowStock = a.total_stock < 50;
      const bIsLowStock = b.total_stock < 50;

      // If both are low stock or both are not low stock, sort by stock quantity (ascending)
      if (aIsLowStock === bIsLowStock) {
        return a.total_stock - b.total_stock;
      }

      // Prioritize low stock items
      return aIsLowStock ? -1 : 1;
    });
  }, [data?.products, sortLowStock]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        onDeleteProduct(id);
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const toggleLowStockSort = () => {
    setSortLowStock(!sortLowStock);
  };

  // Reset page when filters change
  const handleFilterChange = (field: string, value: string) => {
    updateSearchParams(field, value);
    setPage(1); // Reset to first page when filters change
  };

  const columns = [
    {
      key: "title" as keyof Product,
      label: "Product Name",
      render: (product: Product) => (
        <Area className="flex items-center">
          <img
            src={product.image_url || "/placeholder.svg?height=40&width=40"}
            alt={product.title}
            className="h-10 w-10 rounded-lg object-cover mr-3"
          />
          <Yard>
            <RText className="text-sm font-medium text-gray-900">
              {product.title}
            </RText>
            <RText className="text-sm text-gray-500 truncate max-w-xs">
              {product.description}
            </RText>
          </Yard>
        </Area>
      ),
    },
    {
      key: "productBrand" as keyof Product,
      label: "Brand",
      render: (product: Product) => (
        <RText className="text-sm text-gray-900">
          {product.productBrand.title}
        </RText>
      ),
    },
    {
      key: "productCategory" as keyof Product,
      label: "Category",
      render: (product: Product) => (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {product.productCategory.title}
        </span>
      ),
    },
    {
      key: "productSkinType" as keyof Product,
      label: "Skin Type",
      render: (product: Product) => (
        <RText className="text-sm text-gray-900">
          {product.productSkinType.title}
        </RText>
      ),
    },
    {
      key: "total_stock" as keyof Product,
      label: "Stock",
      render: (product: Product) => (
        <Area className="flex items-center">
          {product.total_stock < 50 && (
            <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
          )}
          <RText
            className={`text-sm ${
              product.total_stock < 50
                ? "text-red-600 font-medium"
                : "text-gray-900"
            }`}
          >
            {product.total_stock}
          </RText>
        </Area>
      ),
    },
    {
      key: "price" as keyof Product,
      label: "Price",
      render: (product: Product) => (
        <Area className="flex flex-col">
          <RText className="text-sm font-medium text-gray-900">
            {formatPrice(
              calculateDiscountedPrice(product.price, product.sale_price)
            )}
          </RText>
          {product.sale_price > 0 && product.sale_price < product.price && (
            <RText className="text-xs text-gray-500 line-through">
              {formatPrice(product.price)}
            </RText>
          )}
        </Area>
      ),
    },
    {
      key: "id" as keyof Product,
      label: "Actions",
      render: (product: Product) => (
        <Area className="flex space-x-2">
          <button
            onClick={() => onEditProduct(product)}
            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
            disabled={isDeleting}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </Area>
      ),
    },
  ];

  const lowStockCount = useMemo(() => {
    return (data?.products || []).filter((product) => product.total_stock < 50)
      .length;
  }, [data?.products]);

  return (
    <Core className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filters Section */}
      <ProductFilters
        searchParams={searchParams}
        onUpdateParams={handleFilterChange}
      />

      <Container className="overflow-x-auto">
        {/* Low Stock Sort Controls */}
        <Area className="flex items-center justify-between p-4 border-b border-gray-200">
          <Area className="flex items-center space-x-4">
            <RText className="text-sm font-medium text-gray-700">Sorting</RText>
            {lowStockCount > 0 && (
              <Area className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                <RText className="text-sm text-red-600 font-medium">
                  {lowStockCount} low stock items
                </RText>
              </Area>
            )}
          </Area>
          <button
            onClick={toggleLowStockSort}
            className={`flex items-center px-3 py-2 text-sm rounded-md border transition-colors ${
              sortLowStock
                ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            {sortLowStock ? "Stop Low Stock Sort" : "Sort Low Stock First"}
          </button>
        </Area>

        {isError && (
          <RText className="text-red-500 text-sm p-4">
            Error: {JSON.stringify(error)}
          </RText>
        )}
        <CustomTable
          headerTitle="All Products"
          description="Manage your cosmetics inventory"
          data={sortedProducts}
          columns={columns}
          onAddItem={onAddProduct}
          itemsPerPage={pageSize}
        />

        {/* Custom Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <Area className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <RText className="text-sm text-gray-700">
              Showing page {data.pagination.page} of{" "}
              {data.pagination.totalPages}({data.pagination.total} total
              products)
            </RText>
            <Area className="flex items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from(
                { length: data.pagination.totalPages },
                (_, i) => i + 1
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 text-sm border rounded-md ${
                    pageNum === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === data.pagination.totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </Area>
          </Area>
        )}

        {/* Empty State */}
        {(!data?.products || data.products.length === 0) && !isLoading && (
          <Area className="text-center py-12">
            <RText className="text-gray-500">No products found</RText>
          </Area>
        )}

        {/* Loading State */}
        {isLoading && (
          <Area className="text-center py-12">
            <RText className="text-gray-500">Loading products...</RText>
          </Area>
        )}
      </Container>
    </Core>
  );
}
