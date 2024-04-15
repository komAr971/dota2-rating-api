const Team = require('../models/team.model');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().select('-_id').sort({ rating_place: 1 });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({ team_id: id }).select('-_id');
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTeam = async (req, res) => {
  try {
    const teamsCount = await Team.countDocuments();
    const lastRatingPlace = teamsCount + 1;
    const teamRatingPlace = req.body.rating_place;

    if (teamRatingPlace > lastRatingPlace) {
      return res.status(400).json({
        error: `Cannot set the team rating place  greater than ${lastRatingPlace}`,
      });
    }

    if (teamRatingPlace < lastRatingPlace) {
      const filter = { rating_place: { $gte: teamRatingPlace } };
      const updatedTeams = await Team.updateMany(filter, {
        $inc: { rating_place: 1 },
      });
    }
    const team = await Team.create(req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findOne({ team_id: id });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const teamsCount = await Team.countDocuments();
    const lastRatingPlace = teamsCount + 1;

    const ratingPlaceOld = team.rating_place;
    const ratingPlaceNew = req.body.rating_place;

    if (ratingPlaceNew > lastRatingPlace) {
      return res.status(400).json({
        error: `Cannot set the team rating place  greater than ${lastRatingPlace}`,
      });
    }

    if (ratingPlaceOld < ratingPlaceNew) {
      return res.status(400).json({
        error: `Cannot update the rating place to a greater value`,
      });
    }

    if (ratingPlaceOld > ratingPlaceNew) {
      await Team.findOneAndUpdate({ team_id: id }, { rating_place: 0 });

      const filter = { rating_place: { $lt: ratingPlaceOld, $gte: ratingPlaceNew } };
      const updatedTeams = await Team.updateMany(filter, {
        $inc: { rating_place: 1 },
      });
    }

    await Team.findOneAndUpdate({ team_id: id }, req.body);

    const updatedTeam = await Team.findOne({ team_id: id });
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

module.exports = {
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam,
};
