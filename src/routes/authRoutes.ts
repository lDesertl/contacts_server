import express from "express";
import { register, login, verifyToken } from "../services/authService";
import e from "express";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { phone, password, email } = req.body;
  try {
    const { token } = await register(phone, password, email);
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

router.post("/verify", async (req, res): Promise<void> => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ error: "Authorization header is missing" });
    return;
  }
  const token = authorizationHeader?.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    res.json({ decoded });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
