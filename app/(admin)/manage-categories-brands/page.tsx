"use client";

import CustomTable from "@/components/CustomTable";
import { AddSkinTypeModal } from "@/components/admin/Category-Brand/Add-skin-type-modal";
import { AddBrandModal } from "@/components/admin/Category-Brand/add-brand-modal";
import { AddCategoryModal } from "@/components/admin/Category-Brand/add-category-modal";
import {
  calculateStats,
  useCategoriesBrandsLogic
} from "@/components/admin/Category-Brand/seg/utils";
import { StatsCard } from "@/components/admin/StatsCard";
import { Area, Container, Core, RText, Yard } from "@/lib/by/Div";
import type {
  BrandOption,
  CategoryOption,
  SkinTypeOption,
} from "@/types/category-brand/index";
import {
  BarChart3,
  Building2,
  Edit,
  Loader,
  Tag,
  Trash2,
  Users,
} from "lucide-react";

export default function CategoriesBrandsPage() {
  const {
    categories,
    brands,
    skinTypes,
    activeTab,
    setActiveTab,
    isLoading,
    error,
    isCategoryModalOpen,
    editingCategory,
    isBrandModalOpen,
    editingBrand,
    isSkinTypeModalOpen,
    editingSkinType,
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
    handleAddSkinType,
    handleEditSkinType,
    handleCloseSkinTypeModal,
    handleSubmitSkinType,
    handleDeleteSkinType,
    handleExportCategories,
    handleExportBrands,
    handleExportSkinTypes,
  } = useCategoriesBrandsLogic();

  const stats = calculateStats(categories, brands, skinTypes);

  // Category columns
  const categoryColumns = [
    {
      key: "id" as const,
      label: "ID",
      sortable: true,
      render: (category: CategoryOption) => (
        <RText className="font-mono text-sm font-medium text-blue-600">
          {category.id}
        </RText>
      ),
    },
    {
      key: "title" as const,
      label: "Title",
      sortable: true,
      render: (category: CategoryOption) => (
        <Yard>
          <RText className="font-medium text-gray-900">{category.title}</RText>
          <RText className="text-sm text-gray-500 truncate max-w-xs">
            {category.description}
          </RText>
        </Yard>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (category: CategoryOption) => (
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
      label: "ID",
      sortable: true,
      render: (brand: BrandOption) => (
        <RText className="font-mono text-sm font-medium text-purple-600">
          {brand.id}
        </RText>
      ),
    },
    {
      key: "title" as const,
      label: "Title",
      sortable: true,
      render: (brand: BrandOption) => (
        <Yard>
          <RText className="font-medium text-gray-900">{brand.title}</RText>
          <RText className="text-sm text-gray-500 truncate max-w-xs">
            {brand.description}
          </RText>
        </Yard>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (brand: BrandOption) => (
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

  // Skin Type columns
  const skinTypeColumns = [
    {
      key: "id" as const,
      label: "ID",
      sortable: true,
      render: (skinType: SkinTypeOption) => (
        <RText className="font-mono text-sm font-medium text-green-600">
          {skinType.id}
        </RText>
      ),
    },
    {
      key: "title" as const,
      label: "Title",
      sortable: true,
      render: (skinType: SkinTypeOption) => (
        <Yard>
          <RText className="font-medium text-gray-900">{skinType.title}</RText>
          <RText className="text-sm text-gray-500 truncate max-w-xs">
            {skinType.description}
          </RText>
        </Yard>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (skinType: SkinTypeOption) => (
        <Area className="flex items-center space-x-1">
          <button
            onClick={() => handleEditSkinType(skinType)}
            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
            title="Edit Skin Type"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteSkinType(skinType.id)}
            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete Skin Type"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </Area>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Core className="flex flex-col h-full bg-gray-50">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <RText className="text-lg font-semibold text-gray-700">
            Categories, Brands & Skin Types Management
          </RText>
        </header>
        <Container className="flex-1 flex items-center justify-center">
          <Area className="flex items-center space-x-2">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <RText className="text-gray-600">Loading data...</RText>
          </Area>
        </Container>
      </Core>
    );
  }

  if (error) {
    return (
      <Core className="flex flex-col h-full bg-gray-50">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <RText className="text-lg font-semibold text-gray-700">
            Categories, Brands & Skin Types Management
          </RText>
        </header>
        <Container className="flex-1 flex items-center justify-center">
          <Area className="text-center">
            <RText className="text-red-600 text-lg font-medium">
              Error loading data
            </RText>
            <RText className="text-gray-500 mt-2">
              Please refresh the page to try again
            </RText>
          </Area>
        </Container>
      </Core>
    );
  }

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Categories, Brands & Skin Types Management
        </RText>
      </header>

      <Container className="flex-1 overflow-auto p-6 space-y-6">
        {/* Page Header */}
        <Area>
          <RText className="text-gray-600">
            Manage product categories, brands, and skin types
          </RText>
        </Area>

        {/* Stats */}
        <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Categories"
            value={stats.totalCategories}
            icon={Tag}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
          <StatsCard
            title="Total Brands"
            value={stats.totalBrands}
            icon={Building2}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
          />
          <StatsCard
            title="Total Skin Types"
            value={stats.totalSkinTypes}
            icon={Users}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatsCard
            title="Total Items"
            value={stats.totalItems}
            icon={BarChart3}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-50"
          />
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
              <button
                onClick={() => setActiveTab("skinTypes")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "skinTypes"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Area className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Skin Types ({skinTypes.length})
                </Area>
              </button>
            </nav>
          </Area>
        </Area>

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <CustomTable
            data={categories}
            columns={categoryColumns}
            onAddItem={handleAddCategory}
            onExport={handleExportCategories}
            headerTitle="All Categories"
            description="Manage product categories"
            showExport={true}
            showBulkActions={false}
            itemsPerPage={10}
          />
        )}

        {/* Brands Tab */}
        {activeTab === "brands" && (
          <CustomTable
            data={brands}
            columns={brandColumns}
            onAddItem={handleAddBrand}
            onExport={handleExportBrands}
            headerTitle="All Brands"
            description="Manage brand information"
            showExport={true}
            showBulkActions={false}
            itemsPerPage={10}
          />
        )}

        {/* Skin Types Tab */}
        {activeTab === "skinTypes" && (
          <CustomTable
            data={skinTypes}
            columns={skinTypeColumns}
            onAddItem={handleAddSkinType}
            onExport={handleExportSkinTypes}
            headerTitle="All Skin Types"
            description="Manage skin type categories"
            showExport={true}
            showBulkActions={false}
            itemsPerPage={10}
          />
        )}
      </Container>

      {/* Modals */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        onSubmit={handleSubmitCategory}
        editCategory={editingCategory}
      />

      <AddBrandModal
        isOpen={isBrandModalOpen}
        onClose={handleCloseBrandModal}
        onSubmit={handleSubmitBrand}
        editBrand={editingBrand}
      />

      <AddSkinTypeModal
        isOpen={isSkinTypeModalOpen}
        onClose={handleCloseSkinTypeModal}
        onSubmit={handleSubmitSkinType}
        editSkinType={editingSkinType}
      />
    </Core>
  );
}
