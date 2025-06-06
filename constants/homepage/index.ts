export const headerData = [
  { title: "Home", href: "/" },
  { title: "Category", href: "/category" },
  { title: "Product", href: "/products" },
  { title: "Event", href: "/event" },
  { title: "About", href: "/about" },
];

export const footerData = [
  {
    title: "Category",
    links: [
      { title: "Face Care", href: "/category/face-care" },
      { title: "Body Care", href: "/category/body-care" },
      { title: "Hand Care", href: "/category/hand-care" },
      { title: "Special Collections", href: "/category/special-collections" },
      { title: "Sale", href: "/category/sale" },
    ],
  },
  {
    title: "About",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Shop", href: "/shop" },
      { title: "event", href: "/event" },
      { title: "Contacts", href: "/contacts" },
      { title: "Showrooms", href: "/showrooms" },
    ],
  },
  {
    title: "Terms & Policy",
    links: [
      { title: "Term of Service", href: "/terms" },
      { title: "Return & Refund", href: "/return-refund" },
      { title: "Cookie Policy", href: "/cookie-policy" },
      { title: "Payment Terms", href: "/payment-terms" },
      { title: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export const listProductData = [
  {
    product_id: 1,
    title: "La Roche-Posay Anthelios SPF50+",
    description:
      "High protection sunscreen for sensitive skin, non-greasy and water-resistant.",
    price: 450000,
    sale_price: 389000,
    image_url: "/images/images.png",
    product_category_id: 1, // e.g., Skincare
    product_brand_id: 1, // e.g., La Roche-Posay
    total_stock: 100,
  },
  {
    product_id: 2,
    title: "CeraVe Hydrating Facial Cleanser",
    description:
      "Gentle cleanser with ceramides and hyaluronic acid for normal to dry skin.",
    price: 350000,
    sale_price: 315000,
    image_url: "/images/images.png",
    product_category_id: 1,
    product_brand_id: 2,
    total_stock: 75,
  },
  {
    product_id: 3,
    title: "Vichy Mineral 89 Booster",
    description: "Daily booster to strengthen skin barrier and deeply hydrate.",
    price: 600000,
    sale_price: 529000,
    image_url: "/images/images.png",
    product_category_id: 1,
    product_brand_id: 3,
    total_stock: 85,
  },
  {
    product_id: 4,
    title: "Bioderma Sensibio H2O Micellar Water",
    description: "Cleansing and makeup removing water for sensitive skin.",
    price: 420000,
    sale_price: 375000,
    image_url: "/images/images.png",
    product_category_id: 1,
    product_brand_id: 4,
    total_stock: 120,
  },
  {
    product_id: 5,
    title: "Eucerin Advanced Repair Cream",
    description: "Fragrance-free moisturizing cream for very dry skin.",
    price: 490000,
    sale_price: 449000,
    image_url: "/images/images.png",
    product_category_id: 2, // e.g., Body Care
    product_brand_id: 5,
    total_stock: 60,
  },
  {
    product_id: 6,
    title: "Paula’s Choice BHA Liquid Exfoliant",
    description: "2% salicylic acid solution for blackheads and pore care.",
    price: 700000,
    sale_price: 639000,
    image_url: "/images/images.png",
    product_category_id: 1,
    product_brand_id: 6,
    total_stock: 90,
  },
  {
    product_id: 7,
    title: "Avene Thermal Spring Water Spray",
    description: "Soothing spray for sensitive or irritated skin.",
    price: 300000,
    sale_price: 275000,
    image_url: "/images/images.png",
    product_category_id: 1,
    product_brand_id: 7,
    total_stock: 110,
  },
];
