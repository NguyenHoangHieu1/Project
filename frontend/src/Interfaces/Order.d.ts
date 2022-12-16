import Product from "./Product";
export interface Order {
  orderId: string;
  cartItems: Product[];
  totalQuantity: number;
  totalPrice: price;
}
