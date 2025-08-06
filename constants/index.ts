export const mproduct = {
  id: 1,
  title: "Body Brilliant Exfoliating Serum",
  description:
    "Exfoliating Body Serum with 15% Glycolic Acid. This powerful yet gentle formula helps remove dead skin cells, revealing smoother, brighter skin. Perfect for all skin types.",
  price: 2800000,
  sale_price: 2300000,
  image_url: [
    "https://picsum.photos/1000",
    "https://picsum.photos/700",
    "https://picsum.photos/800",
    "https://picsum.photos/900",
  ],
  product_category_id: 1,
  product_brand_id: 1,
  total_stock: 50,
  created_at: "2025-01-15T10:00:00Z",
  updated_at: "2025-05-20T14:30:00Z",
  ingredients:
    "Glycolic Acid 15%, Hyaluronic Acid, Niacinamide, Vitamin E, Aloe Vera Extract",
  how_to_use:
    "Apply 2-3 drops to clean, dry skin. Use 2-3 times per week in the evening. Always follow with sunscreen during the day.",
  rating: 4.8,
  reviews_count: 2,

  productCategory: {
    product_category_id: 1,
    title: "Body Care",
    description: "Products for body care and skincare",
  },
  productBrand: {
    product_brand_id: 1,
    title: "T-Care",
    description: "Premium skincare brand",
  },
  reviews: [
    {
      review_id: 1,
      id: 1,
      r_id: "user123",
      r_name: "Alice Smith",
      r_value: 5,
      r_message:
        "This serum is amazing! My skin feels so smooth and bright after just a few uses.",
      created_at: "2025-02-10T09:00:00Z",
    },
    {
      review_id: 2,
      id: 1,
      r_id: "user456",
      r_name: "Bob Johnson",
      r_value: 4,
      r_message: "Really good product, but I wish it came in a bigger bottle.",
      created_at: "2025-03-05T12:00:00Z",
    },
  ],
  thumbnails: [
    { color: "#fce7f3", label: "Light Pink" },
    { color: "#f3e8ff", label: "Light Purple" },
    { color: "#fdf2f8", label: "Pale Pink" },
    { color: "#ffffff", label: "White", border: true },
  ],
  navLinks: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Shop" },
    { href: "#", label: "Blog" },
    { href: "#", label: "News" },
    { href: "#", label: "FAQs" },
  ],
  breadcrumbItems: ["Home", "Shop"],
  tabs: [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients" },
    { id: "how-to-use", label: "How to Use" },
    { id: "reviews", label: "Reviews" },
  ],
};

export const products = [
  {
    product: {
      id: 2,
      title: "HydraBoost Moisturizing Cream",
      description:
        "A rich, hydrating cream infused with Ceramides and Squalane. Locks in moisture for up to 48 hours, leaving skin soft and supple. Ideal for dry and sensitive skin.",
      price: 3500000,
      sale_price: 3000000,
      image_url: [
        "https://picsum.photos/1100",
        "https://picsum.photos/750",
        "https://picsum.photos/850",
        "https://picsum.photos/950",
      ],
      product_category_id: 1,
      product_brand_id: 2,
      total_stock: 75,
      created_at: "2025-02-01T08:00:00Z",
      updated_at: "2025-05-22T10:15:00Z",
      ingredients:
        "Ceramides, Squalane, Shea Butter, Glycerin, Chamomile Extract",
      how_to_use:
        "Apply a small amount to clean skin morning and night. Massage gently until absorbed.",
      rating: 4.7,
      reviews_count: 3,
    },
    category: {
      product_category_id: 1,
      title: "Body Care",
      description: "Products for body care and skincare",
    },
    brand: {
      product_brand_id: 2,
      title: "LuxeSkin",
      description: "Luxury skincare for radiant results",
    },
    reviews: [
      {
        review_id: 3,
        id: 2,
        r_id: "user789",
        r_name: "Clara Lee",
        r_value: 5,
        r_message: "My skin has never felt so hydrated! Perfect for winter.",
        created_at: "2025-02-15T11:00:00Z",
      },
      {
        review_id: 4,
        id: 2,
        r_id: "user101",
        r_name: "David Kim",
        r_value: 4,
        r_message: "Great cream, but the scent is a bit strong for me.",
        created_at: "2025-03-10T14:30:00Z",
      },
      {
        review_id: 5,
        id: 2,
        r_id: "user202",
        r_name: "Emma Brown",
        r_value: 5,
        r_message: "Love how it soaks in quickly without feeling greasy.",
        created_at: "2025-04-01T09:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#e0f2fe", label: "Sky Blue" },
      { color: "#f0fdf4", label: "Mint Green" },
      { color: "#fefce8", label: "Pale Yellow" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "News" },
      { href: "#", label: "Contact" },
    ],
    breadcrumbItems: ["Home", "Shop", "Moisturizers"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (3)" },
    ],
  },
  {
    product: {
      id: 3,
      title: "Vitamin C Brightening Serum",
      description:
        "A potent serum with 20% Vitamin C + E Ferulic Acid. Brightens dark spots and evens skin tone for a radiant complexion. Suitable for all skin types.",
      price: 4200000,
      sale_price: 3800000,
      image_url: [
        "https://picsum.photos/1200",
        "https://picsum.photos/800",
        "https://picsum.photos/900",
        "https://picsum.photos/1000",
      ],
      product_category_id: 2,
      product_brand_id: 1,
      total_stock: 40,
      created_at: "2025-03-10T12:00:00Z",
      updated_at: "2025-05-25T16:45:00Z",
      ingredients:
        "Vitamin C 20%, Ferulic Acid, Vitamin E, Hyaluronic Acid, Green Tea Extract",
      how_to_use:
        "Apply 3-4 drops to cleansed face in the morning. Follow with moisturizer and sunscreen.",
      rating: 4.9,
      reviews_count: 4,
    },
    category: {
      product_category_id: 2,
      title: "Facial Serums",
      description: "Targeted treatments for facial skin concerns",
    },
    brand: {
      product_brand_id: 1,
      title: "T-Care",
      description: "Premium skincare brand",
    },
    reviews: [
      {
        review_id: 6,
        id: 3,
        r_id: "user303",
        r_name: "Sophie Turner",
        r_value: 5,
        r_message: "My skin looks so much brighter after a week!",
        created_at: "2025-03-15T10:00:00Z",
      },
      {
        review_id: 7,
        id: 3,
        r_id: "user404",
        r_name: "Liam Carter",
        r_value: 5,
        r_message: "Faded my dark spots significantly. Highly recommend!",
        created_at: "2025-04-05T13:00:00Z",
      },
      {
        review_id: 8,
        id: 3,
        r_id: "user505",
        r_name: "Mia Patel",
        r_value: 4,
        r_message: "Works well, but it’s a bit sticky at first.",
        created_at: "2025-04-20T15:00:00Z",
      },
      {
        review_id: 9,
        id: 3,
        r_id: "user606",
        r_name: "Noah Lee",
        r_value: 5,
        r_message: "Best Vitamin C serum I’ve ever used!",
        created_at: "2025-05-01T11:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#fef08a", label: "Yellow" },
      { color: "#ffedd5", label: "Peach" },
      { color: "#fefce8", label: "Cream" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "FAQs" },
      { href: "#", label: "Support" },
    ],
    breadcrumbItems: ["Home", "Shop", "Serums"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (4)" },
    ],
  },
  {
    product: {
      id: 4,
      title: "Soothing Aloe Gel",
      description:
        "A lightweight gel with 99% Aloe Vera to calm irritated skin and provide instant hydration. Perfect for post-sun care or sensitive skin.",
      price: 1500000,
      sale_price: 1200000,
      image_url: [
        "https://picsum.photos/1300",
        "https://picsum.photos/850",
        "https://picsum.photos/950",
        "https://picsum.photos/1050",
      ],
      product_category_id: 1,
      product_brand_id: 3,
      total_stock: 100,
      created_at: "2025-01-20T09:00:00Z",
      updated_at: "2025-05-18T11:00:00Z",
      ingredients: "Aloe Vera 99%, Panthenol, Allantoin, Cucumber Extract",
      how_to_use:
        "Apply generously to affected areas as needed. Can be used daily.",
      rating: 4.6,
      reviews_count: 2,
    },
    category: {
      product_category_id: 1,
      title: "Body Care",
      description: "Products for body care and skincare",
    },
    brand: {
      product_brand_id: 3,
      title: "PurelyNatural",
      description: "Eco-friendly, natural skincare solutions",
    },
    reviews: [
      {
        review_id: 10,
        id: 4,
        r_id: "user707",
        r_name: "Olivia Green",
        r_value: 5,
        r_message: "Perfect for soothing sunburns. Feels so refreshing!",
        created_at: "2025-02-05T12:00:00Z",
      },
      {
        review_id: 11,
        id: 4,
        r_id: "user808",
        r_name: "James Wilson",
        r_value: 4,
        r_message: "Really calming, but I wish it absorbed faster.",
        created_at: "2025-03-01T14:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#d1fae5", label: "Mint Green" },
      { color: "#ccfbf1", label: "Aqua" },
      { color: "#f0fdfa", label: "Pale Aqua" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Sustainability" },
      { href: "#", label: "FAQs" },
    ],
    breadcrumbItems: ["Home", "Shop", "Body Gels"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (2)" },
    ],
  },
  {
    product: {
      id: 5,
      title: "Retinol Night Cream",
      description:
        "A powerful anti-aging cream with 0.5% Retinol to reduce fine lines and improve skin texture. Formulated for nightly use.",
      price: 5000000,
      sale_price: 4500000,
      image_url: [
        "https://picsum.photos/1400",
        "https://picsum.photos/900",
        "https://picsum.photos/1000",
        "https://picsum.photos/1100",
      ],
      product_category_id: 3,
      product_brand_id: 2,
      total_stock: 30,
      created_at: "2025-04-01T10:00:00Z",
      updated_at: "2025-05-27T13:00:00Z",
      ingredients:
        "Retinol 0.5%, Peptides, Hyaluronic Acid, Jojoba Oil, Vitamin E",
      how_to_use:
        "Apply a pea-sized amount to clean skin at night. Start with 1-2 times per week, gradually increasing frequency.",
      rating: 4.8,
      reviews_count: 3,
    },
    category: {
      product_category_id: 3,
      title: "Anti-Aging",
      description: "Products to reduce signs of aging",
    },
    brand: {
      product_brand_id: 2,
      title: "LuxeSkin",
      description: "Luxury skincare for radiant results",
    },
    reviews: [
      {
        review_id: 12,
        id: 5,
        r_id: "user909",
        r_name: "Ava Thompson",
        r_value: 5,
        r_message: "My wrinkles are visibly reduced after a month!",
        created_at: "2025-04-10T09:00:00Z",
      },
      {
        review_id: 13,
        id: 5,
        r_id: "user1010",
        r_name: "Ethan Davis",
        r_value: 4,
        r_message: "Great product, but caused slight irritation at first.",
        created_at: "2025-04-20T12:00:00Z",
      },
      {
        review_id: 14,
        id: 5,
        r_id: "user1111",
        r_name: "Isabella Martinez",
        r_value: 5,
        r_message: "My skin looks so much smoother. Love it!",
        created_at: "2025-05-05T10:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#e9d5ff", label: "Lavender" },
      { color: "#f3e8ff", label: "Light Purple" },
      { color: "#faf5ff", label: "Pale Purple" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "News" },
      { href: "#", label: "Contact" },
    ],
    breadcrumbItems: ["Home", "Shop", "Anti-Aging"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (3)" },
    ],
  },
  {
    product: {
      id: 6,
      title: "Cleansing Foam Wash",
      description:
        "A gentle foaming cleanser that removes impurities without stripping skin. Infused with Tea Tree Oil for a refreshed feel.",
      price: 2000000,
      sale_price: 1800000,
      image_url: [
        "https://picsum.photos/1500",
        "https://picsum.photos/950",
        "https://picsum.photos/1050",
        "https://picsum.photos/1150",
      ],
      product_category_id: 4,
      product_brand_id: 3,
      total_stock: 80,
      created_at: "2025-02-15T11:00:00Z",
      updated_at: "2025-05-20T09:00:00Z",
      ingredients:
        "Tea Tree Oil, Salicylic Acid, Aloe Vera, Glycerin, Chamomile Extract",
      how_to_use:
        "Massage a small amount onto wet skin, rinse thoroughly. Use morning and night.",
      rating: 4.5,
      reviews_count: 2,
    },
    category: {
      product_category_id: 4,
      title: "Cleansers",
      description: "Products to cleanse and purify skin",
    },
    brand: {
      product_brand_id: 3,
      title: "PurelyNatural",
      description: "Eco-friendly, natural skincare solutions",
    },
    reviews: [
      {
        review_id: 15,
        id: 6,
        r_id: "user1212",
        r_name: "Lucas Brown",
        r_value: 5,
        r_message: "Leaves my skin clean and fresh without drying it out.",
        created_at: "2025-03-01T10:00:00Z",
      },
      {
        review_id: 16,
        id: 6,
        r_id: "user1313",
        r_name: "Chloe Adams",
        r_value: 4,
        r_message: "Good cleanser, but the foam could be thicker.",
        created_at: "2025-03-15T12:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#a7f3d0", label: "Emerald Green" },
      { color: "#d1fae5", label: "Mint Green" },
      { color: "#f0fdfa", label: "Pale Aqua" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Sustainability" },
      { href: "#", label: "FAQs" },
    ],
    breadcrumbItems: ["Home", "Shop", "Cleansers"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (2)" },
    ],
  },
  {
    product: {
      id: 7,
      title: "SPF 50 Sunscreen Lotion",
      description:
        "Broad-spectrum SPF 50 sunscreen with lightweight, non-greasy formula. Protects against UVA/UVB rays and hydrates skin.",
      price: 2500000,
      sale_price: 2200000,
      image_url: [
        "https://picsum.photos/1600",
        "https://picsum.photos/1000",
        "https://picsum.photos/1100",
        "https://picsum.photos/1200",
      ],
      product_category_id: 5,
      product_brand_id: 1,
      total_stock: 60,
      created_at: "2025-03-20T09:00:00Z",
      updated_at: "2025-05-25T14:00:00Z",
      ingredients:
        "Zinc Oxide, Titanium Dioxide, Hyaluronic Acid, Vitamin E, Aloe Vera",
      how_to_use:
        "Apply generously 15 minutes before sun exposure. Reapply every 2 hours.",
      rating: 4.7,
      reviews_count: 3,
    },
    category: {
      product_category_id: 5,
      title: "Sun Protection",
      description: "Products to shield skin from UV damage",
    },
    brand: {
      product_brand_id: 1,
      title: "T-Care",
      description: "Premium skincare brand",
    },
    reviews: [
      {
        review_id: 17,
        id: 7,
        r_id: "user1414",
        r_name: "Harper Lee",
        r_value: 5,
        r_message: "No white cast and feels so light on the skin!",
        created_at: "2025-04-01T11:00:00Z",
      },
      {
        review_id: 18,
        id: 7,
        r_id: "user1515",
        r_name: "Mason Clark",
        r_value: 4,
        r_message: "Great protection, but slightly shiny finish.",
        created_at: "2025-04-15T13:00:00Z",
      },
      {
        review_id: 19,
        id: 7,
        r_id: "user1616",
        r_name: "Aria White",
        r_value: 5,
        r_message: "Perfect for daily use. Doesn’t clog pores!",
        created_at: "2025-05-01T10:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#fefce8", label: "Cream" },
      { color: "#fef08a", label: "Yellow" },
      { color: "#ffedd5", label: "Peach" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "News" },
      { href: "#", label: "FAQs" },
    ],
    breadcrumbItems: ["Home", "Shop", "Sunscreens"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (3)" },
    ],
  },
  {
    product: {
      id: 8,
      title: "Charcoal Detox Mask",
      description:
        "A deep-cleansing mask with activated charcoal to draw out impurities and unclog pores. Leaves skin refreshed and clear.",
      price: 3000000,
      sale_price: 2700000,
      image_url: [
        "https://picsum.photos/1700",
        "https://picsum.photos/1050",
        "https://picsum.photos/1150",
        "https://picsum.photos/1250",
      ],
      product_category_id: 6,
      product_brand_id: 3,
      total_stock: 45,
      created_at: "2025-02-10T10:00:00Z",
      updated_at: "2025-05-22T12:00:00Z",
      ingredients:
        "Activated Charcoal, Kaolin Clay, Bentonite Clay, Tea Tree Oil, Witch Hazel",
      how_to_use:
        "Apply a thin layer to clean skin, leave on for 10-15 minutes, then rinse off.",
      rating: 4.6,
      reviews_count: 2,
    },
    category: {
      product_category_id: 6,
      title: "Face Masks",
      description: "Masks for deep cleansing and nourishment",
    },
    brand: {
      product_brand_id: 3,
      title: "PurelyNatural",
      description: "Eco-friendly, natural skincare solutions",
    },
    reviews: [
      {
        review_id: 20,
        id: 8,
        r_id: "user1717",
        r_name: "Elijah Moore",
        r_value: 5,
        r_message: "Clears my pores like nothing else!",
        created_at: "2025-02-20T09:00:00Z",
      },
      {
        review_id: 21,
        id: 8,
        r_id: "user1818",
        r_name: "Zoe Taylor",
        r_value: 4,
        r_message: "Works well, but dries out my skin a bit.",
        created_at: "2025-03-10T11:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#4b5563", label: "Gray" },
      { color: "#6b7280", label: "Slate" },
      { color: "#d1d5db", label: "Light Gray" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Sustainability" },
      { href: "#", label: "FAQs" },
    ],
    breadcrumbItems: ["Home", "Shop", "Masks"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (2)" },
    ],
  },
  {
    product: {
      id: 9,
      title: "Eye Repair Cream",
      description:
        "A nourishing cream with Caffeine and Peptides to reduce puffiness and dark circles around the eyes. Lightweight and fast-absorbing.",
      price: 3800000,
      sale_price: 3400000,
      image_url: [
        "https://picsum.photos/1800",
        "https://picsum.photos/1100",
        "https://picsum.photos/1200",
        "https://picsum.photos/1300",
      ],
      product_category_id: 7,
      product_brand_id: 2,
      total_stock: 35,
      created_at: "2025-03-01T09:00:00Z",
      updated_at: "2025-05-20T15:00:00Z",
      ingredients:
        "Caffeine, Peptides, Hyaluronic Acid, Vitamin C, Shea Butter",
      how_to_use:
        "Apply a small amount around the eye area morning and night. Gently pat until absorbed.",
      rating: 4.8,
      reviews_count: 3,
    },
    category: {
      product_category_id: 7,
      title: "Eye Care",
      description: "Products for the delicate eye area",
    },
    brand: {
      product_brand_id: 2,
      title: "LuxeSkin",
      description: "Luxury skincare for radiant results",
    },
    reviews: [
      {
        review_id: 22,
        id: 9,
        r_id: "user1919",
        r_name: "Amelia Walker",
        r_value: 5,
        r_message: "My dark circles are fading! Love this cream.",
        created_at: "2025-03-10T10:00:00Z",
      },
      {
        review_id: 23,
        id: 9,
        r_id: "user2020",
        r_name: "Henry Young",
        r_value: 4,
        r_message: "Helps with puffiness, but takes time to see results.",
        created_at: "2025-04-01T12:00:00Z",
      },
      {
        review_id: 24,
        id: 9,
        r_id: "user2121",
        r_name: "Luna Harris",
        r_value: 5,
        r_message: "So gentle and effective. My eyes look brighter!",
        created_at: "2025-04-15T09:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#e0f2fe", label: "Sky Blue" },
      { color: "#bae6fd", label: "Light Blue" },
      { color: "#f0f9ff", label: "Pale Blue" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "News" },
      { href: "#", label: "Contact" },
    ],
    breadcrumbItems: ["Home", "Shop", "Eye Care"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (3)" },
    ],
  },
  {
    product: {
      id: 10,
      title: "Body Butter Bliss",
      description:
        "A luxurious body butter with Cocoa Butter and Coconut Oil for intense hydration. Leaves skin soft and glowing.",
      price: 3200000,
      sale_price: 2900000,
      image_url: [
        "https://picsum.photos/1900",
        "https://picsum.photos/1150",
        "https://picsum.photos/1250",
        "https://picsum.photos/1350",
      ],
      product_category_id: 1,
      product_brand_id: 3,
      total_stock: 55,
      created_at: "2025-01-25T10:00:00Z",
      updated_at: "2025-05-18T14:00:00Z",
      ingredients:
        "Cocoa Butter, Coconut Oil, Shea Butter, Vitamin E, Lavender Oil",
      how_to_use: "Massage onto clean skin after showering for best results.",
      rating: 4.9,
      reviews_count: 2,
    },
    category: {
      product_category_id: 1,
      title: "Body Care",
      description: "Products for body care and skincare",
    },
    brand: {
      product_brand_id: 3,
      title: "PurelyNatural",
      description: "Eco-friendly, natural skincare solutions",
    },
    reviews: [
      {
        review_id: 25,
        id: 10,
        r_id: "user2222",
        r_name: "Evelyn King",
        r_value: 5,
        r_message: "Smells amazing and keeps my skin hydrated all day!",
        created_at: "2025-02-01T11:00:00Z",
      },
      {
        review_id: 26,
        id: 10,
        r_id: "user2323",
        r_name: "Gabriel Scott",
        r_value: 4,
        r_message: "Really moisturizing, but a bit thick for summer.",
        created_at: "2025-03-01T13:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#fef3c7", label: "Amber" },
      { color: "#ffedd5", label: "Peach" },
      { color: "#fefce8", label: "Cream" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Sustainability" },
      { href: "#", label: "FAQs" },
    ],
    breadcrumbItems: ["Home", "Shop", "Body Butters"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (2)" },
    ],
  },
  {
    product: {
      id: 11,
      title: "Clay Purifying Mask",
      description:
        "A purifying mask with French Green Clay to detoxify and balance oily skin. Minimizes pores and controls shine.",
      price: 2800000,
      sale_price: 2500000,
      image_url: [
        "https://picsum.photos/2000",
        "https://picsum.photos/1200",
        "https://picsum.photos/1300",
        "https://picsum.photos/1400",
      ],
      product_category_id: 6,
      product_brand_id: 1,
      total_stock: 50,
      created_at: "2025-02-20T09:00:00Z",
      updated_at: "2025-05-23T11:00:00Z",
      ingredients:
        "French Green Clay, Niacinamide, Tea Tree Oil, Aloe Vera, Witch Hazel",
      how_to_use:
        "Apply a thin layer to clean skin, leave on for 10 minutes, then rinse off.",
      rating: 4.7,
      reviews_count: 3,
    },
    category: {
      product_category_id: 6,
      title: "Face Masks",
      description: "Masks for deep cleansing and nourishment",
    },
    brand: {
      product_brand_id: 1,
      title: "T-Care",
      description: "Premium skincare brand",
    },
    reviews: [
      {
        review_id: 27,
        id: 11,
        r_id: "user2424",
        r_name: "Scarlett Evans",
        r_value: 5,
        r_message: "My skin feels so clean and smooth after using this!",
        created_at: "2025-03-01T10:00:00Z",
      },
      {
        review_id: 28,
        id: 11,
        r_id: "user2525",
        r_name: "Jack Lewis",
        r_value: 4,
        r_message: "Great for oily skin, but a bit drying if used too often.",
        created_at: "2025-03-15T12:00:00Z",
      },
      {
        review_id: 29,
        id: 11,
        r_id: "user2626",
        r_name: "Lily Walker",
        r_value: 5,
        r_message: "Controls my shine perfectly. A must-have!",
        created_at: "2025-04-01T09:00:00Z",
      },
    ],
    thumbnails: [
      { color: "#a7f3d0", label: "Emerald Green" },
      { color: "#6ee7b7", label: "Mint" },
      { color: "#f0fdfa", label: "Pale Aqua" },
      { color: "#ffffff", label: "White", border: true },
    ],
    navLinks: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Shop" },
      { href: "#", label: "Blog" },
      { href: "#", label: "News" },
      { href: "#", label: "FAQs" },
    ],
    breadcrumbItems: ["Home", "Shop", "Masks"],
    tabs: [
      { id: "description", label: "Description" },
      { id: "ingredients", label: "Ingredients" },
      { id: "usage", label: "How to Use" },
      { id: "reviews", label: "Reviews (3)" },
    ],
  },
];

export const games = [
  {
    game_url: "/event/Quiz",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWzhKMNWdFM1HmlgIecpOCBs5u4Jq30fUNxQz6",
    title: "Glow & Know?",
    description: "Test your beauty IQ and unlock exclusive rewards!",
  },
  {
    game_url: "/event/BeautyDrop",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyW0S07pmjvH6zSQAPTDVLocRxF49K3JjiXNhsb",
    title: "Beauty Drop",
    description:
      "The ultimate beauty collecting game! Catch falling makeup, unlock new looks, and become the ultimate beauty guru.",
  },
  {
    game_url: "/event/coming-soon",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWCTdpF6gK6gWyXmFVNdlSDA0YwrCjLt1zEn4i",
    title: "Product Pursuit",
    description: "Find the Hidden Gems, Win Big!",
  },
  {
    game_url: "/event/FlipCard",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyW6xVW8OZixv3NHYOfM4SRpTI2B9ak1Ed8CAsl",
    title: "Memory Game",
    description: "Check your memory!",
  },
  {
    game_url: "/event/Racing",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWvC7iO7NGpV1B4nfFHYlORQ8udj5PmDSh6A0o",
    title: "Highway Thunder",
    description: "Run or died!",
  },
  {
    game_url: "/event/coming-soon",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWRMYfFwa18srvSQHTwJ0C2cUVBDt43pluOfNq",
    title: "Arcade Adventure",
    description: "Classic arcade challenges await!",
  },
  {
    game_url: "/event/coming-soon",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWFohAuXHyeOBfC0Di9EszHlqMXr4T7G1ovPbY",
    title: "Neon Nights",
    description: "Race through glowing neon tracks!",
  },
  {
    game_url: "/event/coming-soon",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWcLYuFiILmGazoRh7MNUyYqtdAEgBe9nsHKx6",
    title: "Beauty Bingo",
    description: "Match beauty icons for bonus points!",
  },
  {
    game_url: "/event/coming-soon",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyW685gxorZixv3NHYOfM4SRpTI2B9ak1Ed8CAs",
    title: "Product Promo Spin",
    description: "Spin the wheel for special offers!",
  },
  {
    game_url: "/event/coming-soon",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyW4UxFoVaPbK52yfwRNaSEDkdHA7lCZTo0nIWB",
    title: "Beauty Builder",
    description: "Design your dream beauty product!",
  },
  {
    game_url: "/event/coming-soon",
    image_url:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWJ9i4Jnb8oq4Kbj9AfXElYCFHPx6VGdDynW1t",
    title: "Makeup Memory Match",
    description: "Pair up cosmetics in memory game!",
  },
];

//region Game Drop
export const VITAMINS = [
  {
    name: "A",
    color: "#E8F5E8",
    points: 15,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWtceauLU8AxO6L3m1gWG2FaR7oeTJHfZ9v8YD",
  },
  {
    name: "B",
    color: "#E3F2FD",
    points: 10,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWXfe0jNlPK8xMcnVoJ5hZ7kGugevHs62NR1Ft",
  },
  {
    name: "C",
    color: "#FFF3E0",
    points: 8,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWdjWJVXqPGcex8au1v5Q0LRgCkVDYrBHbdZW4",
  },
  {
    name: "D",
    color: "#F3E5F5",
    points: 12,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWLNq8TevD3Ntnf69S7mrTUlF1jEehAaQxZIgz",
  },
  {
    name: "E",
    color: "#FCE4EC",
    points: 4,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWCZdc5ZK6gWyXmFVNdlSDA0YwrCjLt1zEn4i2",
  },
  {
    name: "K",
    color: "#F1F8E9",
    points: 6,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWq18P4pwfLVkaZUw754nRBF9zOYiNMprlG8PA",
  },
];

export const HARMFUL_ITEMS = [
  {
    name: "UV",
    color: "#FFEBEE",
    points: -100,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWdv1rWtqPGcex8au1v5Q0LRgCkVDYrBHbdZW4",
  },
  {
    name: "CO2",
    color: "#EFEBE9",
    points: -150,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWsqsktd5puPxTBasbNvKnjZzRAoIOXMS7cLdU",
  },
  {
    name: "Alcohol",
    color: "#F3E5F5",
    points: -200,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWlLhKRNVrEI9Nij0g2ycwz3GAJC7HObfKvFTo",
  },
];

export const MULTIPLIERS = [
  {
    value: 2,
    name: "Double Points Serum",
    color: "#FFF8E1",
    points: 0,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWIAIvLxevmZlOBPHLx9dAMy5gj23CUIoThDq8",
  },
  {
    value: 3,
    name: "Triple Glow Essence",
    color: "#FFF3E0",
    points: 0,
    imageUrl:
      "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWqbA0htwfLVkaZUw754nRBF9zOYiNMprlG8PA",
  },
];

export const VOUCHER_REWARDS = [
  {
    min: 700,
    max: 899,
    type: "AMOUNT",
    value: 50000,
  },
  {
    min: 900,
    max: 1199,
    type: "PERCENT",
    value: 10,
  },
  {
    min: 1200,
    max: 1499,
    type: "PERCENT",
    value: 15,
  },
  {
    min: 1500,
    max: 1799,
    type: "PERCENT",
    value: 20,
  },
  {
    min: 1800,
    max: 9999,
    type: "PERCENT",
    value: 25,
  },
];

export const GAME_MODES = {
  practice: {
    name: "Practice Mode",
    description: "Easy and friendly for beginners",
    settings: {
      vitaminChance: 0.85, // 85% vitamin
      harmfulChance: 0.05, // 5% harmful
      multiplierChance: 0.1, // 10% multiplier
      spawnRate: 0.015, // Slower spawn
      itemSpeed: { min: 1, max: 2.5 }, // Slower fall speed
      basketSpeed: 10, // Faster basket
      gameTime: 45, // Longer time
      basketSize: { width: 150, height: 50 }, // Larger basket
    },
  },
  official: {
    name: "Official Mode",
    description: "A true challenge for skilled players",
    settings: {
      vitaminChance: 0.7, // 70% vitamin
      harmfulChance: 0.2, // 20% harmful
      multiplierChance: 0.1, // 10% multiplier
      spawnRate: 0.03, // Faster spawn
      itemSpeed: { min: 2, max: 4 }, // Faster fall speed
      basketSpeed: 8, // Slower basket
      gameTime: 30, // Shorter time
      basketSize: { width: 100, height: 50 }, // Smaller basket
    },
  },
};
//endregion
