'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart,{
        as:"carts",
        foreignKey:"products_id"
      })
      this.belongsTo(models.Category,{
        as:"categories",
        foreignKey:"category_id"

      })
      this.belongsTo(models.Brand,{
        as:"brands",
        foreignKey:"brand_id"
      })
      this.belongsTo(models.Platform,{
        as:"platforms",
        foreignKey:"platform_id"
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    installmentes: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    platform_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};