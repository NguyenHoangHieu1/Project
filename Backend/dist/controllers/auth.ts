import { RequestHandler } from "express";
import { hash, compare } from "bcryptjs";
import User from "../models/user";
export const postSignup: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(406).json({ message: "The Account already exist" });
    }
    const hashedPassword = await hash(password, 12);
    const theEnd = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      cart: {
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
      },
    });
    console.log("Hello");
    return res
      .status(201)
      .json({ message: "Created Successfully", token: "1" });
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }

  //   User.findOne({ email: email })
  //     .then((user) => {
  //       if (user) {
  //         return res.status(406).json({ message: "The Account already exist" });
  //       }
  //       hash(password, 12)
  //         .then((hashedPassword) => {
  //           User.create({
  //             email: email,
  //             username: username,
  //             password: hashedPassword,
  //             cart: {
  //               cartItems: [],
  //               totalQuantity: 0,
  //               totalPrice: 0,
  //             },
  //           }).then();
  //         })
  //         .catch((err) => {
  //           if (!err.status) {
  //             err.status = 500;
  //           }
  //           next(err);
  //         });
  //     })
  //     .catch((err) => {
  //       if (!err.status) {
  //         err.status = 500;
  //       }
  //       next(err);
  //     });
};
