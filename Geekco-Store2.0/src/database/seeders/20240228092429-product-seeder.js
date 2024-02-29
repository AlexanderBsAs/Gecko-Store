'use strict';
const { getJson } = require('../../utility/jsonMethod')
const products = getJson('products')
const data = products.map((product) => {
  product.createdAt = new Date();
  product.updatedAt = new Date();
  return product;
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('products', data , {});
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('products', null, {});
     
  }
};
