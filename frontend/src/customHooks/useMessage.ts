import { useState, useEffect } from "react";
import { useAppDispatch } from "../store";
import { uiActions } from "../store/ui";
import { ConfigurationMessage } from "../Interfaces/ConfigurationMessage";
const useMessage = () => {
  const dispatch = useAppDispatch();
  const changeMessageHandler = (configuration: ConfigurationMessage) => {
    dispatch(
      uiActions.openMessage({
        stateChange: {
          title: configuration.title,
          status: configuration.status,
        },
      })
    );
  };
  return changeMessageHandler;
};

export default useMessage;
