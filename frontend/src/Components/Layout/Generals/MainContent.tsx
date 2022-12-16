import classes from "./MainContent.module.css";

import props from "../../../Interfaces/Props";
import Container from "../../UI/Container";

const MainContent: React.FC<props> = (props) => {
  return (
    <main className={`main ${classes.main}`}>
      <Container>{props.children}</Container>
    </main>
  );
};

export default MainContent;
