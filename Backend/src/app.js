"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./routes/main"));
const admin_1 = __importDefault(require("./routes/admin"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/admin", admin_1.default);
app.use(auth_1.default);
app.use(main_1.default);
const errorHandler = (error, req, res, next) => {
    console.log(error.status);
    res.status(error.status).json({ message: error.message, data: error.data });
};
app.use(errorHandler);
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect("mongodb+srv://brangto:brangto@cluster0.fuojxxb.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    app.listen(8080);
})
    .catch((err) => console.log(err));
