const express = require('express');
const router = express.Router();
const login = require('../controllers/login.controller'); 

router.post('/login', login.login);
router.get('/login', login.logout);
router.post('/register', login.register);

module.exports = router;