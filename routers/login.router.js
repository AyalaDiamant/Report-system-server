const express = require('express');
const loginController = require('../controllers/login.controller');

const router = express.Router();

// מסלולים עבור הלוגין
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;
