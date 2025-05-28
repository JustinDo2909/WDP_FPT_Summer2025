export const headerData = [
  { title: "Home", href: "/" },
  { title: "Category", href: "/category" },
  { title: "Shop", href: "/shop" },
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

export const productType = [
  { title: "Tshirt", value: "tshirt" },
  { title: "Jacket", value: "jacket" },
  { title: "Pants", value: "pants" },
  { title: "Hoodie", value: "hoodie" },
  { title: "Short", value: "tshirt" },
];

export const quickLinksData = [
  { title: "About us", href: "/about" },
  { title: "Contact us", href: "/contact" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "FAQs", href: "/faqs" },
];

export const categoriesData = [
  { title: "Men's Fashion", href: "/men" },
  { title: "Women's Fashion", href: "/women" },
  { title: "Kids corner", href: "/kids" },
  { title: "Tshirt", href: "/t-shirt" },
  { title: "Accessories", href: "/accessories" },
  { title: "Household", href: "/household" },
  { title: "Others", href: "/others" },
];
export const faqsData = [
  {
    question: "What services does Reco offer?",
    answer:
      "Reco offers a wide range of technology solutions including custom software development, cloud services, and digital transformation consulting.",
  },
  {
    question: "How can I get support for Reco products?",
    answer:
      "You can reach our support team through our contact page or by emailing support@Reco.com.",
  },
  {
    question: "Does Reco offer training for its products?",
    answer:
      "Yes, we offer comprehensive training programs for all our products and services. Please contact our sales team for more information.",
  },
  {
    question: "What industries does Reco serve?",
    answer:
      "Reco serves a wide range of industries including finance, healthcare, retail, and manufacturing.",
  },
  {
    question: "How does Reco ensure data security?",
    answer:
      "We employ industry-standard security measures and comply with all relevant data protection regulations to ensure the security of our clients' data.",
  },
];

export const countUpItems = [
  {
    id: 1,
    number: 200,
    title: "kg",
    text: "Mỗi năm, RECO tái tạo hơn 200 kg quần áo thành các sản phẩm thời trang bền vững như túi xách.",
  },
  {
    id: 2,
    number: 2000,
    title: "Sản Phẩm",
    text: "RECO giúp 2,000 sản phẩm quần áo cũ tìm được mục đích mới mỗi năm.",
  },
  {
    id: 3,
    number: 50,
    title: "Tình Nguyện Viên",
    text: "Hơn 50 tình nguyện viên từ khắp Việt Nam tham gia cùng RECO trong hành trình thời trang bền vững.",
  },
  {
    id: 4,
    number: 10,
    title: "Đối Tác",
    text: "RECO hợp tác với hơn 10 thương hiệu thân thiện với môi trường để tạo ra một tương lai xanh hơn.",
  },
];

export const product = {
  product: {
    product_id: 1,
    title: "Body Brilliant Exfoliating Serum",
    description: "Exfoliating Body Serum with 15% Glycolic Acid. This powerful yet gentle formula helps remove dead skin cells, revealing smoother, brighter skin. Perfect for all skin types.",
    price: 2800000,
    sale_price: 2300000,
    image_url: [
      "https://picsum.photos/1000",
      "https://picsum.photos/700",
      "https://picsum.photos/800",
      "https://picsum.photos/900"
    ],
    product_category_id: 1,
    product_brand_id: 1,
    total_stock: 50,
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-05-20T14:30:00Z",
    ingredients: "Glycolic Acid 15%, Hyaluronic Acid, Niacinamide, Vitamin E, Aloe Vera Extract",
    how_to_use: "Apply 2-3 drops to clean, dry skin. Use 2-3 times per week in the evening. Always follow with sunscreen during the day.",
    rating: 4.8,
    reviews_count: 2
  },
  category: {
    product_category_id: 1,
    title: "Body Care",
    description: "Products for body care and skincare"
  },
  brand: {
    product_brand_id: 1,
    title: "T-Care",
    description: "Premium skincare brand"
  },
  reviews: [
    {
      review_id: 1,
      product_id: 1,
      r_id: "user123",
      r_name: "Alice Smith",
      r_value: 5,
      r_message: "This serum is amazing! My skin feels so smooth and bright after just a few uses.",
      created_at: "2025-02-10T09:00:00Z"
    },
    {
      review_id: 2,
      product_id: 1,
      r_id: "user456",
      r_name: "Bob Johnson",
      r_value: 4,
      r_message: "Really good product, but I wish it came in a bigger bottle.",
      created_at: "2025-03-05T12:00:00Z"
    }
  ],
  thumbnails: [
    { color: "#fce7f3", label: "Light Pink" },
    { color: "#f3e8ff", label: "Light Purple" },
    { color: "#fdf2f8", label: "Pale Pink" },
    { color: "#ffffff", label: "White", border: true }
  ],
  navLinks: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Shop" },
    { href: "#", label: "Blog" },
    { href: "#", label: "News" },
    { href: "#", label: "FAQs" }
  ],
  breadcrumbItems: ["Home", "Shop"],
  tabs: [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients" },
    { id: "usage", label: "How to Use" },
    { id: "reviews", label: "Reviews (2)" }
  ]
};
