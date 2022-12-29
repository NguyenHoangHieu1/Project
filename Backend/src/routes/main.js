"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = require("../controllers/main");
const is_Auth_1 = __importDefault(require("../middleware/is-Auth"));
const mainRoute = express_1.default.Router();
mainRoute.get("/", main_1.getIndex);
mainRoute.get("/products", main_1.getProducts);
mainRoute.get("/product-recommend/:productId", main_1.getProductRecommend);
mainRoute.get("/product-detail/:productId", main_1.getProductDetail);
mainRoute.get("/cart/:userId", is_Auth_1.default, main_1.getCart);
mainRoute.put("/add-to-cart", is_Auth_1.default, main_1.putAddToCart);
mainRoute.delete("/delete-cart-item", is_Auth_1.default, main_1.deleteCartItem);
exports.default = mainRoute;
