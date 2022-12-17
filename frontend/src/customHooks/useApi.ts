import { useEffect } from "react";
import { configuration } from "../Interfaces/Configuration";
import { useAppDispatch } from "../store";
import product, { productActions } from "../store/product";
import { Response } from "../Interfaces/Response";
import { uiActions } from "../store/ui";
const useApi = (url: string, configuration?: configuration) => {
  const dispatch = useAppDispatch();
  const fetchFunction = async function () {
    try {
      dispatch(
        uiActions.openMessage({
          stateChange: {
            message: "Is Loading",
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
      if (!response.ok) {
        throw new Error("The Server went wrong");
      }
      const data = await response.json();
      if (configuration?.useData) {
        configuration.useData(data);
        dispatch(
          uiActions.openMessage({
            stateChange: {
              message: "Successful",
              status: "success",
              title: "The Backend successfully gives us data",
            },
          })
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(
        uiActions.openMessage({
          stateChange: {
            message: "Loading failed",
            status: "error",
            title: "Oh no! we occured an error",
          },
        })
      );
    }
  };

  return fetchFunction;
};
export default useApi;
