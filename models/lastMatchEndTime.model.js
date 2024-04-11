const mongoose = require('mongoose');

const LastMatchEndTimeSchema = mongoose.Schema({
  last_match_end_time: {
    type: Date,
    require: true,
  },
});

const LastMatchEndTime = mongoose.model(
  'LastMatchEndTime',
  LastMatchEndTimeSchema,
  'last_match_end_time',
);

module.exports = LastMatchEndTime;
