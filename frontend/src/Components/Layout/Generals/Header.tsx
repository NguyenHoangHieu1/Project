import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import Button from "../../UI/Button";
import { useState } from "react";
import props from "../../../Interfaces/Props";
import { useAppSelector } from "../../../store";

const Header: React.FC<props> = (props) => {
  const isLoggedIn = useAppSelector((state) => state.auth).isLoggedIn;
  const [changeHeaderBar, setChangeHeaderBar] = useState(`${classes.header} `);
  const [menuMobile, setMenuMobile] = useState(false);
  document.addEventListener("scroll", (e: Event) => {
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
            {isLoggedIn && (
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
              </>
            )}
          </ul>
        </nav>

        <div className={classes.buttons}>
          <Button onClick={props.onShowAuth?.bind(null, true)}>Login</Button>
          <Button onClick={props.onShowAuth?.bind(null, false)}>Signup</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
