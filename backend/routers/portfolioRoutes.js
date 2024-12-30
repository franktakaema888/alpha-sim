const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController.js');

router.get('/user/:username', portfolioController.getPortfolio);
router.post('/', portfolioController.createPortfolio);
router.delete('/', portfolioController.deletePortfolio);

router.get('/:username', portfolioController.getPortfolioByUsername);
router.get('/holdings/:portfolioId', portfolioController.getHoldingsByPortfolioId);

module.exports = router;