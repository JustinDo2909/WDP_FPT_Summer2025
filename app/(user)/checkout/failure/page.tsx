import { Core, Container, Area, Section, Card, Row, RText } from "@/lib/by/Div";
import Link from "next/link";

export default function CheckoutFailed() {
  return (
    <Core className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 px-4">
      <Container className="max-w-3xl w-full">
        <Area className="flex flex-col items-center gap-8 py-16">
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 lg:p-16 flex flex-col items-center border border-red-100 relative overflow-hidden w-full max-w-2xl mx-auto">
            {/* Decorative elements */}
            <Section className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-orange-400 to-pink-400"></Section>
            <Section className="absolute -top-4 -right-4 w-16 h-16 bg-red-200 rounded-full opacity-30"></Section>
            <Section className="absolute -bottom-6 -left-6 w-20 h-20 bg-orange-200 rounded-full opacity-20"></Section>

            {/* Failed Icon */}
            <Section className="mb-6 relative">
              <Section className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <RText className="text-5xl text-white font-bold">✕</RText>
              </Section>
            </Section>

            {/* Main Heading */}
            <Section className="mb-4 text-center">
              <RText className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Payment Failed
              </RText>
              <RText className="text-lg text-red-600 font-medium">
                Oops! Something went wrong
              </RText>
            </Section>

            {/* Failed Message */}
            <RText className="text-gray-700 text-center mb-8 leading-relaxed max-w-md">
              Don't worry! Your beauty items are still waiting for you. Let's
              try completing your purchase again - your glow-up is just one
              click away! ✨
            </RText>

            {/* Possible Issues */}
            <Section className="w-full bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8 border border-red-100">
              <RText className="text-sm font-semibold text-red-700 mb-3 text-center">
                Common Issues:
              </RText>
              <Row className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                <Section className="flex items-center gap-2 flex-1">
                  <RText className="text-red-500">💳</RText>
                  <RText>Card Declined</RText>
                </Section>
                <Section className="flex items-center gap-2 flex-1">
                  <RText className="text-orange-500">🌐</RText>
                  <RText>Connection Issue</RText>
                </Section>
                <Section className="flex items-center gap-2 flex-1">
                  <RText className="text-pink-500">⏰</RText>
                  <RText>Session Expired</RText>
                </Section>
              </Row>
            </Section>

            {/* Action Buttons */}
            <Row className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
              <Link href="/checkout" className="flex-1">
                <RText className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
                  Try Again
                </RText>
              </Link>
              <Link href="/checkout/cart" className="flex-1">
                <RText className="w-full px-6 py-3 bg-white border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold text-center hover:border-red-400 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
                  Back to Cart
                </RText>
              </Link>
            </Row>

            {/* Help Section */}
            <Section className="mt-8 pt-6 border-t border-red-100 w-full">
              <RText className="text-sm text-gray-500 text-center mb-3">
                Need help? We're here for you!
              </RText>
              <Row className="flex justify-center gap-6">
                <Link
                  href="/support"
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                >
                  <RText className="text-lg">💬</RText>
                  <RText className="text-sm font-medium">Live Chat</RText>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <RText className="text-lg">📞</RText>
                  <RText className="text-sm font-medium">Contact Us</RText>
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center gap-1 text-pink-500 hover:text-pink-600 transition-colors"
                >
                  <RText className="text-lg">❓</RText>
                  <RText className="text-sm font-medium">FAQ</RText>
                </Link>
              </Row>
            </Section>
          </Card>
        </Area>
      </Container>
    </Core>
  );
}
