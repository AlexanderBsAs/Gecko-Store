'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        as:"users",
        foreignKey:"user_id"
      })
      this.belongsTo(models.Status,{
        as:"statuses",
        foreignKey:"statuses_id"
      })
    }
  }
  Cart.init({
    statuses_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    products_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};