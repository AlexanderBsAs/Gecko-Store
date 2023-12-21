const express = require('express');
const router = express.Router();
const {home,search} = require("../controllers/indexController")

router.get('/', home);
router.get('/search', search)

module.exports = router;
