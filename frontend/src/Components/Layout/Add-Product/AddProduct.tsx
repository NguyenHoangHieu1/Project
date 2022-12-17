import { useEffect, useState } from "react";
import props from "../../../Interfaces/Props";
import InputContainer from "../../UI/InputContainer";
import classes from "./AddProduct.module.css";
import useUserInput from "../../../customHooks/useUserInput";
import Button from "../../UI/Button";

import { useAppDispatch } from "../../../store";
import { productActions } from "../../../store/product";
import useApi from "../../../customHooks/useApi";
const AddProduct: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<number[]>([]);
  const [success, setSuccess] = useState<number[]>([]);
  const {
    valueInput: titleInput,
    onChange: titleChange,
    onFocus: titleFocus,
    inValid: titleInvalid,
    reset: titleReset,
    isValid: titleIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5;
    } else {
      return value > 0;
    }
  });
  const {
    valueInput: priceInput,
    onChange: priceChange,
    onFocus: priceFocus,
    isValid: priceIsValid,
    inValid: priceInvalid,
    reset: priceReset,
  } = useUserInput((value) => {
    return value > 0;
  });
  const {
    valueInput: imageInput,
    onChange: imageChange,
    onFocus: imageFocus,
    inValid: imageInvalid,
    reset: imageReset,
    isValid: imageIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5;
    } else {
      return value > 0;
    }
  });
  const {
    valueInput: descriptionInput,
    onChange: descriptionChange,
    onFocus: descriptionFocus,
    inValid: descriptionInvalid,
    reset: descriptionReset,
    isValid: descriptionIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5;
    } else {
      return value > 0;
    }
  });
  const apiHook = useApi("/admin/add-product", {
    method: "POST",
    body: {
      _id: "",
      title: titleInput,
      price: +priceInput,
      imageUrl: imageInput,
      description: descriptionInput,
    },
    headers: {
      "Content-Type": "application/json",
    },
    useData(data) {
      dispatch(productActions.addProduct(data.product));
    },
  });
  useEffect(() => {
    let time: null | NodeJS.Timeout;
    if (error.length > 0 || success.length > 0) {
      time = setTimeout(() => {
        setError([]);
        setSuccess([]);
      }, 5000);
    }
    return () => {
      if (time != null) {
        clearTimeout(time);
      }
    };
  }, [error, success]);

  let formValid =
    titleIsValid && priceIsValid && descriptionIsValid && imageIsValid;
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) {
      setError([1]);
      setSuccess([]);
      return;
    }
    setSuccess([1]);
    setError([]);
    titleReset();
    priceReset();
    descriptionReset();
    imageReset();
    apiHook();
  }

  const titleClasses = titleInvalid ? true : false;
  const imageClasses = imageInvalid ? true : false;
  const priceClasses = priceInvalid ? true : false;
  const descriptionClasses = descriptionInvalid ? true : false;
  return (
    <section className={classes.addProduct}>
      {/* {error.length > 0 && (
        <Error>The Product has to be filled in all the forms</Error>
      )}
      {success.length > 0 && (
        <Success>Creating the product successfully</Success>
      )} */}
      <form onSubmit={submitHandler} className={classes.form}>
        <InputContainer
          title="Title"
          inputValues={{
            inputValue: titleInput,
            inputChange: titleChange,
            inputFocus: titleFocus,
            type: "submit",
            inputOnClassName: titleClasses,
          }}
        />
        <InputContainer
          title="image"
          inputValues={{
            inputValue: imageInput,
            inputChange: imageChange,
            inputFocus: imageFocus,
            inputOnClassName: imageClasses,
            type: "submit",
          }}
        />
        <InputContainer
          title="Price"
          inputValues={{
            inputValue: priceInput,
            inputChange: priceChange,
            inputFocus: priceFocus,
            inputOnClassName: priceClasses,
            type: "submit",
          }}
        />
        <InputContainer
          title="Description"
          inputValues={{
            inputValue: descriptionInput,
            inputChange: descriptionChange,
            inputFocus: descriptionFocus,
            inputOnClassName: descriptionClasses,
            type: "submit",
          }}
        />
        <Button>Create</Button>
      </form>
      <aside className={classes.information}>
        <header className={classes.header}>Rules of Creating a product</header>
        <ol>
          <li className={classes.informationLine}>
            The title has to be 5 characters long
          </li>
          <li className={classes.informationLine}>
            The Image has to be an Url
          </li>
          <li className={classes.informationLine}>
            The price has to be greater than 0
          </li>
          <li className={classes.informationLine}>
            The description has to be on detailed, and has to be at least 10
            characters
          </li>
        </ol>
      </aside>
    </section>
  );
};

export default AddProduct;
