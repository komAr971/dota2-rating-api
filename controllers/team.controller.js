const Team = require('../models/team.model');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ rating_place: 1 });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const updatedTeam = await Team.findById(id);
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({ message: 'Team deleted saccessfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const upsertTeam = async (req, res) => {
  try {
    const team_id = req.body.team_id;
    const team = await Team.findOneAndUpdate({ team_id: team_id }, req.body, {
      upsert: true,
      new: true,
    });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam,
  upsertTeam,
};
