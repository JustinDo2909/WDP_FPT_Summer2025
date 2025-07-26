import { Section, Column, Row, RText } from "@/lib/by/Div";
import { Heart, MessageCircle, Share2, Bookmark, Tag } from "lucide-react";

export default function HowToUseDetailSidebar({ post }: { post: any }) {
  return (
    <Column className="flex-col flex gap-6">
      {/* Engagement Stats */}
      <Section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 top-6">
        <Column className="flex-col flex gap-4">
          <RText className="font-bold text-lg text-gray-900">Engagement</RText>

          <Column className="flex-col flex gap-3">
            <Row className="flex justify-between items-center">
              <Row className="flex items-center gap-2">
                <Heart
                  className={`w-5 h-5 ${post.liked ? "text-red-500 fill-current" : "text-gray-400"}`}
                />
                <RText className="text-gray-700">Likes</RText>
              </Row>
              <RText className="font-semibold text-gray-900">
                {post.likes}
              </RText>
            </Row>

            <Row className="flex justify-between items-center">
              <Row className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <RText className="text-gray-700">Comments</RText>
              </Row>
              <RText className="font-semibold text-gray-900">
                {post.comments}
              </RText>
            </Row>

            <Row className="flex justify-between items-center">
              <Row className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-gray-400" />
                <RText className="text-gray-700">Shares</RText>
              </Row>
              <RText className="font-semibold text-gray-900">
                {post.shares}
              </RText>
            </Row>

            <Row className="flex justify-between items-center">
              <Row className="flex items-center gap-2">
                <Bookmark
                  className={`w-5 h-5 ${post.saved ? "text-pink-600 fill-current" : "text-gray-400"}`}
                />
                <RText className="text-gray-700">Saves</RText>
              </Row>
              <RText className="font-semibold text-gray-900">
                {post.saves}
              </RText>
            </Row>
          </Column>

          {/* Action Buttons */}
          <Section className="h-px bg-gray-200 my-2"></Section>

          <Column className="flex-col flex gap-2">
            <Row
              className={`flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                post.liked
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`}
              />
              <RText className="font-medium">
                {post.liked ? "Liked" : "Like"}
              </RText>
            </Row>

            <Row
              className={`flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                post.saved
                  ? "bg-pink-50 text-pink-600"
                  : "bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${post.saved ? "fill-current" : ""}`}
              />
              <RText className="font-medium">
                {post.saved ? "Saved" : "Save"}
              </RText>
            </Row>

            <Row className="flex items-center justify-center gap-2 p-3 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors">
              <Share2 className="w-5 h-5" />
              <RText className="font-medium">Share</RText>
            </Row>
          </Column>
        </Column>
      </Section>

      {/* Tags */}
      <Section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <Column className="flex-col flex gap-4">
          <Row className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <RText className="font-bold text-lg text-gray-900">Tags</RText>
          </Row>

          <Row className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <RText
                key={tag}
                className="bg-gray-100 hover:bg-pink-100 text-gray-700 hover:text-pink-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
              >
                #{tag}
              </RText>
            ))}
          </Row>
        </Column>
      </Section>

      {/* Table of Contents */}
    </Column>
  );
}
