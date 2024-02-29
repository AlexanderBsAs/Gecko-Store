"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "platforms",
      [
        {
          name: "Ps4",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "PC",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "PlayStation",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Nintendo Switch",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Nintendo 3DS",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Xbox",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Android",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "iOS",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Xbox Series X",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "PlayStation 5",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Nintendo Wii",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "PC Gaming",
          createdAt: new Date,
          updatedAt: new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('platforms', null, {});
  },
};
