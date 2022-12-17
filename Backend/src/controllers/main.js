"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
const product_1 = __importDefault(require("../models/product"));
const getIndex = (req, res, next) => {
    product_1.default.find()
        .then((products) => {
        if (products.length == 0) {
            res.status(200).json({ products: [], message: "No Product Found" });
        }
        else {
            res
                .status(200)
                .json({ products: products, message: "Fetch successfully" });
        }
    })
        .catch((err) => next(err));
};
exports.getIndex = getIndex;
