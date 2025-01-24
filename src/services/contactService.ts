import Contact from "../models/contact";
const createContact = async (name: string, phone: string, userId: number) => {
  try {
    if (!name || !phone) {
      throw new Error("Нужно заполнить все поля");
    }
    if (phone.length > 30) {
      throw new Error("Недопустимая длина номера телефона");
    }
    if (name.length > 80) {
      throw new Error("Недопустимая длина имени");
    }
    const contact = await Contact.create({ name, phone, userId });
    return contact;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteContact = async (id: number, userId: number) => {
  try {
    const contact = await Contact.findOne({ where: { id, userId } });
    if (!contact) {
      throw new Error("Контакт не найден");
    }
    await Contact.destroy({ where: { id } });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateContact = async (
  id: number,
  userId: number,
  name?: string,
  phone?: string
) => {
  try {
    const fieldsToUpdate: Partial<{ name: string; phone: string }> = {};
    const contact = await Contact.findOne({ where: { id, userId } });
    if (!contact) {
      throw new Error("Контакт не найден");
    }
    if (name) fieldsToUpdate.name = name;
    if (phone) fieldsToUpdate.phone = phone;
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error("Нет данных для обновления");
    }
    await Contact.update(fieldsToUpdate, { where: { id } });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const findContactById = async (id: number, userId: number) => {
  try {
    const contact = await Contact.findOne({ where: { id, userId } });
    return contact;
  } catch (error: any) {
    throw new Error("Контакт не найден");
  }
};

const getUserContacts = async (userId: number) => {
  try {
    const contacts = await Contact.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    return contacts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  createContact,
  deleteContact,
  updateContact,
  getUserContacts,
  findContactById,
};
