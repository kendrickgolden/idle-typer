require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const mongoDB = process.env.ATLAS_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});