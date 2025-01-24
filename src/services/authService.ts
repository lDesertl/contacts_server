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
  phone: string,
  password: string,
  email?: string
): Promise<TokenResponse> => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  try {
    if (!password || !phone) {
      throw new Error("Необходимо заполнить все поля");
    }
    let cleanedPhone = phone.replace(/[^\d+]/g, "");
    if (cleanedPhone.startsWith("+7")) {
      cleanedPhone = "8" + cleanedPhone.slice(2);
    }
    if (!cleanedPhone.startsWith("8") || cleanedPhone.length != 11) {
      console.log("number: ", phone);
      console.log("clean: ", cleanedPhone);
      console.log("email: ", email, "\npassword: ", password);
      throw new Error("Неверный номер телефона");
    }
    const existingPhone = await User.findOne({
      where: { phone: cleanedPhone },
    });
    if (existingPhone) {
      throw new Error("Этот номер телефона уже используется");
    }
    if (password.length < 8) {
      throw new Error("Пароль должен содержать не менее 8 символов");
    }
    if (email && !emailPattern.test(email)) {
      throw new Error("Недействительный email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      passwordHash: hashedPassword,
      phone: cleanedPhone,
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
  console.log("--------------------------------------------------------");
  try {
    console.log("--------------------------------------------------------");
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("--------------------------------------------------------");
    return decoded;
  } catch (error) {
    console.log("--------------------------------------------------------");
    console.log(token);
    throw new Error("Недействительный токен");
  }
};

export { register, login, verifyToken };
