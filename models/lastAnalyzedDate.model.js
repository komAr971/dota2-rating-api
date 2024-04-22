const mongoose = require('mongoose');

const LastAnalyzedDateSchema = mongoose.Schema(
  {
    last_analyzed_date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false },
);

const LastAnalyzedDate = mongoose.model(
  'LastAnalyzedDate',
  LastAnalyzedDateSchema,
  'last_analyzed_date',
);

module.exports = LastAnalyzedDate;
