const express = require('express');
const {
  getTeams,
  getTeam,
  updateTeam,
  updateTeams,
  deleteTeams,
} = require('../controllers/team.controller');

const router = express.Router();

router.get('/', getTeams);
router.get('/:id', getTeam);
router.post('/update', updateTeam);
router.post('/', updateTeams);
router.delete('/', deleteTeams);

module.exports = router;
