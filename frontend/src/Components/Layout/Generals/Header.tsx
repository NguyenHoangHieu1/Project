import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import Button from "../../UI/Button";
import React, { useState } from "react";
import props from "../../../Interfaces/Props";
import useApi from "../../../customHooks/useApi";
import { useAppDispatch } from "../../../store";
import { authActions } from "../../../store/auth";
import useMessage from "../../../customHooks/useMessage";

const Header: React.FC<props> = (props) => {
  const message = useMessage();
  const dispatch = useAppDispatch();
  const [changeHeaderBar, setChangeHeaderBar] = useState(`${classes.header} `);
  useApi("/");
  const [menuMobile, setMenuMobile] = useState(false);
  document.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
      setChangeHeaderBar(`${classes.header} ${classes.changed}`);
    } else {
      setChangeHeaderBar(`${classes.header}`);
    }
  });
  function changeMenuMobileHandler() {
    setMenuMobile((prevState) => {
      return !prevState;
    });
  }
  function logOutHandler() {
    message({ title: "Logout Successfully", status: "success" });
    dispatch(authActions.clearToken({}));
  }
  return (
    <header className={changeHeaderBar}>
      <div className={classes.headerContent}>
        <div className={classes.title}>
          <i className="fa-brands fa-shopify"></i>
          <h1>Shopify</h1>
        </div>
        <div
          onClick={changeMenuMobileHandler}
          className={classes["menu-mobile-bar"]}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
        <nav className={menuMobile ? classes["menu-mobile"] : classes.menu}>
          <ul className={classes.list}>
            <NavLink
              to="/"
              exact
              className={classes.item}
              activeClassName={classes.itemActive}
            >
              Home
            </NavLink>
            <NavLink
              to="/products/?page=1"
              className={classes.item}
              activeClassName={classes.itemActive}
            >
              Producst
            </NavLink>
            {props.token && (
              <>
                <NavLink
                  to="/cart"
                  className={classes.item}
                  activeClassName={classes.itemActive}
                >
                  Cart
                </NavLink>
                <NavLink
                  to="/order"
                  className={classes.item}
                  activeClassName={classes.itemActive}
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/add-product"
                  className={classes.item}
                  activeClassName={classes.itemActive}
                >
                  Add Product
                </NavLink>
                <NavLink
                  to="/your-products"
                  className={classes.item}
                  activeClassName={classes.itemActive}
                >
                  Your Products
                </NavLink>
              </>
            )}
          </ul>
        </nav>

        <div className={classes.buttons}>
          {!props.token ? (
            <>
              <Button onClick={props.onShowAuth?.bind(null, true)}>
                Login
              </Button>
              <Button onClick={props.onShowAuth?.bind(null, false)}>
                Signup
              </Button>
            </>
          ) : (
            <Button onClick={logOutHandler}>Log out</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
