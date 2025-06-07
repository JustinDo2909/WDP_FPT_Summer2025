"use client";

import CustomTable from "@/components/CustomTable";
import { StatsCard, MiniStatsCard } from "@/components/admin/StatsCard";
import { AddCategoryModal } from "@/components/admin/Category-Brand/Add-category-modal";
import { AddBrandModal } from "@/components/admin/Category-Brand/Add-brand-modal";
import {
  useCategoriesBrandsLogic,
  formatDate,
  calculateCategoryStats,
  calculateBrandStats,
} from "@/components/admin/Category-Brand/seg/utils";
import { getUniqueCountries } from "@/constants/manage-categories-brands/index";
import type {
  Category,
  Brand,
} from "@/constants/manage-categories-brands/index";
import { getCurrentDate } from "@/components/admin/Dashboard/seg/utils";
import { Area, RText, Yard, Core, Container, Block } from "@/lib/by/Div";
import {
  Edit,
  Trash2,
  Tag,
  Building2,
  Globe,
  TrendingUp,
  Hash,
  BarChart3,
} from "lucide-react";

export default function CategoriesPage() {
  const {
    categories,
    brands,
    activeTab,
    setActiveTab,
    isCategoryModalOpen,
    editingCategory,
    isBrandModalOpen,
    editingBrand,
    handleAddCategory,
    handleEditCategory,
    handleCloseCategoryModal,
    handleSubmitCategory,
    handleDeleteCategory,
    handleAddBrand,
    handleEditBrand,
    handleCloseBrandModal,
    handleSubmitBrand,
    handleDeleteBrand,
    handleExportCategories,
    handleExportBrands,
  } = useCategoriesBrandsLogic();

  const categoryStats = calculateCategoryStats(categories);
  const brandStats = calculateBrandStats(brands);

  // Category columns
  const categoryColumns = [
    {
      key: "id" as const,
      label: "Category ID",
      sortable: true,
      render: (category: Category) => (
        <RText className="font-mono text-sm font-medium text-blue-600">
          {category.id}
        </RText>
      ),
    },
    {
      key: "name" as const,
      label: "Category Name",
      sortable: true,
      render: (category: Category) => (
        <Yard>
          <RText className="font-medium text-gray-900">{category.name}</RText>
          {category.description && (
            <RText className="text-sm text-gray-500 truncate max-w-xs">
              {category.description}
            </RText>
          )}
        </Yard>
      ),
    },
    {
      key: "value" as const,
      label: "Product Count",
      sortable: true,
      render: (category: Category) => (
        <RText className="text-lg font-bold text-green-600">
          {category.value}
        </RText>
      ),
    },
    {
      key: "updatedDate" as const,
      label: "Last Updated",
      sortable: true,
      render: (category: Category) => (
        <RText className="text-sm text-gray-900">
          {formatDate(category.updatedDate)}
        </RText>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (category: Category) => (
        <Area className="flex items-center space-x-1">
          <button
            onClick={() => handleEditCategory(category)}
            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
            title="Edit Category"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteCategory(category.id)}
            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </Area>
      ),
    },
  ];

  // Brand columns
  const brandColumns = [
    {
      key: "id" as const,
      label: "Brand ID",
      sortable: true,
      render: (brand: Brand) => (
        <RText className="font-mono text-sm font-medium text-purple-600">
          {brand.id}
        </RText>
      ),
    },
    {
      key: "name" as const,
      label: "Brand Name",
      sortable: true,
      render: (brand: Brand) => (
        <Yard>
          <RText className="font-medium text-gray-900">{brand.name}</RText>
          {brand.description && (
            <RText className="text-sm text-gray-500 truncate max-w-xs">
              {brand.description}
            </RText>
          )}
        </Yard>
      ),
    },
    {
      key: "country" as const,
      label: "Country",
      sortable: true,
      filterable: true,
      render: (brand: Brand) => (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
          <Globe className="w-3 h-3" />
          {brand.country}
        </span>
      ),
    },
    {
      key: "productCount" as const,
      label: "Product Count",
      sortable: true,
      render: (brand: Brand) => (
        <RText className="text-lg font-bold text-green-600">
          {brand.productCount}
        </RText>
      ),
    },
    {
      key: "updatedDate" as const,
      label: "Last Updated",
      sortable: true,
      render: (brand: Brand) => (
        <RText className="text-sm text-gray-900">
          {formatDate(brand.updatedDate)}
        </RText>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (brand: Brand) => (
        <Area className="flex items-center space-x-1">
          <button
            onClick={() => handleEditBrand(brand)}
            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
            title="Edit Brand"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteBrand(brand.id)}
            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete Brand"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </Area>
      ),
    },
  ];

  const brandFilters = {
    country: getUniqueCountries(brands),
  };

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Categories & Brands Management
        </RText>
        <Block className="text-sm text-gray-500">{getCurrentDate()}</Block>
      </header>
      <Container className="flex-1 overflow-auto p-6 space-y-6">
        {/* Page Header */}
        <Area>
          <RText className="text-gray-600">
            Manage product categories and brand information
          </RText>
        </Area>

        {/* Tabs */}
        <Area className="mb-6">
          <Area className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "categories"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Area className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categories ({categories.length})
                </Area>
              </button>
              <button
                onClick={() => setActiveTab("brands")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "brands"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Area className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Brands ({brands.length})
                </Area>
              </button>
            </nav>
          </Area>
        </Area>

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <Area className="space-y-6">
            {/* Category Stats */}
            <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Categories"
                value={categoryStats.totalCategories}
                icon={Tag}
                iconColor="text-blue-600"
                iconBgColor="bg-blue-50"
              />
              <StatsCard
                title="Total Products"
                value={categoryStats.totalProducts}
                icon={Hash}
                iconColor="text-green-600"
                iconBgColor="bg-green-50"
                valueColor="text-green-600"
              />
              <StatsCard
                title="Avg Products/Category"
                value={categoryStats.averageProductsPerCategory.toFixed(1)}
                icon={BarChart3}
                iconColor="text-purple-600"
                iconBgColor="bg-purple-50"
                valueColor="text-purple-600"
              />
              <StatsCard
                title="Most Popular"
                value={categoryStats.mostPopularCategory.name}
                icon={TrendingUp}
                iconColor="text-yellow-600"
                iconBgColor="bg-yellow-50"
                valueColor="text-yellow-600"
              />
            </Area>

            {/* Categories Table */}
            <CustomTable
              data={categories}
              columns={categoryColumns}
              onAddItem={handleAddCategory}
              onExport={handleExportCategories}
              headerTitle="All Categories"
              description="Manage product categories and their information"
              showExport={true}
              showBulkActions={false}
              itemsPerPage={10}
            />
          </Area>
        )}

        {/* Brands Tab */}
        {activeTab === "brands" && (
          <Area className="space-y-6">
            {/* Brand Stats */}
            <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Brands"
                value={brandStats.totalBrands}
                icon={Building2}
                iconColor="text-purple-600"
                iconBgColor="bg-purple-50"
              />
              <StatsCard
                title="Total Products"
                value={brandStats.totalProducts}
                icon={Hash}
                iconColor="text-green-600"
                iconBgColor="bg-green-50"
                valueColor="text-green-600"
              />
              <StatsCard
                title="Avg Products/Brand"
                value={brandStats.averageProductsPerBrand.toFixed(1)}
                icon={BarChart3}
                iconColor="text-blue-600"
                iconBgColor="bg-blue-50"
                valueColor="text-blue-600"
              />
              <StatsCard
                title="Top Country"
                value={brandStats.topCountry.country}
                icon={Globe}
                iconColor="text-yellow-600"
                iconBgColor="bg-yellow-50"
                valueColor="text-yellow-600"
              />
            </Area>

            {/* Country Distribution */}
            <Area className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(brandStats.countryCounts).map(
                ([country, count]) => (
                  <MiniStatsCard
                    key={country}
                    value={count}
                    label={country}
                    valueColor="text-purple-600"
                  />
                )
              )}
            </Area>

            {/* Brands Table */}
            <CustomTable
              data={brands}
              columns={brandColumns}
              onAddItem={handleAddBrand}
              onExport={handleExportBrands}
              headerTitle="All Brands"
              description="Manage brand information and their origins"
              filters={brandFilters}
              showExport={true}
              showBulkActions={false}
              itemsPerPage={10}
            />
          </Area>
        )}
      </Container>
      {/* Category Modal */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        onSubmit={handleSubmitCategory}
        editCategory={editingCategory}
      />

      {/* Brand Modal */}
      <AddBrandModal
        isOpen={isBrandModalOpen}
        onClose={handleCloseBrandModal}
        onSubmit={handleSubmitBrand}
        editBrand={editingBrand}
      />
    </Core>
  );
}
