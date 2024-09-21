// create an api that is a middlemen btw frontend and backend
import express from "express"; //"server": "json-server --watch db.json --port 3001"
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config(); // looks for .env file in root directory by default

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json()); // a middleware that allows app to accept data in req.body
app.use(cors());
app.use("/products", productRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  // matches all request to send index.html as the response to serve to web browser
  app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
