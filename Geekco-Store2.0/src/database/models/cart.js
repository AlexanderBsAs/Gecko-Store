module.exports = (sequelize, DataTypes) => {
  const  Cart = sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    statuses_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }},{
      tableName:"carts",
      timestamps:true,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.Statuses, { foreignKey: 'statuses_id' });
    Cart.belongsToMany(models.Product, { through: 'OrderProduct', foreignKey: 'order_id' });
  };

  return Cart;
};