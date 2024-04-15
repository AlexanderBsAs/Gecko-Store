const { Op } = require('sequelize');
const { Product,Category } = require('../database/models/index');

const indexController = {
    home: async (req, res) => {
        try {
            const categories = await Category.findAll({
                include: {
                    model: Product,
                    as: 'products' // Alias de la relación en el modelo Category
                }
            });
    
            const products = await Product.findAll();
            res.render("index", { products,categories });
        } catch (error) {
            console.error("Error al cargar productos:", error);
            res.status(500).send("Error al cargar productos");
        }
    },
    search: async (req, res) => {
        try {
            const { keywords } = req.query;
            const searchResults = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keywords}%` // Búsqueda insensible a mayúsculas y minúsculas en MySQL
                    }
                }
            });
            res.render("results", { search: searchResults, keywords });
        } catch (error) {
            console.error("Error al buscar productos:", error);
            res.status(500).send("Error al buscar productos");
        }
    }
};

module.exports = indexController;