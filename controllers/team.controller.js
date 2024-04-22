const Team = require('../models/team.model');
const FirstPlace = require('../models/firstPlace.model');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().select('-_id').sort({ rating_place: 1 });
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

const addTeam = async (req, res) => {
  try {
    const teamsCount = await Team.countDocuments();
    const lastRatingPlace = teamsCount + 1;
    const teamRatingPlace = req.body.rating_place || lastRatingPlace;

    if (teamRatingPlace > lastRatingPlace) {
      return res.status(400).json({
        error: `Cannot set the team rating place  greater than ${lastRatingPlace}`,
      });
    }

    if (teamRatingPlace < lastRatingPlace) {
      const filter = { rating_place: { $gte: teamRatingPlace } };
      await Team.updateMany(filter, {
        $inc: { rating_place: 1 },
      });
    }

    const team = await Team.create({ ...req.body, rating_place: teamRatingPlace });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
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
      console.log(
        `Cannot set the team rating place  greater than ${lastRatingPlace}`,
      );
      return res.status(400).json({
        error: `Cannot set the team rating place  greater than ${lastRatingPlace}`,
      });
    }

    if (ratingPlaceOld < ratingPlaceNew) {
      console.log(`Cannot update the rating place to a greater value`);
      return res.status(400).json({
        error: `Cannot update the rating place to a greater value`,
      });
    }

    if (ratingPlaceOld > ratingPlaceNew) {
      await Team.findOneAndUpdate({ team_id: id }, { rating_place: 0 });

      const filter = { rating_place: { $lt: ratingPlaceOld, $gte: ratingPlaceNew } };
      await Team.updateMany(filter, {
        $inc: { rating_place: 1 },
      });
    }

    await Team.findOneAndUpdate({ team_id: id }, req.body);

    const updatedTeam = await Team.findOne({ team_id: id });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOneAndDelete({ team_id: id });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const filter = { rating_place: { $gte: team.rating_place } };
    await Team.updateMany(filter, {
      $inc: { rating_place: -1 },
    });

    res.status(200).json({ message: 'Team deleted saccessfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const deleteInactiveTeams = async (req, res) => {
  try {
    const INACTIVE_PERIOD = 6;
    const date = req.body.date ? new Date(req.body.date) : new Date();
    date.setMonth(date.getMonth() - INACTIVE_PERIOD);

    const filter = { last_match_time: { $lt: date } };
    const teamsToDelete = await Team.find(filter).sort({ rating_place: 1 });
    const { deletedCount } = await Team.deleteMany(filter);

    for (const team of teamsToDelete) {
      const filterToUpdate = { rating_place: { $gte: team.rating_place } };
      await Team.updateMany(filterToUpdate, {
        $inc: { rating_place: -1 },
      });
    }

    const firstTeam = await Team.findOne({ rating_place: 1 });
    if (teamsToDelete[0]?.rating_place === 1) {
      await FirstPlace.create({
        team_id: firstTeam.team_id,
        name: firstTeam.name,
        match_time: date,
        league_id: 0,
        league_name: `${teamsToDelete[0].name} was inactive`,
      });
    }

    res.status(200).json({ message: `${deletedCount} inactive teams deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam,
  deleteInactiveTeams,
};
