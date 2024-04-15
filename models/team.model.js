const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema(
  {
    team_id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: false,
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
    },

    last_match_time: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false },
);

TeamSchema.index({ team_id: 1 }, { unique: true });

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
