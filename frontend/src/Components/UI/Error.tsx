import props from "../../Interfaces/Props";
import Popup from "./Popup";

const Error: React.FC<props> = (props) => {
  return <Popup>{props.children}</Popup>;
};

export default Error;
