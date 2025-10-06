import express from "express";
import dotenv, { config } from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();

// Middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));



app.use("/api/v1/user" , userRouter);
// http://localhost:8000/api/v1/user/
app.use("/api/v1/todo" , todoRouter);
// http://localhost:8000/api/v1/todo/

app.use(express.static(path.join(_dirname , "/client/dist")));
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname , "client" , "dist" , "index.html"));
})



app.listen(PORT , () => {
    console.log(`Server is listen at the PORT ${PORT}`);
})