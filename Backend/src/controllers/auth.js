"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignup = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_1 = __importDefault(require("../models/user"));
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield user_1.default.findOne({ email: email });
        if (user) {
            return res.status(406).json({ message: "The Account already exist" });
        }
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 12);
        const theEnd = yield user_1.default.create({
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
    }
    catch (err) {
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
});
exports.postSignup = postSignup;
