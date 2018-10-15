const config = require('./config');
const consoleLol = require('console.lol');
const api1 = require('./api/api1');
const api2 = require('./api/api2');
const api3 = require('./api/api3');

const express = require('express');
// Set up the express app
const app = express();
let port = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = mongoose.connect("mongodb://localhost/innovaccer",{ useNewUrlParser: true });

app.use('/api1',api1);
app.use('/api2',api2);
app.use('/api3',api3);

console.rofl('APIs starting...')
  
app.listen(port, function () {
   console.log('Updated : Server listening at port %d', port);
}); 