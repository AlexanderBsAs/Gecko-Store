'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unsigned:true
      },
      installmentes: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned:true
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned:true
      },
      brand_id: {
        type: Sequelize.INTEGER,
        unsigned:true,
        references:{
          model:{
            tableName:"Brands"
          },
          key:"id"
        },
        onDelete:"cascade"
    
      },
      platform_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned:true,
        references:{
          model:{
            tableName:"Platforms"
          },
          key:"id"
        },
        onDelete:"cascade"
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unsigned:true,
        references:{
          model:{
            tableName:"Categories"
          },
          key:"id"
        },
        onDelete:"cascade"
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(100),
        allowNull: false,
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
    await queryInterface.dropTable('Products');
  }
};