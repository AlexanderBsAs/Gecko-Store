"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "addresses",
      [
        {
          user_id:4,
          country: "Argentina",
          province: "Buenos Aires",
          city: "La Plata",
          address: "Calle 123",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:6,
          country: "Argentina",
          province: "Córdoba",
          city: "Córdoba",
          address: "Avenida 456",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:3,
          country: "Argentina",
          province: "Santa Fe",
          city: "Rosario",
          address: "Calle 789",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:2,
          country: "Argentina",
          province: "Mendoza",
          city: "Mendoza",
          address: "Avenida 012",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:7,
          country: "Argentina",
          province: "Salta",
          city: "Salta",
          address: "Calle 345",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:1,
          country: "Argentina",
          province: "Buenos Aires",
          city: "Mar del Plata",
          address: "Calle San Martín #234",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:9,
          country: "Argentina",
          province: "Misiones",
          city: "Posadas",
          address: "Avenida Uruguay #567",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:10,
          country: "Argentina",
          province: "Chubut",
          city: "Comodoro Rivadavia",
          address: "Calle Rivadavia #890",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id: 8,
          country: "Argentina",
          province: "Tucumán",
          city: "San Miguel de Tucumán",
          address: "Avenida Belgrano #1234",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          user_id:5,
          country: "Argentina",
          province: "Corrientes",
          city: "Corrientes",
          address: "Calle Junín #5678",
          createdAt: new Date,
          updatedAt: new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("addresses", null, {});
  },
};
