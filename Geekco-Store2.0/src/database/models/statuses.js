'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart,{
        as:"carts",
        foreignKey:"statuses_id"
      })
      this.belongsTo(models.Product,{
        as:"products",
        foreignKey:"products_id"
      })
    }
  }
  Statuses.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Statuses',
  });
  return Statuses;
};