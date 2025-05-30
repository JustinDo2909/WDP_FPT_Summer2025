"use client";

import { Search, Settings, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import {
  formatPrice,
  calculateDiscountedPrice,
  useProductSearch,
} from "@/components/admin/ProductManagement/seg/utils";
import { ProductTableProps } from "@/types/productManagement/index";

export function ProductTable({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductTableProps) {
  const { searchTerm, setSearchTerm, filteredProducts } =
    useProductSearch(products);

  return (
    <Core className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <Container className="p-6 border-b border-gray-200">
        <Area className="flex items-center justify-between">
          <Yard>
            <RText className="text-2xl font-semibold text-gray-900">
              All Products
            </RText>
            <RText className="text-sm text-gray-500 mt-1">
              Manage your cosmetics inventory
            </RText>
          </Yard>
          <button
            onClick={onAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add new product
          </button>
        </Area>
      </Container>

      {/* Search and Filters */}
      <Container className="p-6 border-b border-gray-200">
        <Area className="flex items-center gap-4">
          <Yard className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </Yard>
          <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </Area>
      </Container>

      {/* Table */}
      <Container className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Area className="flex items-center">
                    <img
                      src={
                        product.images[0] ||
                        "/placeholder.svg?height=40&width=40"
                      }
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RText className="text-sm text-gray-900">
                    {product.brand}
                  </RText>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RText
                    className={`text-sm ${product.stock < 50 ? "text-red-600 font-medium" : "text-gray-900"}`}
                  >
                    {product.stock}
                  </RText>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Area className="flex flex-col">
                    <RText className="text-sm font-medium text-gray-900">
                      {formatPrice(
                        calculateDiscountedPrice(
                          product.price,
                          product.discount
                        )
                      )}
                    </RText>
                    {product.discount > 0 && (
                      <RText className="text-xs text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </RText>
                    )}
                  </Area>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.discount > 0 ? (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {product.discount}%
                    </span>
                  ) : (
                    <RText className="text-sm text-gray-500">No</RText>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      {filteredProducts.length === 0 && (
        <Container className="p-12 text-center">
          <RText className="text-gray-500">No products found</RText>
        </Container>
      )}
    </Core>
  );
}
