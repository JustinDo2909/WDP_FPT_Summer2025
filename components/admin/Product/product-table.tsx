"use client";

import { Edit, Trash2 } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import {
  formatPrice,
  calculateDiscountedPrice,
  useProductSearch,
} from "@/components/admin/Product/seg/utils";
import { ProductTableProps } from "@/types/productManagement/index";
import CustomTable from "@/components/CustomTable";

export function ProductTable({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductTableProps) {
  const { searchTerm, setSearchTerm, filteredProducts } =
    useProductSearch(products);

  const columns = [
    {
      key: "name",
      label: "Product Name",
      render: (product: any) => (
        <Area className="flex items-center">
          <img
            src={product.images?.[0] || "/placeholder.svg?height=40&width=40"}
            alt={product.name}
            className="h-10 w-10 rounded-lg object-cover mr-3"
          />
          <Yard>
            <RText className="text-sm font-medium text-gray-900">
              {product.name}
            </RText>
            <RText className="text-sm text-gray-500 truncate max-w-xs">
              {product.description}
            </RText>
          </Yard>
        </Area>
      ),
    },
    {
      key: "brand",
      label: "Brand",
      render: (product: any) => (
        <RText className="text-sm text-gray-900">{product.brand}</RText>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (product: any) => (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {product.category}
        </span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (product: any) => (
        <RText
          className={`text-sm ${
            product.stock < 50 ? "text-red-600 font-medium" : "text-gray-900"
          }`}
        >
          {product.stock}
        </RText>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (product: any) => (
        <Area className="flex flex-col">
          <RText className="text-sm font-medium text-gray-900">
            {formatPrice(
              calculateDiscountedPrice(product.price, product.discount)
            )}
          </RText>
          {product.discount > 0 && (
            <RText className="text-xs text-gray-500 line-through">
              {formatPrice(product.price)}
            </RText>
          )}
        </Area>
      ),
    },
    {
      key: "discount",
      label: "Discount",
      render: (product: any) =>
        product.discount > 0 ? (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            {product.discount}%
          </span>
        ) : (
          <RText className="text-sm text-gray-500">No</RText>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (product: any) => (
        <Area className="flex space-x-2">
          <button
            onClick={() => onEditProduct(product)}
            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDeleteProduct(product.id)}
            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </Area>
      ),
    },
  ];

  return (
    <Core className="bg-white rounded-lg shadow-sm border border-gray-200">
      <Container className="overflow-x-auto">
        <CustomTable
          headerTitle="All Products"
          description="Manage your cosmetics inventory"
          data={filteredProducts}
          columns={columns}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddItem={onAddProduct}
          emptyMessage="No products found"
        />
      </Container>
    </Core>
  );
}
