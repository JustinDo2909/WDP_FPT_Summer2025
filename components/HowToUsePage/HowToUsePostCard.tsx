import { Card, Column, Row, RText, Section } from "@/lib/by/Div";
import { Bookmark, Heart, MessageCircle, Share2, User } from "lucide-react";

export default function HowToUsePostCard({ post }: { post: any }) {
  return (
    <Card className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 w-full">
      {/* Thumbnail Image */}
      <Section className="relative h-48 sm:h-44 md:h-40 lg:h-48 overflow-hidden">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <Section className="absolute top-3 right-3">
          <RText className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium">
            {post.category}
          </RText>
        </Section>
      </Section>

      {/* Card Content */}
      <Column className="flex flex-col p-4 sm:p-5 md:p-4 lg:p-6 gap-4">
        {/* Title - Main Focus */}
        <Section>
          <RText className="font-bold text-lg sm:text-xl text-gray-900 leading-tight">
            {post.title}
          </RText>
        </Section>

        {/* Author Info - Subtle */}
        <Row className="flex items-center gap-3">
          <Section className="w-8 h-8 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center flex-shrink-0">
            {post.avatar ? (
              <img
                src={post.avatar}
                alt={post.author}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-pink-600" />
            )}
          </Section>
          <Column className="flex flex-col flex-1 min-w-0">
            <RText className="text-sm font-medium text-gray-700 truncate">
              {post.author}
            </RText>
            <RText className="text-xs text-gray-500">{post.time}</RText>
          </Column>
        </Row>

        {/* Content Steps */}
        <Section>
          <Column className="flex flex-col gap-2">
            {post.content.slice(0, 3).map((line: string, idx: number) => (
              <Row key={idx} className="flex items-start gap-2">
                <Section className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></Section>
                <RText className="text-sm text-gray-700 flex-1">{line}</RText>
              </Row>
            ))}
            {post.content.length > 3 && (
              <RText className="text-sm text-pink-600 font-medium mt-1">
                +{post.content.length - 3} more steps...
              </RText>
            )}
          </Column>
        </Section>

        {/* Divider */}
        <Section className="h-px bg-gray-200"></Section>

        {/* Interaction Bar */}
        <Row className="flex justify-between items-center">
          {/* Engagement Stats */}
          <Row className="flex gap-3 sm:gap-4 items-center text-sm text-gray-600">
            <Row className="flex items-center gap-1">
              <Heart
                className={`w-4 h-4 ${post.liked ? "text-red-500 fill-current" : "text-gray-500"}`}
              />
              <RText className="text-xs sm:text-sm">{post.likes}</RText>
            </Row>
            <Row className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <RText className="text-xs sm:text-sm">{post.comments}</RText>
            </Row>
            <Row className="flex items-center gap-1">
              <Share2 className="w-4 h-4 text-gray-500" />
              <RText className="text-xs sm:text-sm">{post.shares}</RText>
            </Row>
          </Row>

          {/* Action Button */}
          <Bookmark
            className={`w-5 h-5 cursor-pointer transition-colors ${
              post.saved
                ? "text-pink-600 fill-current"
                : "text-gray-400 hover:text-pink-600"
            }`}
          />
        </Row>
      </Column>
    </Card>
  );
}
