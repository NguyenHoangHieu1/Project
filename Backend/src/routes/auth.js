"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRoute = (0, express_1.Router)();
authRoute.post("/signup", auth_1.postSignup);
exports.default = authRoute;
