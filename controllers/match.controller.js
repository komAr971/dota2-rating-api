const Match = require('../models/match.model');

const getMatchesAfter = async (req, res) => {
  try {
    const date = new Date(parseInt(req.params.date));
    const matches = await Match.find({ end_time: { $gt: date.getTime() } })
      .select('-_id')
      .sort({
        end_time: 1,
      });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const addMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getLastMatchEndTime = async (req, res) => {
  try {
    const lastMatch = await Match.findOne().sort({ end_time: -1 }).limit(1);
    res.status(200).json({
      last_match_end_time: lastMatch.end_time,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  getMatchesAfter,
  addMatch,
  getLastMatchEndTime,
};
