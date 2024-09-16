import express from "express"; //"server": "json-server --watch db.json --port 3001"
import dotenv from "dotenv";
import { connectDB } from "./db.js";

dotenv.config() // looks for .env file in root directory by default

const app = express();

app.get("/", (req,res)=>{
    res.send("server is ready!")
})

app.listen(5000, () =>{
    connectDB();
    console.log("Server started at http://localhost:5000")
})