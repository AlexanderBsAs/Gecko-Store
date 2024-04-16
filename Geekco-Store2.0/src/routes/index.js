const express = require('express');
const router = express.Router();
const {home,search, FAQ} = require("../controllers/indexController")

router.get('/', home);
router.get('/search', search)
router.get('/FAQ', FAQ)

module.exports = router;
