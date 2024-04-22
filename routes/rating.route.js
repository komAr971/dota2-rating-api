const express = require('express');
const {
  getRating,
  updateRating,
  getEnrichedRating,
} = require('../controllers/rating.controller');

const router = express.Router();

router.get('/', getRating);
router.post('/', updateRating);
router.get('/enriched', getEnrichedRating);

module.exports = router;
