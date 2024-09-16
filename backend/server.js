// create an api that is a middlemen btw frontend and backend
import express from "express"; //"server": "json-server --watch db.json --port 3001"
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config(); // looks for .env file in root directory by default

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // a middleware that allows app to accept data in req.body

app.use("/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
