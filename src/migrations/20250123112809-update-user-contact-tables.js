"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING(255),
    });

    await queryInterface.changeColumn("users", "phone", {
      type: Sequelize.STRING(20),
    });

    await queryInterface.changeColumn("contacts", "phone", {
      type: Sequelize.STRING(20),
    });

    await queryInterface.changeColumn("contacts", "name", {
      type: Sequelize.STRING(50),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("users", "phone", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("contacts", "phone", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("contacts", "name", {
      type: Sequelize.STRING,
    });
  },
};
