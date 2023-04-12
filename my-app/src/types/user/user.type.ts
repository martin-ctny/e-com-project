import { Order } from "../order/order.type";

export type UserRegister = {
  id: string;
  email: string;
  password: string;
  Adresse: string;
  Ville: string;
  CodePostal: string;
  PhoneNumber: string;
  orders?: Order[];
};

export type User = UserRegister | null;

export type UserTypeContext = {
  user: User;
  setUser: (user: User) => void;
};
