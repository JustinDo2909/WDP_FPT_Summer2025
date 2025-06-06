import { Core, Container, Card, Row, RText, Section } from "@/lib/by/Div";

export default function HowToUseArticlePage({ params }: { params: { slug: string } }) {
  // Dummy data for placeholder
  const article = {
    title: "How to Use Our Platform for the Best Skincare Results",
    author: "Nguyen Duc Min",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Duc+Min&background=E9D5EC&color=7C3AED",
    time: "2 hours ago",
    thumbnail: "https://placehold.co/800x320/E9D5EC/7C3AED?text=How+To+Use+Thumbnail",
    content: [
      "Welcome to our skincare community! This guide will help you get the most out of our platform.",
      "1. Create an account and set up your profile.",
      "2. Browse and search for skincare tips using the search bar above.",
      "3. Share your own experiences or ask questions using the post input.",
      "4. Engage with others by commenting, liking, and saving posts.",
      "5. Follow your favorite authors for more personalized content.",
      "Happy glowing!"
    ]
  };

  return (
    <Core className="min-h-screen bg-white py-8">
      <Container className="max-w-2xl mx-auto">
        <Card className="shadow-none border-none p-0">
          <img src={article.thumbnail} alt="Article thumbnail" className="w-full h-64 object-cover rounded-xl mb-6" />
          <Row className="items-center gap-3 mb-4">
            <img src={article.avatar} alt={article.author} className="w-10 h-10 rounded-full bg-pink-200" />
            <RText className="font-bold text-lg">{article.author}</RText>
            <RText className="text-gray-400 text-sm ml-2">{article.time}</RText>
          </Row>
          <Section className="mb-6">
            <RText className="font-bold text-3xl mb-2 leading-tight">{article.title}</RText>
          </Section>
          <Section className="prose prose-lg max-w-none">
            {article.content.map((line, idx) => (
              <RText key={idx} className="mb-4 text-lg text-gray-800">{line}</RText>
            ))}
          </Section>
        </Card>
      </Container>
    </Core>
  );
}
