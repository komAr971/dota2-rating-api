const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema(
  {
    rating: [Number],
  },
  { versionKey: false },
);

const Rating = mongoose.model('Rating', RatingSchema, 'rating');

module.exports = Rating;
