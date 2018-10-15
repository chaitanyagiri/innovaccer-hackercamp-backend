const express  = require('express');
const router   = express.Router();
const csv      = require('csv-express');
const mongoose = require('mongoose');
const Tweet    = require("./../models/Tweet");

router.get('/', function(req, res, next) {
	let filename   = "tweets.csv";
	let dataArray;
	Tweet.find().lean().exec({}, function(err, tweets) {
		if(err){
			res.send(err);
		}else{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader("Content-Disposition", 'attachment; filename='+filename);
			res.csv(tweets, true);
			console.log('tweets.csv file exported!');
		}
	});

 });

module.exports = router;