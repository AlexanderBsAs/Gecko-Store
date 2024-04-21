"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Juguetes",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Video Juegos",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Consolas",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Accesorios",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Juegos de mesa",
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
