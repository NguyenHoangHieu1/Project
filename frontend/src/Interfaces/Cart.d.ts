import Product from "./Product";

export default interface Cart {
  cartItems: [cartItem: Product];
  totalPrice: number;
  totalQuantity: number;
}
