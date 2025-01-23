import express from "express";
import { updateUser } from "../services/userServices";
import { authMiddleware } from "../middleware/authMiddleware";
import { RequestWithUser } from "../middleware/authMiddleware";
const router = express.Router();

router.post(
  "/update",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const { email, password, phone } = req.body;
    const id = req.user?.userId;
    if (!id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    try {
      await updateUser(id, email, password, phone);
      res.json({ message: "User updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);
export default router;
