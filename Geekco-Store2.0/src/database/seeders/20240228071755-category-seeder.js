"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Toy",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Video Game",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Console",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Accessory",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Board Game",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Figuras",
          createdAt: new Date,
          updatedAt: new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('categories', null, {});

  },
};
