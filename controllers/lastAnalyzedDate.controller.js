const LastAnalyzedDate = require('../models/lastAnalyzedDate.model');

const getLastAnalyzedDate = async (req, res) => {
  try {
    const lastAnalyzedDate = await LastAnalyzedDate.findOne().select('-_id');
    res.status(200).json(lastAnalyzedDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const updateLastAnalyzedDate = async (req, res) => {
  try {
    const newDate = await LastAnalyzedDate.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.status(200).json(newDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  getLastAnalyzedDate,
  updateLastAnalyzedDate,
};
