// const express = require('express');

// const router = express.Router();
// const login = require('../controllers/login.controller'); 

// router.post('/login', login.login);
// router.get('/login', login.logout);
// router.post('/register', login.register);

// module.exports = router;

const express = require('express');
const loginController = require('../controllers/login.controller');

const router = express.Router();

// מסלולים עבור הלוגין
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;
