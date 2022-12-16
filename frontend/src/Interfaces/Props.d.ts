import { ReactNode, Ref } from "react";
import { Product } from "./Product";

interface props {
  children?: ReactNode;
  classAdd?: {};
  onClick?: () => void;
  product?: Product;
  listOfImages?: ReactNode[];
  inputs?: [];
  ref?: Ref;
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
}

export default props;
