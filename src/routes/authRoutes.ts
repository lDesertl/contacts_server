import express from "express";
import { register, login, verifyToken } from "../services/authService";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    const { token } = await register(email, password, phone);
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const { token } = await login(phone, password);
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/verify", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = verifyToken(token);
    res.json({ decoded });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
export default router;
