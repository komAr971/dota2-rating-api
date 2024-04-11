const express = require('express');
const mongoose = require('mongoose');
const teamRoute = require('./routes/team.route');
const lastMatchEndTimeRoute = require('./routes/lastMatchEndTime.route');

const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api/teams', teamRoute);
app.use('/api/lastMatchEndTime', lastMatchEndTimeRoute);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

mongoose
  .connect(
    'mongodb+srv://dota2-rating-api:5Yi5pbipBijdyDIt@cluster0.paihvfs.mongodb.net/dota2-rating?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(() => {
    console.log('Connection failed!');
  });
