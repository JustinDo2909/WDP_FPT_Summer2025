export interface Category {
  id: string;
  name: string;
  value: number; // số lượng sản phẩm trong category
  description?: string;
  createdDate: string;
  updatedDate: string;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  description?: string;
  productCount: number; // số lượng sản phẩm của brand
  createdDate: string;
  updatedDate: string;
}

export const sampleCategories: Category[] = [
  {
    id: "CAT-001",
    name: "Skincare",
    value: 35,
    description:
      "Skin care products including cleansers, moisturizers, and treatments",
    createdDate: "2023-01-15T10:00:00Z",
    updatedDate: "2024-01-15T10:00:00Z",
  },
  {
    id: "CAT-002",
    name: "Makeup",
    value: 28,
    description: "Cosmetic products for face and body enhancement",
    createdDate: "2023-01-20T14:30:00Z",
    updatedDate: "2024-01-10T16:20:00Z",
  },
  {
    id: "CAT-003",
    name: "Haircare",
    value: 18,
    description:
      "Hair care products including shampoos, conditioners, and styling products",
    createdDate: "2023-02-01T09:15:00Z",
    updatedDate: "2024-01-05T11:45:00Z",
  },
  {
    id: "CAT-004",
    name: "Fragrance",
    value: 12,
    description: "Perfumes and fragrances for men and women",
    createdDate: "2023-02-10T16:45:00Z",
    updatedDate: "2023-12-20T13:30:00Z",
  },
  {
    id: "CAT-005",
    name: "Supplements",
    value: 7,
    description: "Beauty and health supplements",
    createdDate: "2023-03-01T11:20:00Z",
    updatedDate: "2023-12-15T15:10:00Z",
  },
];

export const sampleBrands: Brand[] = [
  {
    id: "BRD-001",
    name: "L'Oréal",
    country: "France",
    description: "Leading beauty and cosmetics company",
    productCount: 15,
    createdDate: "2023-01-10T08:00:00Z",
    updatedDate: "2024-01-12T10:30:00Z",
  },
  {
    id: "BRD-002",
    name: "Estée Lauder",
    country: "USA",
    description: "Luxury beauty and skincare brand",
    productCount: 12,
    createdDate: "2023-01-15T12:30:00Z",
    updatedDate: "2024-01-08T14:20:00Z",
  },
  {
    id: "BRD-003",
    name: "Maybelline",
    country: "USA",
    description: "Affordable makeup and cosmetics",
    productCount: 20,
    createdDate: "2023-01-20T15:45:00Z",
    updatedDate: "2024-01-05T09:15:00Z",
  },
  {
    id: "BRD-004",
    name: "Clinique",
    country: "USA",
    description: "Dermatologist-developed skincare",
    productCount: 8,
    createdDate: "2023-02-01T10:20:00Z",
    updatedDate: "2023-12-28T16:40:00Z",
  },
  {
    id: "BRD-005",
    name: "MAC",
    country: "Canada",
    description: "Professional makeup artistry",
    productCount: 18,
    createdDate: "2023-02-05T13:15:00Z",
    updatedDate: "2024-01-03T11:25:00Z",
  },
  {
    id: "BRD-006",
    name: "Dior",
    country: "France",
    description: "Luxury fashion and beauty",
    productCount: 10,
    createdDate: "2023-02-10T09:30:00Z",
    updatedDate: "2023-12-30T14:50:00Z",
  },
  {
    id: "BRD-007",
    name: "Chanel",
    country: "France",
    description: "Iconic luxury brand",
    productCount: 6,
    createdDate: "2023-02-15T11:45:00Z",
    updatedDate: "2023-12-25T13:20:00Z",
  },
  {
    id: "BRD-008",
    name: "Shiseido",
    country: "Japan",
    description: "Japanese beauty and skincare",
    productCount: 9,
    createdDate: "2023-02-20T14:10:00Z",
    updatedDate: "2024-01-01T10:15:00Z",
  },
  {
    id: "BRD-009",
    name: "The Ordinary",
    country: "Canada",
    description: "Clinical formulations with integrity",
    productCount: 14,
    createdDate: "2023-03-01T16:30:00Z",
    updatedDate: "2024-01-07T12:45:00Z",
  },
];

export const countryOptions = [
  { label: "USA", value: "USA" },
  { label: "France", value: "France" },
  { label: "Canada", value: "Canada" },
  { label: "Japan", value: "Japan" },
  { label: "Germany", value: "Germany" },
  { label: "Italy", value: "Italy" },
  { label: "South Korea", value: "South Korea" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Australia", value: "Australia" },
  { label: "Sweden", value: "Sweden" },
];

// Helper function to get unique countries from brands
export const getUniqueCountries = (brands: Brand[]) => {
  const countries = brands.map((brand) => brand.country);
  return [...new Set(countries)].map((country) => ({
    label: country,
    value: country,
  }));
};
