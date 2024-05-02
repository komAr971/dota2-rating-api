const Match = require('../models/match.model');

const getMatchesAfter = async (req, res) => {
  try {
    const date = new Date(parseInt(req.params.date));
    const matches = await Match.find({ end_time: { $gt: date.getTime() } }).select(
      '-_id',
    );
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

const setNewTop1 = async (req, res) => {
  try {
    const match_id = req.body.match_id;
    const updatedMatch = await Match.findOneAndUpdate(
      {
        match_id: match_id,
      },
      { new_top_1: true },
      {
        new: true,
      },
    );
    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const setNewTop1Bulk = async (req, res) => {
  try {
    const matches = req.body;

    const bulkOps = matches.map((match_id) => ({
      updateOne: {
        filter: { match_id: match_id },
        update: { new_top_1: true },
      },
    }));

    const result = await Match.bulkWrite(bulkOps);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const unsetNewTop1 = async (req, res) => {
  try {
    const updateResult = await Match.updateMany(
      {
        new_top_1: true,
      },
      { $unset: { new_top_1: 1 } },
    );
    res.status(200).json({
      message: `${updateResult.modifiedCount} matches updated. new_top_1 flag removed.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getTop1Matches = async (req, res) => {
  try {
    const top1Matches = await Match.find({ new_top_1: true })
      .select('-_id')
      .sort({ end_time: -1 });
    res.status(200).json(top1Matches);
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

const deleteInactive = async (req, res) => {
  try {
    await Match.deleteMany({ match_id: { $lt: 0 } });
    res.status(200).json({ message: 'Inactive matches was deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  getMatchesAfter,
  addMatch,
  setNewTop1,
  setNewTop1Bulk,
  unsetNewTop1,
  getTop1Matches,
  getLastMatchEndTime,
  deleteInactive,
};
