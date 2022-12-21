import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  Suspense,
} from "react";
const Footer = React.lazy(() => import("./Components/Layout/Generals/Footer"));
const Header = React.lazy(() => import("./Components/Layout/Generals/Header"));
const Contact = React.lazy(() => import("./Components/Layout/Home/Contact"));
const Intro = React.lazy(() => import("./Components/Layout/Home/Intro"));
const MainContent = React.lazy(
  () => import("./Components/Layout/Generals/MainContent")
);
const TopPage = React.lazy(() => import("./Components/UI/TopPage"));
const ProductsLayout = React.lazy(
  () => import("./Components/Layout/Home/ProductsHome")
);
const ProductsPage = React.lazy(
  () => import("./Components/Layout/Products/ProductsPage")
);
const ProductDetail = React.lazy(
  () => import("./Components/Layout/Product-Detail/ProductDetail")
);
const Cart = React.lazy(() => import("./Components/Layout/Cart/Cart"));
import { Switch, Route, Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/index";
const Order = React.lazy(() => import("./Components/Layout/Orders/Order"));
const AddProduct = React.lazy(
  () => import("./Components/Layout/Add-Product/AddProduct")
);

import Login from "./Components/Layout/Authentication/Popup/Login";
import Signup from "./Components/Layout/Authentication/Popup/Signup";

import props from "./Interfaces/Props";
import { authActions } from "./store/auth";
import useApi from "./customHooks/useApi";
import { Response } from "./Interfaces/Response";
import { productActions } from "./store/product";
import ForgotPassword from "./Components/Layout/Authentication/Page/ForgotPassword";
import ChangePassword from "./Components/Layout/Authentication/Page/ChangePassword";
const UI = React.lazy(() => import("./Components/Layout/Generals/UI"));
const Activate = React.lazy(
  () => import("./Components/Layout/Authentication/Page/Activate")
);

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
      <Suspense
        fallback={
          <div className="loading">
            <p className="centered ">Loading...</p>
          </div>
        }
      >
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
            <Route path="/activate-password/:token">
              <Activate />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/change-password/:token">
              <ChangePassword />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </MainContent>

        <Footer />
        <TopPage />
      </Suspense>
    </Fragment>
  );
};

export default App;
