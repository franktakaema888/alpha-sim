const express = require('express');
const router = express.Router();
const stockPriceController = require('../controllers/stockPriceController.js');

router.get('/quote/:symbol', stockPriceController.getCurrentPrice);

module.exports = router;