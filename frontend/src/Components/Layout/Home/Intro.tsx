import { useState, useEffect } from "react";
import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./Intro.module.css";
import introImage1 from "../../../images/delivery.png";
import introImage2 from "../../../images/Gift.png";
import introImage3 from "../../../images/BuyOnline.png";

const Images = [
  {
    image: introImage1,
  },
  {
    image: introImage2,
  },
  {
    image: introImage3,
  },
];
const Intro: React.FC<props> = (props) => {
  const [imageVisible, setImageVisible] = useState(0);
  const listOfImages = Images.map((image, index) => {
    if (index == imageVisible) {
      return (
        <li key={Math.random()} className={`${classes.item}`}>
          <img src={image.image} alt="" />
        </li>
      );
    }
  });
  useEffect(() => {
    const timeSet = setTimeout(() => {
      if (imageVisible == listOfImages.length - 1) {
        setImageVisible(0);
      } else {
        setImageVisible(imageVisible + 1);
      }
    }, 3000);
    return () => {
      clearTimeout(timeSet);
    };
  }, [imageVisible]);
  return (
    <section className={classes.intro}>
      <div className={classes.introduction}>
        <h1>Shopify</h1>
        <p>
          Shop what you can, buy what you <code>should</code>
        </p>
        <Button>Shop now!</Button>
      </div>
      <div className={classes.illustrations}>
        <ul className={classes.list}>{listOfImages}</ul>
      </div>
    </section>
  );
};

export default Intro;
