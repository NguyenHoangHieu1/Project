import { useEffect, useState } from "react";
import props from "../../../Interfaces/Props";
import Products from "../../Products/Products";
import useApi from "../../../customHooks/useApi";
import { useAppSelector } from "../../../store";
import Product from "../../../Interfaces/Product";
import { useParams } from "react-router";
import { Params } from "../../../Interfaces/Params";
const YourProducts: React.FC<props> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const userId = useParams<Params>().userId;
  const [reset, setReset] = useState([]);
  const apiHook = useApi();
  useEffect(() => {
    apiHook(`/admin/your-products/${userId}`, {
      useData(data) {
        if (data && data.products) setProducts(data.products);
      },
    });
  }, [reset]);

  function onDeleteHandler(productId: string) {
    apiHook("/admin/delete-product", {
      method: "DELETE",
      body: {
        productId: productId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setReset([]);
    });
  }
  return (
    <Products
      linkPage={`your-products/${userId}`}
      deleteProduct={onDeleteHandler}
      pagination={true}
      editProduct={true}
      products={products}
    />
  );
};

export default YourProducts;
// useEffect(() => {
//   apiHook("/admin/get-your-products", {
//     method: "POST",
//     body: {
//       userId: userId,
//     },
//     headers: {
//       "Content-Type": "application/json",
//     },
//     useData(data) {
//       return data;
//     },
//   }).then((data) => {
//     if (data && data.products) {
//       setProducts(data.products);
//     }
//   });
// }, [reset]);
