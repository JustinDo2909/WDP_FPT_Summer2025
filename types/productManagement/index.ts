export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  images: string[];
  discount: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  stock: string;
  discount: number;
  images: string[];
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  editProduct?: Product | null;
}

export interface ProductTableProps {
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
}
