import React, { useEffect, useState } from "react";
import props from "../../../Interfaces/Props";
import InputContainer from "../../UI/InputContainer";
import classes from "./EditProduct.module.css";
import useUserInput from "../../../customHooks/useUserInput";
import Button from "../../UI/Button";
import useMessage from "../../../customHooks/useMessage";
import { useAppDispatch, useAppSelector } from "../../../store";
import { productActions } from "../../../store/product";
import useApi from "../../../customHooks/useApi";
import { useParams, useHistory } from "react-router";
import { Params } from "../../../Interfaces/Params";
const EditProduct: React.FC<props> = (props) => {
  const productId = useParams<Params>().productId;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const changeMessage = useMessage();
  const userId = useAppSelector((state) => state.auth.userId);

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
    if (
      typeof value === "string" &&
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
        value
      )
    ) {
      return true;
    } else if (typeof value === "number") {
      return value > 0;
    } else {
      return false;
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
  const apiHook = useApi();
  useEffect(() => {
    apiHook("/admin/edit-product/" + productId, {
      useData(data) {
        return data;
      },
    }).then((data) => {
      if (data && data.product) {
        console.log(data.product);
        titleChange(data.product.title);
        priceChange(data.product.price);
        imageChange(data.product.imageUrl);
        descriptionChange(data.product.description);
      }
    });
  }, []);
  let formValid =
    titleIsValid && priceIsValid && descriptionIsValid && imageIsValid;
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    apiHook("/admin/edit-product", {
      method: "PUT",
      body: {
        productId: productId,
        title: titleInput,
        price: +priceInput,
        imageUrl: imageInput,
        description: descriptionInput,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.replace(`/your-products/${userId}`);
    });
    if (!formValid) {
      return;
    }

    titleReset();
    priceReset();
    descriptionReset();
    imageReset();
  }

  const titleClasses = titleInvalid ? true : false;
  const imageClasses = imageInvalid ? true : false;
  const priceClasses = priceInvalid ? true : false;
  const descriptionClasses = descriptionInvalid ? true : false;
  return (
    <section className={classes.addProduct}>
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
        <Button>Edit</Button>
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

export default React.memo(EditProduct);
