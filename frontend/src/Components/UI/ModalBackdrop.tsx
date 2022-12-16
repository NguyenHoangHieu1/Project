import props from "../../Interfaces/Props";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
const ModalBackdrop: React.FC<props> = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop onClick={props.onHideAuth} />,
        document.getElementById("backdrop")!
      )}
      {createPortal(
        <Modal>{props.children}</Modal>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default ModalBackdrop;
