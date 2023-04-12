import { Product } from "../products/product.type";

export type Order = {
  userId: string;
  id?: string | undefined;
  ammount: number;
  status: boolean;
  orderItems?: OrderItem[];
};

export type OrderContextType = {
  order: Order | null;
  setOrder: (order: Order) => void;
};

export type OrderItem = {
  id: string | undefined;
  quantity: number;
  product: Product;
};
