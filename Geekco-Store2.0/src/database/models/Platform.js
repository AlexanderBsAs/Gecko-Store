module.exports = (sequelize, DataTypes) => {
    const Platform = sequelize.define("Platform", {
        id:{
            type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    }, {
        tableName:"platforms",
      timestamps: true
    });
    Platform.associate = models => {
        Platform.hasMany(models.Product, { foreignKey: 'platform_id' });
    };
    return Platform;
  };