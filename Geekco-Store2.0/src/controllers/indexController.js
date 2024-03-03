const db = require("../database/models");

const indexController = {
    home: (req, res) => {
        db.Product.findAll({
            include: [
                { association: 'Image_products' }, 
                { association: 'Category_products', attributes: ['category'] } 
            ]
        })
        .then(products => {
            res.render("index", { products });
        })
        .catch((error) => console.log(error));
    },
    search: (req, res) => {
        let { keywords } = req.query;
        db.Product.findAll({
            where: {
                name: {
                    [db.Sequelize.Op.iLike]: `%${keywords}%`
                }
            },
            include: [
                { 
                    association: 'Image_products' 
                }, 
                { 
                    association: 'Category_products',
                    attributes: ['category'] 
                    } 
            ]
        })
        .then(search => {
            res.render("results", { search, keywords });
        })
        .catch((error) => console.log(error));
    }
};

module.exports = indexController;