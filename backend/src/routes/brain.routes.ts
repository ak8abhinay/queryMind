import { Router } from "express";
import { shareBrain, getSharedBrain, syncBrain, ask } from "../controllers/brain.controller";
import { userMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.post("/share", userMiddleware, shareBrain);
router.get("/:shareLink", getSharedBrain);
router.post("/sync", userMiddleware, syncBrain);
router.post("/ask", userMiddleware, ask);

export default router;