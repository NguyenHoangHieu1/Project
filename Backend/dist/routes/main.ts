import express from "express";
import { getIndex } from "../controllers/main";

const mainRoute = express.Router();

mainRoute.get("/", getIndex);

export default mainRoute;
