const express = require('express');
const {
  getLastAnalyzedDate,
  updateLastAnalyzedDate,
} = require('../controllers/lastAnalyzedDate.controller');

const router = express.Router();

router.get('/', getLastAnalyzedDate);
router.post('/', updateLastAnalyzedDate);

module.exports = router;
