'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unsigned:true
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        unsigned:true,
        references:{
          model:{
            tableName:"rols"
          },
          key:"id"
        },
        onDelete:"cascade"
      },
      first_name: {
        type: Sequelize.STRING(45),
        allowNull:false

      },
      last_name: {
        type: Sequelize.STRING(45),
        allowNull:false
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
     image: {
        type: Sequelize.STRING(80),
        allowNull:false
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
    await queryInterface.dropTable('Users');
  }
};