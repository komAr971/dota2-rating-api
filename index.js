const express = require('express');
const mongoose = require('mongoose');
const teamRoute = require('./routes/team.route');
const matchRoute = require('./routes/match.route');
const lastAnalyzedDateRoute = require('./routes/lastAnalyzedDate.route');
const ratingRoute = require('./routes/rating.route');

const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api/teams', teamRoute);
app.use('/api/matches', matchRoute);
app.use('/api/last-analyzed-date', lastAnalyzedDateRoute);
app.use('/api/rating', ratingRoute);

mongoose
  .connect(
    'mongodb+srv://dota2-rating-api:5Yi5pbipBijdyDIt@cluster0.paihvfs.mongodb.net/dota2-rating?retryWrites=true&w=majority&appName=Cluster0',
    {
      autoIndex: true,
    },
  )
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => console.log(err));
