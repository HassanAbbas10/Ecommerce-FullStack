import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//Routes imports

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js"

//Routes Implementation
app.use("/api/v1/products",productRouter)
app.use("/api/v1/users",userRouter)
export default app