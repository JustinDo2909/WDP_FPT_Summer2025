export const npcProfiles: NPCProfile[] = [
  {
    id: 1,
    name: "Lana",
    avatar_url_default: "https://i.ibb.co/Z6v2B3dQ/lana.png",
    avatar_url_happy: "/avatars/lana_happy.png",
    avatar_url_sad: "/avatars/lana_sad.png",
    concern_line: "Hi, I’ve been breaking out lately, especially around my chin.",
    happy_line: "Wow, my skin feels so much clearer! Thank you!",
    unhappy_line: "Ugh, I think the products made it worse...",
    thanks_line: "Thanks for your help! I'll come back if it works well.",
    steps: 4,
    description: "A university student stressed by exams and mask acne.",
    case: {
      caseName: "Acne-prone",
      tooltip: "Breakouts, inflammation, and clogged pores",
      requiredIngredients: ["Salicylic acid", "Niacinamide", "Tea Tree"],
      avoidIngredients: ["Coconut oil", "Fragrance"],
      requiredProducts: ["cleanser", "toner", "serum"],
      avoidProducts: ["exfoliator", "heavy moisturizer"]
    }
  },
  {
    id: 2,
    name: "Tobias",
    avatar_url_default: "https://i.ibb.co/1JwDC6Kp/tobias.png",
    avatar_url_happy: "/avatars/tobias_happy.png",
    avatar_url_sad: "/avatars/tobias_sad.png",
    concern_line: "My face is always shiny, especially in the T-zone.",
    happy_line: "This is the best my skin has felt in months!",
    unhappy_line: "Still oily. I don’t think the routine helped.",
    thanks_line: "Fingers crossed this helps. Thanks for the advice!",
    steps: 3,
    description: "A bike messenger dealing with oily skin and urban pollution.",
    case: {
      caseName: "Oily skin",
      tooltip: "Shiny skin due to excess sebum",
      requiredIngredients: ["Clay", "Niacinamide", "Salicylic acid"],
      avoidIngredients: ["Mineral oil", "Petrolatum"],
      requiredProducts: ["cleanser", "toner", "moisturizer"],
      avoidProducts: ["heavy moisturizer", "occlusive balm"]
    }
  },
  {
    id: 3,
    name: "Mei",
    avatar_url_default: "https://i.ibb.co/yBQf1sT9/mei.png",
    avatar_url_happy: "/avatars/mei_happy.png",
    avatar_url_sad: "/avatars/mei_sad.png",
    concern_line: "My cheeks are dry and flaky, especially after cleansing.",
    happy_line: "So much better! My skin actually feels hydrated now.",
    unhappy_line: "Still dry. Maybe I need something more moisturizing?",
    thanks_line: "I appreciate the effort. Let’s see how it goes.",
    steps: 5,
    description: "A kindergarten teacher with dry skin from long days in air conditioning.",
    case: {
      caseName: "Dry skin",
      tooltip: "Flaky, tight skin lacking moisture",
      requiredIngredients: ["Hyaluronic acid", "Ceramides", "Glycerin"],
      avoidIngredients: ["Alcohol", "Benzoyl peroxide"],
      requiredProducts: ["cleanser", "moisturizer", "serum"],
    }
  }
];


export const gameProducts: GameProduct[] = [
  // --- CLEANSERS ---
  {
    id: 1,
    type: "cleanser",
    name: "ClearStart Acne Gel Cleanser",
    image_url: "/products/clearstart_cleanser.png",
    ingredients: ["Salicylic acid", "Tea Tree", "Aloe Vera"],
    tooltip: "Deeply cleanses acne-prone skin while soothing inflammation.",
  },
  {
    id: 2,
    type: "cleanser",
    name: "HydraFoam Gentle Wash",
    image_url: "/products/hydrafoam_cleanser.png",
    ingredients: ["Glycerin", "Hyaluronic acid", "Chamomile"],
    tooltip: "Mild cleanser ideal for dry or sensitive skin types.",
  },
  {
    id: 3,
    type: "cleanser",
    name: "Oil-Free Daily Cleanser",
    image_url: "/products/oilfree_cleanser.png",
    ingredients: ["Salicylic acid", "Niacinamide"],
    tooltip: "Controls oil production and clears pores without over-drying.",
  },
  {
    id: 4,
    type: "cleanser",
    name: "Milky Barrier Cleanser",
    image_url: "/products/milky_cleanser.png",
    ingredients: ["Ceramides", "Coconut oil", "Shea Butter"],
    tooltip: "Nourishing formula for extreme dryness (not for acne-prone skin).",
  },
  {
    id: 5,
    type: "cleanser",
    name: "Clarifying Gel Wash",
    image_url: "/products/clarifying_cleanser.png",
    ingredients: ["Clay", "Zinc", "Green Tea"],
    tooltip: "Cleanses oily skin and unclogs pores.",
  },

  // --- TONERS ---
  {
    id: 6,
    type: "toner",
    name: "Refreshing T-Zone Toner",
    image_url: "/products/refresh_toner.png",
    ingredients: ["Witch Hazel", "Salicylic acid", "Niacinamide"],
    tooltip: "Ideal for oily skin, especially in the T-zone.",
  },
  {
    id: 7,
    type: "toner",
    name: "Alcohol-Free Rose Toner",
    image_url: "/products/rose_toner.png",
    ingredients: ["Rose Water", "Glycerin", "Aloe Vera"],
    tooltip: "Hydrating and calming for dry or sensitive skin.",
  },
  {
    id: 8,
    type: "toner",
    name: "Balancing Pore Control Toner",
    image_url: "/products/pore_control_toner.png",
    ingredients: ["Tea Tree", "Clay", "Zinc"],
    tooltip: "Minimizes pores and controls shine for oily/acne skin.",
  },
  {
    id: 9,
    type: "toner",
    name: "Brightening AHA Toner",
    image_url: "/products/aha_toner.png",
    ingredients: ["Lactic Acid", "Glycolic Acid", "Niacinamide"],
    tooltip: "Gentle exfoliation with hydration boost.",
  },
  {
    id: 10,
    type: "toner",
    name: "Fragrance-Free Hydrating Toner",
    image_url: "/products/hydrating_toner.png",
    ingredients: ["Hyaluronic acid", "Ceramides", "Panthenol"],
    tooltip: "Hydrating toner safe for dry and sensitive skin.",
  },

  // --- SERUMS ---
  {
    id: 11,
    type: "serum",
    name: "Blemish Control Serum",
    image_url: "/products/blemish_serum.png",
    ingredients: ["Salicylic acid", "Niacinamide", "Zinc"],
    tooltip: "Targeted treatment for acne and breakouts.",
  },
  {
    id: 12,
    type: "serum",
    name: "HydraBoost Serum",
    image_url: "/products/hydraboost_serum.png",
    ingredients: ["Hyaluronic acid", "Glycerin", "Panthenol"],
    tooltip: "Delivers deep hydration for dry skin types.",
  },
  {
    id: 13,
    type: "serum",
    name: "Pore Minimizing Serum",
    image_url: "/products/poremin_serum.png",
    ingredients: ["Niacinamide", "Green Tea", "Tea Tree"],
    tooltip: "Reduces pores and oiliness for a matte finish.",
  },
  {
    id: 14,
    type: "serum",
    name: "Soothing Repair Serum",
    image_url: "/products/soothing_serum.png",
    ingredients: ["Centella Asiatica", "Ceramides", "Allantoin"],
    tooltip: "Repairs barrier damage and calms sensitive skin.",
  },
  {
    id: 15,
    type: "serum",
    name: "Clarify+ Serum",
    image_url: "/products/clarify_serum.png",
    ingredients: ["Willow Bark", "Clay", "Niacinamide"],
    tooltip: "Ideal for oily and acne-prone skin, reduces congestion.",
  },

  // --- MOISTURIZERS ---
  {
    id: 16,
    type: "moisturizer",
    name: "Matte Balance Gel Cream",
    image_url: "/products/matte_moisturizer.png",
    ingredients: ["Niacinamide", "Green Tea", "Zinc"],
    tooltip: "Controls oil while keeping skin hydrated.",
  },
  {
    id: 17,
    type: "moisturizer",
    name: "Deep Repair Moisturizer",
    image_url: "/products/deeprepair_moisturizer.png",
    ingredients: ["Ceramides", "Hyaluronic acid", "Glycerin"],
    tooltip: "Rich hydration for dry and damaged skin.",
  },
  {
    id: 18,
    type: "moisturizer",
    name: "Lightweight Daily Cream",
    image_url: "/products/lightweight_moisturizer.png",
    ingredients: ["Squalane", "Niacinamide", "Aloe Vera"],
    tooltip: "Non-comedogenic moisturizer for all skin types.",
  },
  {
    id: 19,
    type: "moisturizer",
    name: "Barrier Repair Night Cream",
    image_url: "/products/nightcream_moisturizer.png",
    ingredients: ["Ceramides", "Shea Butter", "Panthenol"],
    tooltip: "Nourishing night cream to repair the skin barrier.",
  },
  {
    id: 20,
    type: "moisturizer",
    name: "Anti-Shine Moisturizer",
    image_url: "/products/shinefree_moisturizer.png",
    ingredients: ["Clay", "Niacinamide", "Tea Tree"],
    tooltip: "Best for oily skin needing hydration without grease.",
  },

  // --- EXFOLIATORS ---
  {
    id: 21,
    type: "exfoliator",
    name: "Gentle Enzyme Peel",
    image_url: "/products/enzyme_peel.png",
    ingredients: ["Papaya Enzymes", "Lactic Acid", "Glycerin"],
    tooltip: "Non-abrasive exfoliation for dry or sensitive skin.",
  },
  {
    id: 22,
    type: "exfoliator",
    name: "Pore Clearing Scrub",
    image_url: "/products/pore_scrub.png",
    ingredients: ["Salicylic acid", "Walnut Shell", "Menthol"],
    tooltip: "Physically and chemically clears out pores.",
  },
  {
    id: 23,
    type: "exfoliator",
    name: "AHA Exfoliating Gel",
    image_url: "/products/aha_exfoliator.png",
    ingredients: ["Glycolic Acid", "Niacinamide", "Panthenol"],
    tooltip: "Smooths skin texture and improves glow.",
  },
  {
    id: 24,
    type: "exfoliator",
    name: "Charcoal Detox Exfoliant",
    image_url: "/products/charcoal_exfoliator.png",
    ingredients: ["Charcoal", "Clay", "Salicylic acid"],
    tooltip: "Ideal for oily and acne-prone skin.",
  },
  {
    id: 25,
    type: "exfoliator",
    name: "Brightening Scrub Mask",
    image_url: "/products/bright_scrub.png",
    ingredients: ["Vitamin C", "Niacinamide", "Rice Powder"],
    tooltip: "2-in-1 mask and scrub for dull skin.",
  },
];

export const skinCases: SkinCase[] = [
  {
    caseName: "Acne-prone",
    tooltip: "Skin with frequent breakouts, inflammation, and oiliness.",
    requiredIngredients: ["Salicylic Acid", "Niacinamide", "Tea Tree Oil"],
    avoidIngredients: ["Coconut Oil", "Lanolin"],
    requiredProducts: ["Cleanser", "Toner"],
    avoidProducts: ["Heavy Creams", "Oil Serums"],
  },
  {
    caseName: "Dry Skin",
    tooltip: "Skin that feels tight, flaky, or rough due to lack of moisture.",
    requiredIngredients: ["Hyaluronic Acid", "Ceramides", "Shea Butter"],
    avoidIngredients: ["Alcohol", "Fragrance"],
    requiredProducts: ["Moisturizer", "Hydrating Serum"],
    avoidProducts: ["Exfoliators", "Clay Masks"],
  },
  {
    caseName: "Sensitive Skin",
    tooltip: "Skin that is easily irritated, red, or reactive to products.",
    requiredIngredients: ["Centella Asiatica", "Aloe Vera", "Panthenol"],
    avoidIngredients: ["Essential Oils", "Alcohol"],
    requiredProducts: ["Soothing Toner", "Barrier Cream"],
    avoidProducts: ["Scrubs", "Strong Acids"],
  }
];

export const masks: Mask[] = [
  {
    id: 1,
    name: "Clarifying Tea Tree Mask",
    ingredients: ["kaolin-clay", "tea-tree-oil", "niacinamide"],
    case: skinCases[0],
    tooltip: "Best for oily and acne-prone skin. Reduces inflammation and clears pores."
  },
  {
    id: 2,
    name: "Hydra Boost Mask",
    ingredients: ["hyaluronic-acid", "ceramides", "shea-butter"],
    case: skinCases[1],
    tooltip: "Deeply hydrates and restores moisture for dry, flaky skin."
  },
  {
    id: 3,
    name: "Soothing Aloe Mask",
    ingredients: ["aloe-vera", "panthenol", "centella-asiatica"],
    case: skinCases[2],
    tooltip: "Gentle formula to calm irritation and strengthen the skin barrier."
  },
  {
    id: 4,
    name: "Pore Purifying Charcoal Mask",
    ingredients: ["charcoal", "niacinamide", "green-tea-extract"],
    case: skinCases[0],
    tooltip: "Detoxifies pores and reduces excess oil, perfect for acne-prone skin."
  },
  {
    id: 5,
    name: "Nourishing Honey Mask",
    ingredients: ["honey", "propolis", "glycerin"],
    case: skinCases[1],
    tooltip: "Nourishes and soothes dry, irritated skin with natural humectants."
  }
];


export const gameMaskIngredients: MaskIngredient[] = [
  {
    id: "water",
    name: "Water",
    tooltip: "The most common solvent in skincare, helps dissolve other ingredients and hydrate skin.",
  },
  {
    id: "kaolin-clay",
    name: "Kaolin Clay",
    tooltip: "Gentle clay that helps absorb oil and cleanse pores.",
  },
  {
    id: "tea-tree-oil",
    name: "Tea Tree Oil",
    tooltip: "Essential oil known for its antibacterial and anti-inflammatory properties.",
  },
  {
    id: "niacinamide",
    name: "Niacinamide",
    tooltip: "Vitamin B3 that helps brighten skin and regulate sebum.",
  },
  {
    id: "hyaluronic-acid",
    name: "Hyaluronic Acid",
    tooltip: "Powerful humectant that attracts moisture into the skin.",
  },
  {
    id: "ceramides",
    name: "Ceramides",
    tooltip: "Lipids that restore and maintain the skin barrier."
  },
  {
    id: "shea-butter",
    name: "Shea Butter",
    tooltip: "Rich natural fat that deeply moisturizes and softens skin.",
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    tooltip: "Cooling plant extract that calms irritated skin.",
  },
  {
    id: "panthenol",
    name: "Panthenol",
    tooltip: "Pro-vitamin B5 that promotes healing and hydration.",
  },
  {
    id: "centella-asiatica",
    name: "Centella Asiatica",
    tooltip: "Botanical extract known for its skin-soothing and wound-healing properties.",

  },
  {
    id: "charcoal",
    name: "Charcoal",
    tooltip: "Activated charcoal that draws out impurities from pores.",

  },
  {
    id: "green-tea-extract",
    name: "Green Tea Extract",
    tooltip: "Rich in antioxidants and helps calm redness and irritation.",

  },
  {
    id: "honey",
    name: "Honey",
    tooltip: "Natural humectant with antibacterial and healing properties.",

  },
  {
    id: "propolis",
    name: "Propolis",
    tooltip: "Bee resin extract with anti-inflammatory and healing benefits.",

  },
  {
    id: "glycerin",
    name: "Glycerin",
    tooltip: "Common humectant that draws moisture into the skin.",

  }
];
