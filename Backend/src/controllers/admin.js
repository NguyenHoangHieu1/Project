"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAddProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const express_validator_1 = require("express-validator");
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
