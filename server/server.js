require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const textRouter = require('./routes/text');

const app = express();

const mongoDB = process.env.ATLAS_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

app.use(cors());
app.use(express.json());

app.use('/api/text', textRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});