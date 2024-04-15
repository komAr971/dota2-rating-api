const express = require('express');
const mongoose = require('mongoose');
const teamRoute = require('./routes/team.route');
const lastMatchEndTimeRoute = require('./routes/lastMatchEndTime.route');
const firstPlaceRoute = require('./routes/firstPlace.route');

const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api/teams', teamRoute);
app.use('/api/lastMatchEndTime', lastMatchEndTimeRoute);
app.use('/api/firstPlaces', firstPlaceRoute);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const options = {
  autoIndex: true, //this is the code I added that solved it all
};

mongoose
  .connect(
    'mongodb+srv://dota2-rating-api:5Yi5pbipBijdyDIt@cluster0.paihvfs.mongodb.net/dota2-rating?retryWrites=true&w=majority&appName=Cluster0',
    options,
  )
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => console.log(err));
