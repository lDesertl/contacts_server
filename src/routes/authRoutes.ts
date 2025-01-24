import express from "express";
import { register, login, verifyToken } from "../services/authService";
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

router.get("/verify", async (req, res): Promise<void> => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    console.log("authorizationHeader");
    res.status(401).json({ error: "Authorization header is missing" });
    return;
  }
  const token = authorizationHeader?.split(" ")[1];
  try {
    console.log("authorizationHeader1");
    const decoded = verifyToken(token);
    res.json({ decoded });
  } catch (error: any) {
    console.log("authorizationHeader2");
    res.status(400).json({ error: error.message });
  }
});

export default router;
