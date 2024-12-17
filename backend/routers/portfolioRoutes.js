const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolioController.js');

router.get('/', portfolioController.getPortfolio);
router.post('/', portfolioController.createPortfolio);

module.exports = router;