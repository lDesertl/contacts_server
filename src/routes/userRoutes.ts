import express from "express";
import { deleteUser, findUserById, updateUser } from "../services/userServices";
import { authMiddleware } from "../middleware/authMiddleware";
import { RequestWithUser } from "../middleware/authMiddleware";
const router = express.Router();

router.put(
  "/update",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const { email, password, phone } = req.body;
    const id = req.user?.userId;
    if (!id) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }
    try {
      await updateUser(id, email, password, phone);
      res.json({ message: "Пользователь успешно обновлен" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const id = req.user?.userId;
    console.log("Удаление");
    if (!id) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }
    try {
      await deleteUser(id);
      res.json({ message: "Пользователь успешно удален" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get(
  "/user",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const id = req.user?.userId;
    if (!id) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }
    try {
      const user = await findUserById(id);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);
export default router;
