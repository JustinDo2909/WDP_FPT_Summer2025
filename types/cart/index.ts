declare global {
  type ICart = {
    id: string;
    user_id: string;
    cartItems: ICartLineItem[]
  };

  type ICartLineItem = {
    id: number;
    cart_id: number;
    product: IProduct;
    product_id: string;
    quantity: number;
  };

}

export type {
  ICart,

};