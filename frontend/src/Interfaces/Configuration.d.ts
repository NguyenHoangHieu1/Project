import { Response } from "./Response";
export interface configuration {
  method?: string;
  body?: any;
  headers?: any;
  useData?: (data: Response) => void | Response;
}
