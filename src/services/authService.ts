import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1d";

interface TokenResponse {
  token: string;
}

// регистрация
const register = async (
  email: string,
  password: string,
  phone: string
): Promise<TokenResponse> => {
  try {
    if (!password || !phone) {
      throw new Error("Необходимо заполнить все поля");
    }
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
      throw new Error("Этот номер телефона уже используется");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      passwordHash: hashedPassword,
      phone,
    });
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME,
    });

    return { token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// логин
const login = async (
  phone: string,
  password: string
): Promise<TokenResponse> => {
  const user = await User.findOne({ where: { phone } });
  if (!user) {
    throw new Error("Неверный номер или пароль");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Неверный номер или пароль");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return { token };
};

// проверяем токен
const verifyToken = (token: string): string | jwt.JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Недействительный токен");
  }
};

export { register, login, verifyToken };
