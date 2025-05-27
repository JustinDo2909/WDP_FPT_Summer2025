import { Row } from "@/lib/by/Div";
import React from "react";
import Button from "../CustomButton";
import { ShoppingCart } from "lucide-react";

const AddToCartButton: React.FC<AddToCartButtonProps> = () => {
  return (
    <Button label={<Row>
     <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>Add to Cart</span>
    </Row>}
      className="flex-1 h-14 w-full flex bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 !transition-all duration-200 shadow-lg items-center justify-center space-x-2 text-sm sm:text-base">
      
    </Button>
  );
};

export default AddToCartButton;
