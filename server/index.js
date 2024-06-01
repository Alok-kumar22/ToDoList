import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import taskRouter from "./routes/task.js";

connectDB();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todolist",taskRouter)
app.listen(5000,()=>{
    console.log("Server run at Port 5000");
})