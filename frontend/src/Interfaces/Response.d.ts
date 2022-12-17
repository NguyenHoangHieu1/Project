import { Product } from "./Product";

export interface Response {
  products?: Product[];
  product?: Product;
  message: string;
}
