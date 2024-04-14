const express = require('express');
const {
  getFirstPlaces,
  addFirstPlace,
} = require('../controllers/firstPlace.controller');

const router = express.Router();

router.get('/', getFirstPlaces);
router.post('/', addFirstPlace);

module.exports = router;
