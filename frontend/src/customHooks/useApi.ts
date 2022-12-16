import { useEffect } from "react";
import { configuration } from "../Interfaces/Configuration";
import { useAppDispatch } from "../store";
import product, { productActions, fetchProducts } from "../store/product";
const useApi = (url: string, configuration?: configuration) => {
  const dispatch = useAppDispatch();
  const fetchFunction = function () {
    fetch(`http://localhost:8080${url}`, {
      method: configuration?.method ? configuration.method : "GET",
      body: configuration?.body ? JSON.stringify(configuration.body) : null,
      headers: configuration?.headers ? configuration.headers : {},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("The Server went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.products) {
          dispatch(fetchProducts(data.products));
        }
      })
      .catch((err) => console.log(err));
  };

  return fetchFunction;
};
export default useApi;
