export interface CategoryOption {
  id: string;
  title: string;
  description: string;
}

export interface BrandOption {
  id: string;
  title: string;
  description: string;
}

export interface SkinTypeOption {
  id: string;
  title: string;
  description: string;
}

export interface CategoryFormData {
  title: string;
  description: string;
}

export interface BrandFormData {
  title: string;
  description: string;
}

export interface SkinTypeFormData {
  title: string;
  description: string;
}

export interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: Omit<CategoryOption, "id">) => void;
  editCategory?: CategoryOption | null;
}

export interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (brand: Omit<BrandOption, "id">) => void;
  editBrand?: BrandOption | null;
}

export interface AddSkinTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (skinType: Omit<SkinTypeOption, "id">) => void;
  editSkinType?: SkinTypeOption | null;
}

export interface MetaDataResponse {
  success: boolean;
  data: {
    categories: CategoryOption[];
    brands: BrandOption[];
    skinTypes: SkinTypeOption[];
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
