module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
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
        tableName: 'categories',
        timestamps: true
    });
    Category.associate = (models) => {
        Category.hasMany(models.Product, { foreignKey: 'category_id' });
    }
    return Category;
};