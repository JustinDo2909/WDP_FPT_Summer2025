import { Row, RText, Section, Column } from "@/lib/by/Div";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HowToUseDetailHeader({ post }: { post: IPostData }) {
  return (
    <Column className="flex-col flex gap-6">
      {/* Navigation */}
      <Row className="flex items-center gap-3 text-gray-600">
        <Row className="flex items-center gap-2 cursor-pointer hover:text-pink-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <Link className="text-sm font-medium" href={"/how-to-use"}>Back to Guides</Link>
        </Row>
        <RText className="text-gray-400">•</RText>
        <RText className="text-sm">{post?.title?.split(" ")[0]}</RText>
      </Row>

      {/* Hero Image */}
      <Section className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-200">
        <Image 
          fill
          src={post?.thumbnail_url} 
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
            </Column>
          </Row>
        </Section>
      </Section>      
    </Column>
  );
}