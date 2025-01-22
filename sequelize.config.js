const path = require("path");

module.exports = {
  development: {
    username: "postgres",
    password: "admin",
    database: "contacts_db",
    host: "127.0.0.1",
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    migrationStoragePath: path.resolve(__dirname, "src/migrations"),
    models: [path.resolve(__dirname, "src/models/**/*.js")],
  },
  test: {
    username: "postgres",
    password: "admin",
    database: "contacts_db_test",
    host: "127.0.0.1",
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    migrationStoragePath: path.resolve(__dirname, "src/migrations"),
    models: [path.resolve(__dirname, "src/models/**/*.js")],
  },
  production: {
    username: "postgres",
    password: "admin",
    database: "contacts_db_prod",
    host: "127.0.0.1",
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    migrationStoragePath: path.resolve(__dirname, "src/migrations"),
    models: [path.resolve(__dirname, "src/models/**/*.js")],
  },
};
