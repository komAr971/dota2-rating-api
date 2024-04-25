const Rating = require('../models/rating.model');
const Team = require('../models/team.model');

const getRating = async (req, res) => {
  try {
    const { rating } = await Rating.findOne().select('-_id');

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const updateRating = async (req, res) => {
  try {
    const newRating = await Rating.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.status(200).json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getEnrichedRating = async (req, res) => {
  try {
    const { rating } = await Rating.findOne().select('-_id');

    const teams = await Team.aggregate([
      { $match: { team_id: { $in: rating } } },
      {
        $addFields: {
          rating_place: {
            $add: [{ $indexOfArray: [rating, '$team_id'] }, 1],
          },
        },
      },
      { $sort: { rating_place: 1 } },
      { $project: { _id: 0 } },
    ]);

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  getRating,
  updateRating,
  getEnrichedRating,
};
