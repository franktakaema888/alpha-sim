const express = require('express');
const router = express.Router();
const holdingController = require('../controllers/holdingController.js');

router.get('/', holdingController.getHoldingData);

module.exports = router;