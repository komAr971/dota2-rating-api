const mongoose = require('mongoose');

const FirstPlaceSchema = mongoose.Schema(
  {
    team_id: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: false,
    },

    match_time: {
      type: Date,
      required: true,
    },

    league_id: {
      type: Number,
      required: true,
    },

    league_name: {
      type: String,
      required: false,
    },
  },
  { versionKey: false },
);

const FirstPlace = mongoose.model('FirstPlace', FirstPlaceSchema);

module.exports = FirstPlace;
