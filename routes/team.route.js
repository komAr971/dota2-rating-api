const express = require('express');
const { getTeams, getTeam, updateTeam } = require('../controllers/team.controller');

const router = express.Router();

router.get('/', getTeams);
router.get('/:id', getTeam);
router.post('/', updateTeam);

module.exports = router;
