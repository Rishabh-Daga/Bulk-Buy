const express = require('express');
// const app = express();// import config from './../config/config'
const app = express();
// import app from './express'
const mongoose = require('mongoose')
// import mongoose from 'mongoose'

const PORT = 5000;

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', PORT)
})