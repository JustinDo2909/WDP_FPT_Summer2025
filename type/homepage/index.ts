export type IProduct = {
  title: string;
  description: string;
  price: number;
  image_url: string;
  sale_price: number;
};

export type Products = {
  products: IProduct[];
};
