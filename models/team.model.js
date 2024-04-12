const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema(
  {
    team_id: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      require: false,
    },

    logo_url: {
      type: String,
      required: false,
    },

    rating_place: {
      type: Number,
      required: true,
      default: 0,
    },

    last_match_time: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
