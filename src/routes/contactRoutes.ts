import express from "express";
import {
  createContact,
  deleteContact,
  getUserContacts,
  updateContact,
} from "../services/contactService";
import { authMiddleware } from "../middleware/authMiddleware";
import { RequestWithUser } from "../middleware/authMiddleware";
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const { name, phone } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }
    try {
      const contact = await createContact(name, phone, userId);
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete/:id",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const userId = req.user?.userId;
    const { id } = req.params;
    try {
      await deleteContact(Number(id), Number(userId));
      res.json({ message: "Контакт успешно удален" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.put(
  "/update/:id",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { name, phone } = req.body;
    try {
      await updateContact(Number(id), Number(userId), name, phone);
      res.json({ message: "Контакт успешно обновлен" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get(
  "/conacts",
  authMiddleware,
  async (req: RequestWithUser, res): Promise<void> => {
    const userId = req.user?.userId;
    try {
      const contacts = await getUserContacts(Number(userId));
      res.json(contacts);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;
