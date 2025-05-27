'use client'
import { Box, Row, RText } from '@/lib/by/Div';
import React from 'react';
import { useProductActions } from './seg/useProductActions';
import QuantityButton from './QuantityButton';
import AddToCartButton from './AddToCartButton';
import FavouriteButton from './FavouriteButton';

interface ProductActionsProps {
  totalStock: number;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  totalStock
}) => {

  const { quantity, increment, decrement } = useProductActions(1, 1, totalStock || 99);
  return (
    <Box className="flex items-center gap-4">
      <Row className='items-center'>
        <QuantityButton quantity={quantity} increment={increment} decrement={decrement}/> 
        <RText className='text-gray-500'>{totalStock} left in stock</RText>
      </Row>
      <Row className='space-x-2'>
        <AddToCartButton/>
        <FavouriteButton isWishlisted={true}/>
      </Row>
    </Box>
  );
};

export default ProductActions;
