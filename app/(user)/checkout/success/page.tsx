import { Core, Container, Area, Section, Card, Row, RText } from "@/lib/by/Div";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <Core className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 px-4">
      <Container className="max-w-3xl w-full">
        <Area className="flex flex-col items-center gap-8 py-16">
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 lg:p-16 flex flex-col items-center border border-pink-100 relative overflow-hidden w-full max-w-2xl mx-auto">
            {/* Decorative elements */}
            <Section className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400"></Section>
            <Section className="absolute -top-4 -right-4 w-16 h-16 bg-pink-200 rounded-full opacity-30"></Section>
            <Section className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-200 rounded-full opacity-20"></Section>

            {/* Success Icon */}
            <Section className="mb-6 relative">
              <Section className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <RText className="text-5xl text-white font-bold">✓</RText>
              </Section>
              <Section className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                <RText className="text-lg">✨</RText>
              </Section>
            </Section>

            {/* Main Heading */}
            <Section className="mb-4 text-center">
              <RText className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Payment Successful!
              </RText>
              <RText className="text-lg text-purple-600 font-medium">
                Your Beauty Order is Confirmed
              </RText>
            </Section>

            {/* Success Message */}
            <RText className="text-gray-700 text-center mb-8 leading-relaxed max-w-md">
              Thank you for choosing our beauty products! Your order has been
              confirmed and is now being prepared with care. Get ready to glow!
              ✨
            </RText>

            {/* Order Details Preview */}
            <Section className="w-full bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8 border border-pink-100">
              <RText className="text-sm font-semibold text-purple-700 mb-3 text-center">
                Whats Next?
              </RText>
              <Row className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                <Section className="flex items-center gap-2 flex-1">
                  <RText className="text-pink-500">📦</RText>
                  <RText>Order Processing</RText>
                </Section>
                <Section className="flex items-center gap-2 flex-1">
                  <RText className="text-purple-500">🚚</RText>
                  <RText>Beauty Packaging</RText>
                </Section>
                <Section className="flex items-center gap-2 flex-1">
                  <RText className="text-rose-500">💄</RText>
                  <RText>Ready to Glow</RText>
                </Section>
              </Row>
            </Section>

            {/* Action Buttons */}
            <Row className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
              <Link href="/user/orders" className="flex-1">
                <RText className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
                  View My Orders
                </RText>
              </Link>
              <Link href="/products" className="flex-1">
                <RText className="w-full px-6 py-3 bg-white border-2 border-pink-300 text-pink-600 rounded-xl hover:bg-pink-50 transition-colors duration-300 font-semibold text-center hover:border-pink-400 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
                  Continue Shopping
                </RText>
              </Link>
            </Row>

            {/* Social Sharing or Newsletter */}
            <Section className="mt-8 pt-6 border-t border-pink-100 w-full">
              <RText className="text-sm text-gray-500 text-center mb-3">
                Share your beauty journey with us!
              </RText>
              <Row className="flex justify-center gap-4">
                <RText className="text-2xl cursor-pointer hover:scale-110 transition-transform">
                  💄
                </RText>
                <RText className="text-2xl cursor-pointer hover:scale-110 transition-transform">
                  ✨
                </RText>
                <RText className="text-2xl cursor-pointer hover:scale-110 transition-transform">
                  🌸
                </RText>
                <RText className="text-2xl cursor-pointer hover:scale-110 transition-transform">
                  💅
                </RText>
              </Row>
            </Section>
          </Card>
        </Area>
      </Container>
    </Core>
  );
}
