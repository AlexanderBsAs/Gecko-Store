'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statuses_id: {
        type: Sequelize.INTEGER,
        unsigned:true,
        allowNull: false,
        references:{
          model:{
            tableName:"Statuses"
          },
          key:"id"
        },
        onDelete:"cascade"
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unsigned:true,
        references:{
          model:{
            tableName:"Users"
          },
          key:"id"
        },
        onDelete:"cascade"
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      products_id: {
        type: Sequelize.INTEGER,
        unsigned:true,
        allowNull: false,
        references:{
          model:{
            tableName:"Products"
          },
          key:"id"
        },
        onDelete:"cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};