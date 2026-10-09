import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import { JWT_PASSWORD } from "../config";
import { signupSchema, signinSchema } from "../validators/auth.validator";

const isProduction = process.env.NODE_ENV === "production";

export const signup = async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const { username, password } = parsed.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ username, password: hashedPassword });
    res.json({ message: "User signed up" });
  } catch (e) {
    res.status(411).json({ message: "User already exists" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const { username, password } = parsed.data;

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    res.status(403).json({ message: "Incorrect credentials" });
    return;
  }

  const passwordMatches = await bcrypt.compare(password, existingUser.password!);
  if (!passwordMatches) {
    res.status(403).json({ message: "Incorrect credentials" });
    return;
  }

  const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax"
  });
  res.json({ message: "Signed in" });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const me = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const user = await UserModel.findById(userId).select("username");
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ username: user.username });
};