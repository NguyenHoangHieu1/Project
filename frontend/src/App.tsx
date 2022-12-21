import Footer from "./Components/Layout/Generals/Footer";
import Header from "./Components/Layout//Generals/Header";
import Contact from "./Components/Layout/Home/Contact";
import Intro from "./Components/Layout/Home/Intro";
import MainContent from "./Components/Layout/Generals/MainContent";
import TopPage from "./Components/UI/TopPage";
import ProductsLayout from "./Components/Layout/Home/ProductsHome";
import ProductsPage from "./Components/Layout/Products/ProductsPage";
import ProductDetail from "./Components/Layout/Product-Detail/ProductDetail";
import Cart from "./Components/Layout/Cart/Cart";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/index";
import Order from "./Components/Layout/Orders/Order";
import AddProduct from "./Components/Layout/Add-Product/AddProduct";
import Login from "./Components/Layout/Authentication/Popup/Login";
import props from "./Interfaces/Props";
import Signup from "./Components/Layout/Authentication/Popup/Signup";
import { authActions } from "./store/auth";
import useApi from "./customHooks/useApi";
import { Response } from "./Interfaces/Response";
import { productActions } from "./store/product";
import UI from "./Components/Layout/Generals/UI";
import Activate from "./Components/Layout/Authentication/Page/Activate";
const App: React.FC<props> = () => {
  const dispatch = useAppDispatch();
  const dataApi = useApi("/", {
    useData(data: Response) {
      dispatch(productActions.replaceProducts(data.products));
    },
  });
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth).token;
  useEffect(() => {
    dataApi();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (token.length > 0) {
        dispatch(authActions.setToken({ token: token }));
      }
    }
  }, [isLoggedIn]);

  const showAuth = useCallback((authVer?: boolean) => {
    if (authVer === true) {
      setLogin(true);
    } else {
      setSignup(true);
    }
  }, []);
  const hideAuth = useCallback((authVer?: boolean) => {
    if (authVer === true) {
      setLogin(false);
    } else {
      setSignup(false);
    }
  }, []);
  return (
    <Fragment>
      <Header token={isLoggedIn} onShowAuth={showAuth} />
      <UI />
      {login && <Login onHideAuth={hideAuth} />}
      {signup && <Signup onHideAuth={hideAuth} />}
      <MainContent>
        <Switch>
          <Route path="/" exact>
            <Intro />
            <ProductsLayout />
            <Contact />
          </Route>
          <Route path="/products" exact>
            <ProductsPage />
          </Route>
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
          {isLoggedIn && [
            <Route key="1" path="/cart">
              <Cart />
            </Route>,
            <Route key="2" path="/order">
              <Order />
            </Route>,
            <Route key="3" path="/add-product">
              <AddProduct />
            </Route>,
          ]}
          <Route path="/activate-password/:userId">
            <Activate />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </MainContent>

      <Footer />
      <TopPage />
    </Fragment>
  );
};

export default App;
