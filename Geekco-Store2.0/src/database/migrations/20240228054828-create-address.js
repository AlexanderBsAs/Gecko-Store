'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      country: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(45), 
        allowNull: true,
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
    await queryInterface.dropTable('Addresses');
  }
};