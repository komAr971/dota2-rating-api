const FirstPlace = require('../models/firstPlace.model');

const getFirstPlaces = async (req, res) => {
  try {
    const firstPlaces = await FirstPlace.find().sort({ match_time: -1 });
    res.status(200).json(firstPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFirstPlace = async (req, res) => {
  try {
    const firstPlace = await FirstPlace.create(req.body);
    res.status(200).json(firstPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFirstPlaces,
  addFirstPlace,
};
