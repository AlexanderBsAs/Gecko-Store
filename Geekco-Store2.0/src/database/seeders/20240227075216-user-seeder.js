"use strict";

const { getJson } = require("../../utility/jsonMethod");
const bcrypt = require("bcryptjs");
const users = getJson("users");

const data = users.map((user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
