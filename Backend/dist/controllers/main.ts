import { RequestHandler } from "express";
import Product from "../models/product";
import User from "../models/user";
import UserInterface from "../interfaces/User";
import Order from "../models/order";
export const getIndex: RequestHandler = (req, res, next) => {
  Product.find()
    .then((products) => {
      if (products.length == 0) {
        res.status(200).json({ products: [], message: "No Product Found" });
      } else {
        res
          .status(200)
          .json({ products: products, message: "Fetch successfully" });
      }
    })
    .catch((err) => next(err));
};

export const getProducts: RequestHandler = async (req, res, next) => {
  const setoff: number = +req.params.setoff;
  const limit: number = +req.params.limit;
  const page: number = +req.params.page;
  let skippedProducts = limit * setoff;
  try {
    const products = await Product.find().skip(skippedProducts).limit(limit);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Fetched Successfully", products: products });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const getProductRecommend: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    let products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    let productIndex = products.findIndex(
      (product) => product._id.toString() === productId.toString()
    );
    products = products.filter((product, index) => {
      if (index - 1 === productIndex) {
        return product;
      } else if (index + 1 === productIndex) {
        return product;
      } else if (index - 2 === productIndex) {
        return product;
      } else if (index + 2 === productIndex) {
        return product;
      }
    });
    return res
      .status(200)
      .json({ message: "Products fetched", products: products });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const getProductDetail: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product Found", product: product });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const getCart: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate(
      "cart.cartItems.productId"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res
      .status(200)
      .json({ message: "Append cart successfully", cart: user.cart });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const putAddToCart: RequestHandler = async (req, res, next) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const userId = req.body.userId;
  try {
    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItems = user.cart.cartItems.slice();
    let totalQuantity = user.cart.totalQuantity;
    let totalPrice = user.cart.totalPrice;
    const cartItemIndex = user.cart.cartItems.findIndex((item) => {
      return item.productId.toString() === productId.toString();
    });
    const cartItem = user.cart.cartItems.find((item) => {
      return item.productId.toString() === productId.toString();
    });
    if (cartItemIndex !== -1 && cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItems.push({
        productId: productId,
        quantity: quantity,
      });
    }
    totalPrice = quantity * product.price;
    totalQuantity += quantity;
    user.cart.totalPrice = totalPrice;
    user.cart.totalQuantity = totalQuantity;
    user.cart.cartItems = cartItems;
    await user.save();
    return res.status(201).json({ message: "Add successfully" });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const deleteCartItem: RequestHandler = async (req, res, next) => {
  const cartItemId: string = req.body.cartItemId;
  const userId: string = req.body.userId;
  const quantityToDelete: number = req.body.quantityToDelete;
  let cartItems;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "Account not found" });
  }

  const cartItemIndex = user.cart.cartItems.findIndex((item) => {
    return item.productId.toString() === cartItemId.toString();
  });
  const cartItem = user.cart.cartItems.find((item) => {
    return item.productId.toString() === cartItemId.toString();
  });
  if (!cartItem) {
    return res.status(404).json({ message: "Cart Item not found" });
  }
  const productDetail = await Product.findById(cartItem.productId);
  if (!productDetail) {
    return res.status(404).json({ message: "Cart Item not found" });
  }
  if (cartItem.quantity <= quantityToDelete) {
    cartItems = user.cart.cartItems.filter((item) => {
      return item.productId.toString() !== cartItemId.toString();
    });
  } else {
    console.log(cartItem.quantity, quantityToDelete);
    cartItem.quantity -= quantityToDelete;
    cartItems = [...user.cart.cartItems];
    cartItems[cartItemIndex] = cartItem;
  }
  let totalQuantity = user.cart.totalQuantity - quantityToDelete;
  if (totalQuantity < 0) {
    totalQuantity = 0;
  }
  let totalPrice =
    user.cart.totalPrice - quantityToDelete * productDetail.price;
  if (totalPrice < 0) {
    totalPrice = 0;
  }
  user.cart = {
    cartItems: cartItems,
    totalQuantity: totalQuantity,
    totalPrice: totalPrice,
  };
  await user.save();
  return res
    .status(200)
    .json({ message: "Delete Successfully", cart: user.cart });
};

export const getOrders: RequestHandler = (req, res, next) => {
  const userId = req.body.userId;
};

export const postOrder: RequestHandler = async (req, res, next) => {
  const userId = req.body.userId;
  const user = await User.findById(userId).populate('cart.cartItems.productId');
  if (!user) {
    return res.status(404).json({ message: "Account not found" });
  }
  const orderProducts = user.cart.cartItems.map((item) => {
    return {
      products: { ...item },
    };
  });
  await Order.create({
    products:orderProducts,
    user:{
      userId:userId,
      username:user.username
    }
  })
  return res.status(202).json({message:"Order successfully"});
};
