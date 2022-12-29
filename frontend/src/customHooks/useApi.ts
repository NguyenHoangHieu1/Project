import { useEffect } from "react";
import { configuration } from "../Interfaces/Configuration";
import { useAppDispatch } from "../store";
import product, { productActions } from "../store/product";
import { Response } from "../Interfaces/Response";
import { uiActions } from "../store/ui";
const useApi = () => {
  const dispatch = useAppDispatch();
  const fetchFunction = async function (
    url: string,
    configuration?: configuration
  ) {
    try {
      dispatch(
        uiActions.openMessage({
          stateChange: {
            status: "loading",
            title: "The backend is getting the data for us! Wait a minute",
          },
        })
      );
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: configuration?.method ? configuration.method : "GET",
        body: configuration?.body ? JSON.stringify(configuration.body) : null,
        headers: configuration?.headers ? configuration.headers : {},
      });
      if (response.status >= 400) {
        if (response.status >= 500) {
          throw new Error("The Server Went Down");
        } else {
          const data = await response.json();
          throw new Error(data.message);
        }
      }
      const data = await response.json();
      dispatch(
        uiActions.openMessage({
          stateChange: {
            status: "success",
            title: data.message,
          },
        })
      );
      if (configuration?.useData) {
        return configuration.useData(data);
      }
    } catch (err: any) {
      dispatch(
        uiActions.openMessage({
          stateChange: {
            status: "error",
            title: err.message,
          },
        })
      );
    }
  };

  return fetchFunction;
};
export default useApi;
