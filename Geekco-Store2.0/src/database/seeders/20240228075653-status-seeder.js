"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("statuses", [{
      name: 'Processing',
      createdAt: new Date,
      updatedAt: new Date
    },{
      name: 'In transit',
      createdAt: new Date,
      updatedAt: new Date
    },{
      name: 'Completed',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
