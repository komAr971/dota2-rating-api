const mongoose = require('mongoose');

const MatchSchema = mongoose.Schema(
  {
    match_id: {
      type: Number,
      required: true,
      unique: true,
    },

    end_time: {
      type: Date,
      required: true,
    },

    winner_team_id: {
      type: Number,
      required: true,
    },

    winner_name: {
      type: String,
      required: true,
    },

    looser_team_id: {
      type: Number,
      required: true,
    },

    looser_name: {
      type: String,
      required: true,
    },

    league_id: {
      type: Number,
      required: true,
    },

    league_name: {
      type: String,
      required: true,
    },

    new_top_1: {
      type: Boolean,
      required: false,
    },
  },
  { versionKey: false },
);

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
