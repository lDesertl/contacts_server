import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
  id: number;
  email: string | null;
  phone: string;
  passwordHash: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public phone!: string;
  public passwordHash!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password_hash",
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
