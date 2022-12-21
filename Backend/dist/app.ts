import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import mainRoute from "./routes/main";
import adminRoute from "./routes/admin";
import authRoute from "./routes/auth";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/admin", adminRoute);
app.use(authRoute);
app.use(mainRoute);
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status).json({ message: error.message, data: error.data });
};
app.use(errorHandler);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://brangto:brangto@cluster0.fuojxxb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
