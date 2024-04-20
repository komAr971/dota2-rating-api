const express = require('express');
const {
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam,
  deleteInactiveTeams,
} = require('../controllers/team.controller');

const router = express.Router();

router.get('/', getTeams);
router.get('/:id', getTeam);

//add a team
router.post('/', addTeam);

//update a team
router.put('/:id', updateTeam);

//delete a team
router.delete('/:id', deleteTeam);

//delete inactive teams
router.post('/delete-inactive', deleteInactiveTeams);

module.exports = router;
