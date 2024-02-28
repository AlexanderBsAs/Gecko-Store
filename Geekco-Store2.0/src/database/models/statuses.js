module.exports = (sequelize, DataTypes) => {
  const Statuses = sequelize.define('Statuses', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'statuses',
    timestamps: true 
  });
module.associate = (models)=>
{Statuses.hasMany(models.Order, { foreignKey: 'statuses_id' });}
return Statuses;
};