const express = require('express');
const router = express.Router();
const holdingController = require('../controllers/holdingController.js');

router.get('/', holdingController.getHoldingData);
router.post('/', holdingController.createHoldingRecord);
router.delete('/', holdingController.deleteHolding);

module.exports = router;