const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/games')

// Public Routes
router.post('/', gamesCtrl.create);
router.get('/', gamesCtrl.index)


module.exports = router;

