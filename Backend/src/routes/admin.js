"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
// import { getIndex } from "../controllers/main";
const express_validator_1 = require("express-validator");
const is_Auth_1 = __importDefault(require("../middleware/is-Auth"));
const adminRoute = express_1.default.Router();
adminRoute.post("/add-product", is_Auth_1.default, [
    (0, express_validator_1.body)("title", "The title has to be 5 characters long")
        .trim()
        .isLength({ min: 5 }),
    (0, express_validator_1.body)("price", "It should be higher than 0").isNumeric().isFloat({ min: 1 }),
    (0, express_validator_1.body)("imageUrl", "It should be an url of an image").isURL(),
    (0, express_validator_1.body)("description", "The description should be 10 characters long")
        .trim()
        .isLength({ min: 10 }),
], admin_1.postAddProduct);
exports.default = adminRoute;
