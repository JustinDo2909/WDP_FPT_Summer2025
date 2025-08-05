export interface Batch {
  id: string;
  product_id: string;
  quantity: number;
  current_stock: number;
  expire_at: string;
  created_at: string;
  status: "active" | "expired" | "out-of-stock";
  discount?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image?: string;
}

export const statusColors = {
  active: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Active",
  },
  expired: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Expired",
  },
  "out-of-stock": {
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: "Out of Stock",
  },
};

export const sampleProducts: Product[] = [
  {
    id: "P001",
    name: "Vitamin C Serum",
    brand: "SkinCare Pro",
    category: "Serum",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P002",
    name: "Hyaluronic Acid Moisturizer",
    brand: "HydraGlow",
    category: "Moisturizer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P003",
    name: "Retinol Night Cream",
    brand: "AntiAge",
    category: "Night Cream",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P004",
    name: "Niacinamide Toner",
    brand: "PureSkin",
    category: "Toner",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P005",
    name: "Sunscreen SPF 50",
    brand: "SunGuard",
    category: "Sunscreen",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P006",
    name: "Collagen Face Mask",
    brand: "BeautyLux",
    category: "Face Mask",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P007",
    name: "Peptide Eye Cream",
    brand: "EyeCare",
    category: "Eye Cream",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P008",
    name: "Salicylic Acid Cleanser",
    brand: "ClearSkin",
    category: "Cleanser",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P009",
    name: "Ceramide Barrier Cream",
    brand: "SkinBarrier",
    category: "Barrier Cream",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P010",
    name: "Alpha Arbutin Serum",
    brand: "BrightSkin",
    category: "Serum",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P011",
    name: "Glycolic Acid Exfoliant",
    brand: "ExfoliPro",
    category: "Exfoliant",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "P012",
    name: "Centella Asiatica Essence",
    brand: "CalmSkin",
    category: "Essence",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export const sampleBatches: Batch[] = [
  // December 2024
  {
    id: "B001",
    product_id: "P001",
    quantity: 100,
    current_stock: 75,
    expire_at: "2025-12-15",
    created_at: "2024-12-01T10:00:00Z",
    status: "active",
  },
  {
    id: "B002",
    product_id: "P002",
    quantity: 150,
    current_stock: 120,
    expire_at: "2025-11-20",
    created_at: "2024-12-05T14:30:00Z",
    status: "active",
  },
  {
    id: "B003",
    product_id: "P003",
    quantity: 80,
    current_stock: 0,
    expire_at: "2025-10-10",
    created_at: "2024-12-10T09:15:00Z",
    status: "out-of-stock",
  },
  // January 2025
  {
    id: "B004",
    product_id: "P004",
    quantity: 200,
    current_stock: 180,
    expire_at: "2026-01-25",
    created_at: "2025-01-03T11:45:00Z",
    status: "active",
  },
  {
    id: "B005",
    product_id: "P005",
    quantity: 120,
    current_stock: 90,
    expire_at: "2025-12-30",
    created_at: "2025-01-08T16:20:00Z",
    status: "active",
  },
  {
    id: "B006",
    product_id: "P006",
    quantity: 60,
    current_stock: 15,
    expire_at: "2025-02-15",
    created_at: "2025-01-15T13:10:00Z",
    status: "active",
    discount: 20,
  },
  // February 2025
  {
    id: "B007",
    product_id: "P007",
    quantity: 90,
    current_stock: 45,
    expire_at: "2025-08-20",
    created_at: "2025-02-02T08:30:00Z",
    status: "active",
  },
  {
    id: "B008",
    product_id: "P008",
    quantity: 110,
    current_stock: 85,
    expire_at: "2025-09-15",
    created_at: "2025-02-12T15:45:00Z",
    status: "active",
  },
  {
    id: "B009",
    product_id: "P009",
    quantity: 75,
    current_stock: 0,
    expire_at: "2024-12-01",
    created_at: "2025-02-18T12:00:00Z",
    status: "expired",
    discount: 50,
  },
  // March 2025
  {
    id: "B010",
    product_id: "P010",
    quantity: 130,
    current_stock: 100,
    expire_at: "2025-10-30",
    created_at: "2025-03-05T10:20:00Z",
    status: "active",
  },
  {
    id: "B011",
    product_id: "P011",
    quantity: 95,
    current_stock: 70,
    expire_at: "2025-11-25",
    created_at: "2025-03-15T14:15:00Z",
    status: "active",
  },
  // April 2025
  {
    id: "B012",
    product_id: "P012",
    quantity: 85,
    current_stock: 60,
    expire_at: "2025-12-10",
    created_at: "2025-04-08T09:40:00Z",
    status: "active",
  },
  {
    id: "B013",
    product_id: "P001",
    quantity: 140,
    current_stock: 110,
    expire_at: "2026-02-20",
    created_at: "2025-04-20T11:25:00Z",
    status: "active",
  },
  // May 2025
  {
    id: "B014",
    product_id: "P002",
    quantity: 160,
    current_stock: 0,
    expire_at: "2025-07-15",
    created_at: "2025-05-10T16:30:00Z",
    status: "out-of-stock",
  },
  {
    id: "B015",
    product_id: "P003",
    quantity: 70,
    current_stock: 25,
    expire_at: "2025-01-30",
    created_at: "2025-05-25T13:50:00Z",
    status: "expired",
    discount: 40,
  },
  // June 2025
  {
    id: "B016",
    product_id: "P004",
    quantity: 180,
    current_stock: 150,
    expire_at: "2026-03-15",
    created_at: "2025-06-12T10:10:00Z",
    status: "active",
  },
];
