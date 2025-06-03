declare global {
  type ICart = {
    id: string;
    user_id: string;
    cart_items: ICartLineItem[]
  };

  type ICartLineItem = {
    id: number;
    cart_id: number;
    product: IProduct;
    product_id: number;
    quantity: number;
  };

}

export type {
  ICart,

};