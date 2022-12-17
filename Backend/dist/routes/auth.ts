import { Router } from "express";
import { postSignup } from "../controllers/auth";

const authRoute = Router();

authRoute.post("/signup", postSignup);

export default authRoute;
