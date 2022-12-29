import { FormEvent, ReactNode, Ref } from "react";
import Cart from "./Cart";
import Product from "./Product";

interface props {
  children?: ReactNode;
  classAdd?: {};
  onClick?: () => void;
  product?: Product;
  listOfImages?: ReactNode[];
  inputs?: [];
  ref?: Ref<HTMLElement>;
  value?: any;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onClassName?: string | boolean;
  type?: string;
  loadedProducts?: ReactNode[];
  inputValues?: {
    inputValue: string;
    inputChange: (e: FormEvent<HTMLInputElement>) => void;
    inputFocus: () => void;
    inputOnClassName: string | boolean;
    type: string;
  };
  title?: string;
  onShowAuth?: (authVer?: boolean) => void;
  onHideAuth?: (authVer?: boolean) => void;
  status?: "success" | "loading";
  token?: string;
  userId?: string;
  products?: Product[];
  pagination?: boolean;
  editProduct?: boolean;
  linkPage?: string;
  deleteProduct?: (productId: string) => void;
  onRemoveItem?: (Cart: Cart) => void;
}

export default props;
