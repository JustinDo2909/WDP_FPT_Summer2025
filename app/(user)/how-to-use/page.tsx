import { Core, Container, Row, Column, RText, Section } from "@/lib/by/Div";
import HowToUsePostCard from "@/components/HowToUsePage/HowToUsePostCard";
import HowToUseSearchBar from "@/components/HowToUsePage/HowToUseSearchBar";
import Link from "next/link";

// Enhanced dummy data for skincare product guides
const posts = [
  {
    id: 1,
    author: "Dr. Sarah Chen",
    avatar:
      "https://ui-avatars.com/api/?name=Dr+Sarah+Chen&background=F3E8FF&color=7C3AED",
    time: "2 hours ago",
    title: "Complete Guide: How to Apply CeraVe Moisturizing Cream",
    thumbnail:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop",
    content: [
      "Start with clean, slightly damp skin for better absorption",
      "Use a coin-sized amount for face, more for body application",
      "Apply in upward circular motions, avoiding the eye area",
      "Allow 2-3 minutes to fully absorb before applying makeup",
      "Use twice daily - morning and evening for best results",
    ],
    liked: true,
    likes: 24,
    comments: 8,
    shares: 5,
    saved: false,
    category: "Moisturizer",
  },
  {
    id: 2,
    author: "Emma Rodriguez",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=FCE7F3&color=BE185D",
    time: "4 hours ago",
    title: "The Right Way to Use Niacinamide Serum for Beginners",
    thumbnail:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=200&fit=crop",
    content: [
      "Always apply to clean skin after cleansing",
      "Start with 2-3 drops, gradually increase if needed",
      "Pat gently into skin, don't rub vigorously",
      "Wait 10 minutes before applying moisturizer",
      "Can be used morning and night safely",
    ],
    liked: false,
    likes: 18,
    comments: 12,
    shares: 3,
    saved: true,
    category: "Serum",
  },
  {
    id: 3,
    author: "Marcus Kim",
    avatar:
      "https://ui-avatars.com/api/?name=Marcus+Kim&background=EDE9FE&color=8B5CF6",
    time: "6 hours ago",
    title: "Sunscreen Application: Common Mistakes That Reduce Protection",
    thumbnail:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop",
    content: [
      "Apply 1/4 teaspoon for face and neck coverage",
      "Wait 15 minutes before sun exposure",
      "Reapply every 2 hours, even if indoors near windows",
      "Don't forget ears, neck, and around hairline",
      "Layer over moisturizer, under makeup",
    ],
    liked: true,
    likes: 31,
    comments: 15,
    shares: 9,
    saved: false,
    category: "Sunscreen",
  },
  {
    id: 4,
    author: "Lisa Thompson",
    avatar:
      "https://ui-avatars.com/api/?name=Lisa+Thompson&background=FDF2F8&color=EC4899",
    time: "8 hours ago",
    title: "Retinol for Beginners: How to Start Without Irritation",
    thumbnail:
      "https://images.unsplash.com/photo-1556228591-08ae302de1d0?w=300&h=200&fit=crop",
    content: [
      "Start with lowest concentration (0.25% or 0.5%)",
      "Use only at night, never during daytime",
      "Begin with once weekly, gradually increase frequency",
      "Always follow with a good moisturizer",
      "Never mix with vitamin C or AHA/BHA acids",
    ],
    liked: false,
    likes: 42,
    comments: 23,
    shares: 11,
    saved: true,
    category: "Treatment",
  },
  {
    id: 5,
    author: "Dr. James Park",
    avatar:
      "https://ui-avatars.com/api/?name=Dr+James+Park&background=F5F3FF&color=7C3AED",
    time: "12 hours ago",
    title: "Gentle Cleanser Technique: Protecting Your Skin Barrier",
    thumbnail:
      "https://images.unsplash.com/photo-1556228852-80de0ce30b4b?w=300&h=200&fit=crop",
    content: [
      "Use lukewarm water, never hot or cold",
      "Massage gently for 30-60 seconds maximum",
      "Rinse thoroughly to remove all product residue",
      "Pat dry with clean towel, don't rub harshly",
      "Follow immediately with toner or serum",
    ],
    liked: true,
    likes: 19,
    comments: 7,
    shares: 4,
    saved: false,
    category: "Cleanser",
  },
  {
    id: 6,
    author: "Michelle Wong",
    avatar:
      "https://ui-avatars.com/api/?name=Michelle+Wong&background=FCEDF2&color=BE185D",
    time: "1 day ago",
    title: "Hyaluronic Acid Serum: Maximizing Hydration Benefits",
    thumbnail:
      "https://images.unsplash.com/photo-1556228720-da4e85b59fcd?w=300&h=200&fit=crop",
    content: [
      "Apply to damp skin for better water retention",
      "Use 2-3 drops, spread evenly across face",
      "Follow with a heavier moisturizer to seal in hydration",
      "Safe to use twice daily with all skin types",
      "Works well layered under other serums",
    ],
    liked: false,
    likes: 26,
    comments: 14,
    shares: 6,
    saved: true,
    category: "Serum",
  },
];

export default function HowToUsePage() {
  return (
    <Core className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <Column className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Skincare Product Usage Guide
          </h1>
          <RText className="text-base sm:text-lg text-gray-600 mx-auto px-4">
            Learn the proper techniques and application methods for your
            favorite skincare products
          </RText>
        </Column>

        {/* Search and Input Section */}
        <Row className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 sm:mb-12 gap-4 sm:gap-6">
          <HowToUseSearchBar />
        </Row>

        {/* Posts Grid - 3 Columns */}
        <Section className="bg-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8">
          <Row className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
            {posts.map((post) => (
              <Section
                key={post.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] min-w-0"
              >
                <Link href={`/how-to-use/${post.id}`}>
                  <HowToUsePostCard post={post} />
                </Link>
              </Section>
            ))}
          </Row>
        </Section>
      </Container>
    </Core>
  );
}
