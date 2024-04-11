const LastMatchEndTime = require('../models/lastMatchEndTime.model');

const getLastMatchEndTime = async (req, res) => {
  try {
    const lastMatchEndTime = await LastMatchEndTime.findOne();
    res.status(200).json(lastMatchEndTime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLastMatchEndTime = async (req, res) => {
  try {
    await LastMatchEndTime.findOneAndUpdate({}, req.body, {
      upsert: true,
    });

    const updatedLastMatchEndTime = await LastMatchEndTime.findOne();
    res.status(200).json(updatedLastMatchEndTime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLastMatchEndTime,
  updateLastMatchEndTime,
};
