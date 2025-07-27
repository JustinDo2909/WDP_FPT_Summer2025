import { Section, Column, Row, RText } from "@/lib/by/Div";
import { Tag, } from "lucide-react";

export default function HowToUseDetailSidebar() {
  return (
    <Column className="flex-col flex gap-6">
      {/* Engagement Stats */}
      <Section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 top-6">
        <Column className="flex-col flex gap-4">
          <RText className="font-bold text-lg text-gray-900">Engagement</RText>
          
  
          {/* Action Buttons */}
          <Section className="h-px bg-gray-200 my-2"></Section>
        
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
            
          </Row>
        </Column>
      </Section>

      {/* Table of Contents */}
    </Column>
  );
}