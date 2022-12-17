"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = require("../controllers/main");
const mainRoute = express_1.default.Router();
mainRoute.get("/", main_1.getIndex);
exports.default = mainRoute;
