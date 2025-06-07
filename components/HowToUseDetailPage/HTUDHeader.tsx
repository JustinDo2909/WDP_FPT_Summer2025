import { Row, RText, Section, Column } from "@/lib/by/Div";
import { ArrowLeft, Clock, User, Star } from "lucide-react";

export default function HowToUseDetailHeader({ post }: { post: any }) {
  return (
    <Column className="flex-col flex gap-6">
      {/* Navigation */}
      <Row className="flex items-center gap-3 text-gray-600">
        <Row className="flex items-center gap-2 cursor-pointer hover:text-pink-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <RText className="text-sm font-medium">Back to Guides</RText>
        </Row>
        <RText className="text-gray-400">•</RText>
        <RText className="text-sm">{post.category}</RText>
      </Row>

      {/* Hero Image */}
      <Section className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-200">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <Section className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></Section>
        <Section className="absolute bottom-6 left-6 right-6">
          <Row className="flex justify-between items-end">
            <Column className="flex-col flex gap-2 flex-1">
              <RText className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {post.title}
              </RText>
              <Row className="flex gap-4 items-center text-white/90 text-sm">
                <Row className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <RText>{post.readTime}</RText>
                </Row>
                <Row className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <RText>{post.difficulty}</RText>
                </Row>
              </Row>
            </Column>
          </Row>
        </Section>
      </Section>

      {/* Author & Meta Info */}
      <Row className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
        <Row className="flex items-center gap-4">
          <Section className="w-12 h-12 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center flex-shrink-0">
            {post.avatar ? (
              <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-pink-600" />
            )}
          </Section>
          <Column className="gap-1">
            <RText className="font-semibold text-gray-900">{post.author}</RText>
            <RText className="text-sm text-gray-600">{post.time}</RText>
          </Column>
        </Row>

        {/* Tags */}
        <Row className="flex gap-2 flex-wrap">
          {post.skinTypes.map((type: string) => (
            <RText key={type} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
              {type} Skin
            </RText>
          ))}
        </Row>
      </Row>
    </Column>
  );
}