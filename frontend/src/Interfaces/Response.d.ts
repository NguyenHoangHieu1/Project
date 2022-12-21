import { Product } from "./Product";

export interface Response {
  products?: Product[];
  product?: Product;
  token?: string;
  validAcc?: string;
  message: string;
  userId?: string;
}
