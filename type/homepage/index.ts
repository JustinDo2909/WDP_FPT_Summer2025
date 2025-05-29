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

export type ILink = {
  title: string;
  href: string;
};

export type Footer = {
  title: string;
  links: ILink[];
};

export type FooterProps = {
  footers: Footer[];
};
