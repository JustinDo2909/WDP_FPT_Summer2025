import { Section, Column, Row, RText } from "@/lib/by/Div";
import { CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function HowToUseDetailContent({ post }: { post: IPostData }) {
  return (
    <Column className="flex-col flex gap-8">
      {/* Introduction */}
      <Section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <Column className="flex-col flex gap-4">
          <RText className="text-xl sm:text-2xl font-bold text-gray-900">
            Introduction
          </RText>
          <RText className="text-gray-700 leading-relaxed text-base sm:text-lg">
            {post.description}
          </RText>
        </Column>
      </Section>

      {/* Benefits */}
      <Section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <Column className="flex-col flex gap-4">
          <RText className="text-xl font-bold text-gray-900">
            Key Benefits
          </RText>
          <Row className="flex flex-wrap gap-3">
            {post.benefits?.map((benefit: string, index: number) => (
              <Row key={index} className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <RText className="text-sm text-green-800 font-medium">
                  {benefit}
                </RText>
              </Row>
            ))}
          </Row>
        </Column>
      </Section>

      {/* Step-by-Step Guide */}
      <Section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <Column className="flex-col flex gap-6">
          <RText className="text-xl font-bold text-gray-900">
            Step-by-Step Application Guide
          </RText>

          <Column className="flex-col flex gap-8">
            {post.postSteps?.map((step: IPostStep, index: number) => (
              <Column key={step.id} className="flex-col flex gap-4">
                {/* Step Header */}
                <Row className="flex items-center gap-4">
                  <Section className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <RText className="font-bold text-sm">{index + 1}</RText>
                  </Section>
                  <Column className="flex-1">
                    <RText className="font-bold text-lg text-gray-900">
                      {step.title}
                    </RText>
                    <RText className="text-pink-600 font-medium">
                      {step.description}
                    </RText>
                  </Column>
                </Row>

                {/* Step Content */}
                <Row className="flex gap-6 flex-col sm:flex-row">
                  {/* Step Image */}
                  <Section className="w-full sm:w-40 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image 
                      fill
                      src={step?.image_url} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </Section>

                  {/* Step Details */}
                  <Column className="flex-col flex flex-1 gap-4">
                    <RText className="text-gray-700 leading-relaxed">
                      {step.details}
                    </RText>

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <Section className="bg-blue-50 p-4 rounded-lg">
                        <Row className="flex items-start gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <RText className="font-medium text-blue-900 text-sm">
                            Pro Tips:
                          </RText>
                        </Row>
                        <Column className="flex-col flex gap-1 ml-6">
                          {step.tips.map((tip: string, tipIndex: number) => (
                            <Row
                              key={tipIndex}
                              className="flex items-start gap-2"
                            >
                              <Section className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></Section>
                              <RText className="text-sm text-blue-800">
                                {tip}
                              </RText>
                            </Row>
                          ))}
                        </Column>
                      </Section>
                    )}
                  </Column>
                </Row>

                {/* Divider (except for last step) */}
                {index < post.postSteps.length - 1 && (
                  <Section className="h-px bg-gray-200 my-2"></Section>
                )}
              </Column>
            ))}
          </Column>
        </Column>
      </Section>

      {/* Warnings */}
      <Section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <Column className="flex-col flex gap-4">
          <Row className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <RText className="text-xl font-bold text-gray-900">
              Important Warnings
            </RText>
          </Row>
          <Column className="flex-col flex gap-2">
            {post.warnings?.map((warning: string, index: number) => (
              <Row key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <Section className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></Section>
                <RText className="text-amber-800 text-sm font-medium">
                  {warning}
                </RText>
              </Row>
            ))}
          </Column>
        </Column>
      </Section>
    </Column>
  );
}
