import { Product } from "./product.type";

export type PropsCategory = {
  categories: Category[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
  products?: Product[];
};

export type CategoryForm = {
  name: string;
  description: string;
};
