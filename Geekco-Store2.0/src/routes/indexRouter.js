const express = require('express');
const router = express.Router();t
const {home} = require("../controllers/indexController")
router.get('/', home);

module.exports = router;
