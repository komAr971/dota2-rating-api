const express = require('express');
const {
  getMatchesAfter,
  addMatch,
  getLastMatchEndTime,
} = require('../controllers/match.controller');

const router = express.Router();

router.get('/after/:date', getMatchesAfter);
router.post('/', addMatch);
router.get('/last-end-time', getLastMatchEndTime);

module.exports = router;
