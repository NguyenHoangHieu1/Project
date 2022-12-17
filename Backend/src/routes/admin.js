"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const express_validator_1 = require("express-validator");
const adminRoute = express_1.default.Router();
adminRoute.post("/add-product", [
    (0, express_validator_1.body)("title").trim().isLength({ min: 5 }),
    (0, express_validator_1.body)("price").isNumeric(),
    (0, express_validator_1.body)("imageUrl").isURL(),
    (0, express_validator_1.body)("description").trim().isLength({ min: 10 }),
], admin_1.postAddProduct);
exports.default = adminRoute;
