module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Products", {
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    installments: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    brand_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    platform_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true 
    }
  },
    {
      tableName: 'products', 
      timestamps: true 
      }
      );
      Product.associate = (models) => {
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
      Product.belongsTo(models.Platform, { foreignKey: 'platform_id' });
      Product.belongsToMany(models.Order, { through: 'OrderProduct', foreignKey: 'product_id' });
      }
    return Product;
  };