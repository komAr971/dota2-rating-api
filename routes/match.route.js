const express = require('express');
const {
  getMatchesAfter,
  addMatch,
  getLastMatchEndTime,
  setNewTop1,
  unsetNewTop1,
  getTop1Matches,
  setNewTop1Bulk,
  deleteInactive,
} = require('../controllers/match.controller');

const router = express.Router();

router.get('/after/:date', getMatchesAfter);
router.post('/', addMatch);
router.post('/set-new-top-1', setNewTop1);
router.post('/set-new-top-1-bulk', setNewTop1Bulk);
router.post('/unset-new-top-1', unsetNewTop1);
router.get('/top-1', getTop1Matches);
router.get('/last-end-time', getLastMatchEndTime);
router.delete('/inactive', deleteInactive);

module.exports = router;
