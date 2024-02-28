module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'brands',
        timestamps: true
    });
    Brand.associate = (models) => {
        Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
    }
    return Brand;
    
};