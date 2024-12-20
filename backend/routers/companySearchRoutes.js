const express = require('express');
const router = express.Router();
const companySearchController = require('../controllers/companySearchController');

router.get('/search/:companyName', companySearchController.searchCompanyByName);

module.exports = router;