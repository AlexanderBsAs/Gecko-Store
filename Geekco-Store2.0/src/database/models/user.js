'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Rol,{
            as:"rols",
            foreignKey:"rol_id"
        })
        this.hasMany(models.Address,{
          as:"addresses",
          foreignKey:"user_id"
        })
        this.hasMany(models.Cart,{
          as:"carts",
          foreignKey:"user_id"
        })
       }     
  }
  User.init({
    rol_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    password: DataTypes.STRING,
    image:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};