export type Props = {
  products: Product[];
};

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
};

export type ProductForm = {
  title: string;
  price: number;
  description: string;
  category: string;
};
