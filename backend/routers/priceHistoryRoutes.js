const express = require('express');
const router = express.Router();
const priceHistoryController = require('../controllers/priceHistoryController.js');

router.get('/:symbol/:interval', priceHistoryController.getStockPriceHistory);

module.exports = router;