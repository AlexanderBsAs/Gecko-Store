'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Platforms', {
      id:{
        type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
    },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
    tableName:"platforms",
  timestamps: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Platforms');
  }
};