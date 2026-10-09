import { Router } from "express";
import { signup, signin, logout, me } from "../controllers/user.controller";
import { userMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", userMiddleware, me);

export default router;