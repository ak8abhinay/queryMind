import dotenv from "dotenv";

dotenv.config();

export const JWT_PASSWORD = process.env.JWT_SECRET!;

export const MONGO_URL = process.env.MONGO_URL!;

export const PORT = Number(process.env.PORT) || 3000;

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in .env");
}
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;