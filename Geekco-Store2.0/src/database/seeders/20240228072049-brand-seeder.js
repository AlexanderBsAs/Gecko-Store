"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "brands",
      [
        {
          name: "DC",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "LEGO",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Nintendo",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "PlayStation",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Nerf",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Xbox",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Marvel",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Hasbro",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Mattel",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Disney",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Sony",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          name: "Ubisoft",
          createdAt: new Date,
          updatedAt: new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('brands', null, {});
    
  },
};
