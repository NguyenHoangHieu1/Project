import { RequestHandler } from "express";
import { hash, compare } from "bcryptjs";
import User from "../models/user";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import nodemail from "nodemailer";

const userMail = "hoanghieufro@gmail.com";
const passMail = "sxucbgjzbburuiig";

const transport = nodemail.createTransport({
  service: "gmail",
  auth: {
    user: userMail,
    pass: passMail,
  },
});

export const postCheckAccount: RequestHandler = async (req, res, next) => {
  console.log("Im here again");
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(301).json({ message: "No Account found" });
    }
    return res.status(202).json({ message: "Account found", userId: userId });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const postLogin: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(406).json({ message: "Account doesn't exist" });
    }
    const doMatch = await compare(password, user.password);
    if (!doMatch) {
      return res.status(406).json({ message: "Wrong information" });
    }
    if (user.token) {
      return res
        .status(406)
        .json({ message: "You haven't activated the account!" });
    }
    const token = jwt.sign(
      {
        email: email,
        userId: user._id.toString(),
      },
      "reallysecret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Login successfully",
      token: token,
      userId: user._id.toString(),
      validAcc: user.token ? false : true,
    });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const postSignup: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const validationCheck = validationResult(req);
  if (!validationCheck.isEmpty()) {
    return res.status(400).json({ message: validationCheck.array()[0].msg });
  }
  let tokenNumber = Math.ceil(Math.random() * 10000);
  if (tokenNumber <= 999) {
    tokenNumber += 1000;
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "The Account already exist" });
    }
    const hashedPassword = await hash(password, 12);
    const userInfo = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      cart: {
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
      },
      token: tokenNumber,
      tokenExp: new Date().getTime() + 36000,
    });
    transport.sendMail({
      from: userMail,
      to: email,
      subject: "Register successfully",
      html: `
      <h1>Thank you so much for registering our services</h1>
      <p>Here is your passcode: ${tokenNumber}</p>
      <p>Click <a href="http://localhost:3000/activate-password/${userInfo._id.toString()}">here</a> to be able to enter your passcode </p>
      `,
    });
    return res.status(201).json({ message: "Created Successfully" });
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const postActivate: RequestHandler = async (req, res, next) => {
  const token = req.body.passCode;
  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(406).json({ message: "Wrong Pass code" });
    }
    user.token = undefined;
    user.tokenExp = undefined;
    await user.save();
    return res
      .status(201)
      .json({ message: "Activate the Account Successfully" });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};
