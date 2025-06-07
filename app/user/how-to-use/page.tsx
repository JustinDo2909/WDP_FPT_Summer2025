import { Core, Container, Card, Row, Column, RText, Wrap, Section } from "@/lib/by/Div";
import HowToUsePostCard from "@/components/HowToUsePage/HowToUsePostCard";
import HowToUseSearchBar from "@/components/HowToUsePage/HowToUseSearchBar";
import HowToUsePostInput from "@/components/HowToUsePage/HowToUsePostInput";

// Dummy data for posts
const posts = [
  {
    id: 1,
    author: "Nguyen Duc Min",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Duc+Min&background=E9D5EC&color=7C3AED",
    time: "2 hours ago",
    title: "Is Your Skincare Routine Doing More Harm Than Good? 5 Common Mistakes to Avoid",
    content: [
      "Over-cleansing or using harsh scrubs",
      "Skipping sunscreen indoors",
      "Mixing incompatible ingredients (e.g., vitamin C + retinol)",
      "Overloading products (10-step routines aren’t for everyone)",
      "Not patch-testing new products",
      "CTA: “Tag someone who needs to see this!”"
    ],
    liked: true,
    likes: 12,
    comments: 3,
    shares: 2,
    saved: false
  },
  // ...more posts
];

export default function HowToUsePage() {
  return (
    <Core className="min-h-screen bg-white py-8">
      <Container className="max-w-2xl mx-auto">
        <Row className="justify-between items-center mb-6 gap-4">
          <HowToUsePostInput />
          <HowToUseSearchBar />
        </Row>
        <Column className="gap-8">
          {posts.map(post => (
            <HowToUsePostCard key={post.id} post={post} />
          ))}
        </Column>
      </Container>
    </Core>
  );
}
