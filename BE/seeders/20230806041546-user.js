"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        firstname: "ruly",
        lastname: "ruly",
        role: "admin",
        username: "ruly",
        password: await bcrypt.hash("ruly", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "visitor",
        lastname: "visitor",
        role: "visitor",
        username: "visitor",
        password: await bcrypt.hash("visitor", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
