export default interface Product {
  productId?: Product;
  _id: string;
  imageUrl: string;
  title: string;
  price: number;
  description: string;
  quantity?: number;
}
