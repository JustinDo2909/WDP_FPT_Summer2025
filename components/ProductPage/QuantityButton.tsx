import { RText, Wrap } from '@/lib/by/Div';
import React from 'react';
import Button from '../CustomButton';
import { Minus, Plus } from 'lucide-react';

interface QuantityButtonProps {
  quantity: number;
  increment?: () => void;
  decrement?: () => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  increment,
  decrement,
}) => {

  return (
    <Wrap className="flex w-auto py-2 items-center gap-2 border border-gray-300 rounded-xl">
      <Button
        label={<Minus/>}
        onClick={decrement}
        variant="outline"
        className="w-12 h-8 !p-0 justify-center border-r border-l-0 border-y-0 rounded-none"
      />
      <RText className="w-16 !text-base justify-center text-center font-semibold">{quantity}</RText>
      <Button
        label={<Plus/>}
        onClick={increment}
        variant="outline"
        className="w-12 h-8  !p-0 justify-center border-l border-r-0 border-y-0 rounded-none"
      />
    </Wrap>
  );
};

export default QuantityButton;
