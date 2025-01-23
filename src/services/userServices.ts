import bcrypt from "bcryptjs";
import User from "../models/user";
const updateUser = async (
  id: number,
  email?: string,
  password?: string,
  phone?: string
) => {
  try {
    console.log(
      "-------------------------------------------------------------------------\n",
      "id: ",
      id,
      "\n",
      "email: ",
      email,
      "\n",
      "password: ",
      password,
      "\n",
      "phone: ",
      phone,
      "\n"
    );
    if (!id) {
      throw new Error("ID пользователя не указан");
    }
    // проверяем наличие и валидность почты
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fieldsToUpdate: Partial<{
      email: string;
      passwordHash: string;
      phone: string;
    }> = {};
    if (email) {
      if (!emailPattern.test(email)) {
        throw new Error("Недействительный email");
      }
      fieldsToUpdate.email = email;
    }
    // проверяем наличие и валидность номера
    if (phone) {
      const cleanedPhone = phone.replace(/[^\d+]/g, "");
      if (!cleanedPhone.startsWith("8") || cleanedPhone.length != 11) {
        console.log("cleanedPhone: ", cleanedPhone);
        throw new Error("Неверный номер телефона");
      }
      fieldsToUpdate.phone = cleanedPhone;
    }
    // проверяем наличие и валидность пароля
    if (password) {
      if (password.length < 8) {
        throw new Error("Пароль должен быть не менее 8 символов");
      }
      fieldsToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }
    // проверяем наличие полей для обновления
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error("Нет данных для обновления");
    }
    const updatedUser = await User.update(fieldsToUpdate, { where: { id } });
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const deleteUser = async (id: number) => {
  try {
    await User.destroy({ where: { id } });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export { updateUser, deleteUser };
