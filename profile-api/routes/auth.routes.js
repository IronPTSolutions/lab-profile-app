const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');

router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate);
router.get('/profile', secure.isAuthenticated, authController.getProfile);

module.exports = router;
