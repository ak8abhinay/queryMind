import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { MONGO_URL, PORT } from "./config";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // adjust origin to your FE dev port
app.use(cookieParser());
app.use("/api/v1", routes);

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

mongoose.connection.once("open", () => {
  console.log("Connected to database:", mongoose.connection.name);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));