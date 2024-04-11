const express = require('express');
const {
  getLastMatchEndTime,
  updateLastMatchEndTime,
} = require('../controllers/lastMatchEndTime.controller');

const router = express.Router();

router.get('/', getLastMatchEndTime);
router.post('/', updateLastMatchEndTime);

module.exports = router;
