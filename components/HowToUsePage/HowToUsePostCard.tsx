import { Card, Row, RText, Section, Column } from "@/lib/by/Div";
import Image from "next/image";

export default function HowToUsePostCard({ post }: { post: IPostData }) {
  return (
    <Card className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 w-full">
      {/* Thumbnail Image */}
      <Section className="relative h-48 sm:h-44 md:h-40 lg:h-48 overflow-hidden">
        <Image
          fill 
          src={post.thumbnail_url} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {/* <Section className="absolute top-3 right-3">
          <RText className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium">
            {post.title}
          </RText>
        </Section> */}
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
        {/* <Row className="flex items-center gap-3">
          <Section className="w-8 h-8 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center flex-shrink-0">
            {post.avatar ? (
              <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-pink-600" />
            )}
          </Section>
          <Column className="flex flex-col flex-1 min-w-0">
            <RText className="text-sm font-medium text-gray-700 truncate">{post.author}</RText>
            <RText className="text-xs text-gray-500">{post.time}</RText>
          </Column>
        </Row> */}

        {/* Content Steps */}
        <Section>
          <Column className="flex flex-col gap-2">
            {post.postSteps.slice(0, 3).map((step: IPostStep, idx: number) => (
              <Row key={idx} className="flex items-start gap-2">
                <Section className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></Section>
                <RText className="text-sm text-gray-700 flex-1">{step.title}</RText>
              </Row>
            ))}
            {post.postSteps.length > 3 && (
              <RText className="text-sm text-pink-600 font-medium mt-1">
                +{post.postSteps.length - 3} more steps...
              </RText>
            )}
          </Column>
        </Section>

        {/* Divider */}
        <Section className="h-px bg-gray-200"></Section>

        {/* Interaction Bar */}
        
      </Column>
    </Card>
  );
}