const express = require("express");
const router = express.Router();    

const { getAll,getMostPopularCategory } = require("../../controllers/api/APIcategories");

router.get('/', getAll)
router.get("/count",getMostPopularCategory)
module.exports = router;