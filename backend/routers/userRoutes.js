const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js') // import user controller

router.get('/', userController.getUser);
router.post('/', userController.createUser);

module.exports = router;