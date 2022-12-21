import props from "../../../Interfaces/Props";
import Notification from "../../UI/Notification";
import { uiActions } from "../../../store/ui";
import { useAppSelector, useAppDispatch } from "../../../store";
import { useEffect } from "react";
const UI: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const NotificationDialog = useAppSelector((state) => state.ui);
  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(uiActions.closeMessage({}));
    }, 4000);
    return () => {
      clearTimeout(time);
    };
  }, [NotificationDialog.messageState.status]);
  return (
    <>
      {NotificationDialog.messageState.status?.length! > 0 ? (
        <Notification status={NotificationDialog.messageState.status}>
          {NotificationDialog.messageState.title}
        </Notification>
      ) : (
        <></>
      )}
    </>
  );
};

export default UI;
