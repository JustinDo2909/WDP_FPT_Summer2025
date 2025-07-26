import HowToUseDetailContent from "@/components/HowToUseDetailPage/HTUDContent";
import HowToUseDetailHeader from "@/components/HowToUseDetailPage/HTUDHeader";
import HowToUseDetailSidebar from "@/components/HowToUseDetailPage/HTUDSidebar";
import { Core, Container, Row, Column } from "@/lib/by/Div";

// Mock data - in real app this would come from API/database based on [id]
const postData = {
  id: 1,
  author: "Dr. Sarah Chen",
  avatar:
    "https://ui-avatars.com/api/?name=Dr+Sarah+Chen&background=F3E8FF&color=7C3AED",
  time: "2 hours ago",
  readTime: "5 min read",
  title: "Complete Guide: How to Apply CeraVe Moisturizing Cream",
  thumbnail:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=400&fit=crop",
  category: "Moisturizer",
  difficulty: "Beginner",
  skinTypes: ["Dry", "Sensitive", "Normal"],
  tags: ["moisturizer", "cerave", "skincare routine", "hydration"],
  likes: 124,
  comments: 28,
  shares: 15,
  saves: 89,
  liked: true,
  saved: false,
  introduction:
    "CeraVe Moisturizing Cream is a dermatologist-recommended moisturizer that provides long-lasting hydration for dry to very dry skin. This comprehensive guide will walk you through the proper application technique to maximize its benefits and ensure optimal skin health.",
  steps: [
    {
      id: 1,
      title: "Prepare Your Skin",
      description: "Start with clean, slightly damp skin for better absorption",
      details:
        "Cleanse your face with a gentle cleanser and pat dry with a clean towel, leaving skin slightly damp. This helps lock in moisture and improves the cream's absorption.",
      tips: [
        "Use lukewarm water, not hot",
        "Pat, don't rub your skin dry",
        "Apply within 3 minutes of cleansing",
      ],
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Dispense Proper Amount",
      description:
        "Use a coin-sized amount for face, more for body application",
      details:
        "For facial application, a dime-sized amount is typically sufficient. For body application, use approximately a teaspoon per limb.",
      tips: [
        "Start with less - you can always add more",
        "Warm the product between your palms first",
        "Use more in winter, less in summer",
      ],
      image:
        "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Apply Using Gentle Motions",
      description: "Apply in upward circular motions, avoiding the eye area",
      details:
        "Using your fingertips, gently massage the cream into your skin using upward circular motions. Start from the center of your face and work outward.",
      tips: [
        "Be extra gentle around delicate areas",
        "Avoid pulling or stretching skin",
        "Don't forget your neck and décolletage",
      ],
      image:
        "https://images.unsplash.com/photo-1556228591-08ae302de1d0?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Allow Proper Absorption",
      description: "Allow 2-3 minutes to fully absorb before applying makeup",
      details:
        "Give the moisturizer time to fully absorb into your skin before applying any additional products or makeup. This ensures maximum hydration benefits.",
      tips: [
        "Don't rush this step",
        "Use this time for your morning routine",
        "Check for any missed spots",
      ],
      image:
        "https://images.unsplash.com/photo-1556228852-80de0ce30b4b?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Maintain Consistency",
      description: "Use twice daily - morning and evening for best results",
      details:
        "Consistency is key for maintaining healthy, hydrated skin. Apply every morning and evening as part of your skincare routine.",
      tips: [
        "Set reminders if needed",
        "Keep it visible in your bathroom",
        "Track your progress",
      ],
      image:
        "https://images.unsplash.com/photo-1556228720-da4e85b59fcd?w=400&h=300&fit=crop",
    },
  ],
  warnings: [
    "Discontinue use if irritation occurs",
    "Avoid contact with eyes",
    "For external use only",
    "Patch test before first use",
  ],
  benefits: [
    "24-hour hydration",
    "Restores skin barrier",
    "Non-comedogenic formula",
    "Suitable for sensitive skin",
  ],
};

const relatedPosts = [
  {
    id: 2,
    title: "The Right Way to Use Niacinamide Serum",
    thumbnail:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=200&fit=crop",
    category: "Serum",
    readTime: "4 min",
  },
  {
    id: 3,
    title: "Sunscreen Application: Common Mistakes",
    thumbnail:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop",
    category: "Sunscreen",
    readTime: "6 min",
  },
  {
    id: 4,
    title: "Retinol for Beginners Guide",
    thumbnail:
      "https://images.unsplash.com/photo-1556228591-08ae302de1d0?w=300&h=200&fit=crop",
    category: "Treatment",
    readTime: "8 min",
  },
];

export default function HowToUseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Core className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <HowToUseDetailHeader post={postData} />

        {/* Main Content Layout */}
        <Row className="flex flex-col lg:flex-row  gap-6 lg:gap-8 mt-8 lg:mt-12">
          {/* Main Content */}
          <Column className=" flex-col w-full lg:w-80 flex-shrink-0">
            <HowToUseDetailSidebar post={postData} />
          </Column>
          <Column className=" flex-col flex-1 min-w-0">
            <HowToUseDetailContent post={postData} />
          </Column>
          {/* Sidebar */}
        </Row>

        {/* Related Posts */}
        {/* <HowToUseRelatedPosts posts={relatedPosts} /> */}
      </Container>
    </Core>
  );
}
