"use client";
import { useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { brandData, categoryData } from "@/constants/share/index";
import { AddProductModalProps } from "@/types/productManagement/index";
import { useProductForm } from "@/components/admin/Product/seg/utils";

export function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  editProduct,
}: AddProductModalProps) {
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleImageChange,
    removeImage,
    handleSubmit,
  } = useProductForm(editProduct);

  // Reset form when editProduct changes
  useEffect(() => {
    if (editProduct) {
      // Update form data when editing
      Object.entries(editProduct).forEach(([key, value]) => {
        if (key === "price" || key === "stock") {
          handleInputChange(key, value.toString());
        } else {
          handleInputChange(key, value);
        }
      });
    }
  }, [editProduct]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Core
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[9998] ${
          isOpen ? "bg-opacity-60" : "bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <Core
        className={`fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Container className="h-full overflow-y-auto">
          {/* Header */}
          <Area className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <RText className="text-xl font-semibold text-gray-900">
              {editProduct ? "Edit Product" : "Add New Product"}
            </RText>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </Area>

          {/* Form */}
          <form
            onSubmit={(e) => handleSubmit(e, onSubmit)}
            className="p-6 space-y-6"
          >
            {/* Product Name */}
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </RText>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <RText className="text-red-500 text-sm mt-1">
                  {errors.name}
                </RText>
              )}
            </Yard>

            {/* Description */}
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </RText>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter product description"
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <RText className="text-red-500 text-sm mt-1">
                  {errors.description}
                </RText>
              )}
            </Yard>

            {/* Price and Stock */}
            <Area className="grid grid-cols-2 gap-4">
              <Yard>
                <RText className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </RText>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <RText className="text-red-500 text-sm mt-1">
                    {errors.price}
                  </RText>
                )}
              </Yard>

              <Yard>
                <RText className="block text-sm font-medium text-gray-700 mb-2">
                  Total Stock *
                </RText>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.stock && (
                  <RText className="text-red-500 text-sm mt-1">
                    {errors.stock}
                  </RText>
                )}
              </Yard>
            </Area>

            {/* Brand and Category */}
            <Area className="grid grid-cols-2 gap-4">
              <Yard>
                <RText className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </RText>
                <select
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select brand</option>
                  {brandData.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brand && (
                  <RText className="text-red-500 text-sm mt-1">
                    {errors.brand}
                  </RText>
                )}
              </Yard>

              <Yard>
                <RText className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </RText>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select category</option>
                  {categoryData.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <RText className="text-red-500 text-sm mt-1">
                    {errors.category}
                  </RText>
                )}
              </Yard>
            </Area>

            {/* Discount */}
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </RText>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </Yard>

            {/* Images */}
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </RText>
              <Area className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <RText className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </RText>
                <RText className="text-xs text-gray-500 mb-4">
                  PNG, JPG, GIF up to 10MB
                </RText>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
                >
                  Choose Files
                </label>
              </Area>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <Area className="grid grid-cols-4 gap-4 mt-4">
                  {formData.images.map((image: string, index: number) => (
                    <Yard key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Yard>
                  ))}
                </Area>
              )}
            </Yard>

            {/* Actions */}
            <Area className="flex justify-end space-x-3 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? "Saving..."
                  : editProduct
                    ? "Update Product"
                    : "Add Product"}
              </button>
            </Area>
          </form>
        </Container>
      </Core>
    </>
  );
}
