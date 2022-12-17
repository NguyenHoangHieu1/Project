import classes from "./MainContent.module.css";

import props from "../../../Interfaces/Props";
import Container from "../../UI/Container";
import React from "react";

const MainContent: React.FC<props> = (props) => {
  return (
    <main className={`main ${classes.main}`}>
      <Container>{props.children}</Container>
    </main>
  );
};

export default React.memo(MainContent);
