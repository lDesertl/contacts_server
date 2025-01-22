import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import sequelize from "./config/db";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
