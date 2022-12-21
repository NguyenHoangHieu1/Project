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
exports.postAddProduct = exports.postYourProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const express_validator_1 = require("express-validator");
const postYourProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const products = yield product_1.default.findOne({ userId: userId });
    return res.json(200).json({ message: "Products", products: products });
});
exports.postYourProducts = postYourProducts;
const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const validationCheck = (0, express_validator_1.validationResult)(req);
    if (!validationCheck.isEmpty()) {
        return res.status(406).json({ message: validationCheck.array()[0].msg });
    }
    product_1.default.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
        .then((data) => {
        res.status(201).json({ message: "Created Successfully", product: data });
    })
        .catch((err) => next(err));
};
exports.postAddProduct = postAddProduct;
