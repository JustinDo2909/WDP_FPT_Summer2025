import { Box, Column, Row } from "@/lib/by/Div";
import { Award, Shield, Truck } from "lucide-react";

export const ShopGuarantees = () => {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
      <Column className="flex flex-col items-center text-center">
        <Row className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-2">
          <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Row>
        <p className="text-xs sm:text-sm font-medium text-center">
          Free Shipping
        </p>
        <p className="text-xs text-gray-600">On orders over 300K</p>
      </Column>
      <Column className="flex flex-col items-center">
        <Row className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-2">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Row>
        <p className="text-xs sm:text-sm font-medium">Genuine Product</p>
        <p className="text-xs text-gray-600">300% refund guarantee</p>
      </Column>
      <Column className="flex flex-col items-center">
        <Row className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-2">
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Row>
        <p className="text-xs sm:text-sm font-medium">Premium Quality</p>
        <p className="text-xs text-gray-600">Certified ingredients</p>
      </Column>
    </Box>
  );
};
