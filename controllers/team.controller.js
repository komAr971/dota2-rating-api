const Team = require('../models/team.model');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().select('-_id');
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({ team_id: id }).select('-_id');
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const updateTeam = async (req, res) => {
  try {
    const team_id = req.body.team_id;

    const updatedTeam = await Team.findOneAndUpdate(
      {
        team_id: team_id,
      },
      req.body,
      { upsert: true, new: true },
    );

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const updateTeams = async (req, res) => {
  try {
    const teams = req.body;

    const bulkOps = teams.map((team) => ({
      updateOne: {
        filter: { team_id: team.team_id },
        update: team,
        upsert: true,
      },
    }));

    const result = await Team.bulkWrite(bulkOps);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  getTeams,
  getTeam,
  updateTeam,
  updateTeams,
};
