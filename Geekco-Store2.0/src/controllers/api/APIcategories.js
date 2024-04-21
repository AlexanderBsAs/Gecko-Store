const db = require("../../database/models");

const categoriesInDb = {
  getAll: async (req, res) => {
    try {
      const categories = await db.Category.findAll();
      if (categories.length > 0) {
        const categoriesJson = categories.map((category) => {
          const categoryJson = category.toJSON();
          categoryJson.detail = `http://localhost:3000/api/categories/${category.id}`;
          return categoryJson;
        });

        return res.status(200).json({
          meta: {
            status: 200,
            total: categories.length,
            url: "/api/categories",
          },
          data: categoriesJson,
        });
      } else {
        throw new Error("No existen categorías en la base de datos.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getMostPopularCategory: async (req, res) => {
    try {
      const products = await db.Product.findAll();

      const getCategoryName = async (categoryId) => {
        const category = await db.Category.findByPk(categoryId);
        return category.name;
      };

      const categoryCounts = {};
      for (const product of products) {
        const categoryId = product.category_id;
        const categoryName = await getCategoryName(categoryId);
        if (categoryCounts[categoryName]) {
          categoryCounts[categoryName]++;
        } else {
          categoryCounts[categoryName] = 1;
        }
      }
      const categoryCountsArray = Object.keys(categoryCounts).map((key) => ({
        name: key,
        count: categoryCounts[key],
      }));

      if (categoryCounts) {
        res.status(200).json(
          // [categoryCounts]
          {
            meta: {
              status: 200,
              total: categoryCountsArray.length,
              url: "/api/categories/count",
            },
            data: categoryCountsArray,
          });
        // let maxCategory = null;
        // let maxCount = 0;
        // for (const categoryId in categoryCounts) {
        //   if (categoryCounts[categoryId] > maxCount) {
        //     maxCount = categoryCounts[categoryId];
        //     maxCategory = await db.Category.findByPk(categoryId);
        //   }
        // }
        // if (maxCategory) {
        //   res.status(200).json({
        //     mostPopularCategory: {
        //       id: maxCategory.id,
        //       name: maxCategory.name,
        //       productCount: maxCount,
        //     },
        //   });
      } else {
        res
          .status(404)
          .json({ error: "No se encontraron categorías o productos" });
      }
    } catch (error) {
      console.error("Error al obtener la categoría más popular:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

module.exports = categoriesInDb;
