const express    = require('express');
const app        = express(); 
const Tweet      = require("./../models/Tweet");

app.use(express.json())

app.post('/',function(req,res){
	console.log(req.body);
  let pageNo = parseInt(req.body.paginate.pageNo)
  let size = parseInt(req.body.paginate.size)
  let paginate = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
	
	//Configuring pagination parameters
	if(req.body.paginate){
		paginate.skip = size * (pageNo - 1);
		paginate.limit = size;
	}else{
		//Default values for pagination if no pagination parameters provided
		paginate.skip = 0;
		paginate.limit = 10;
	}
	
  // CASE 01 - Neither filtering nor search parameters provided
	if(req.body.paginate && !req.body.search && !req.body.filter){
		if(!req.body.sort){
			Tweet.find({},{},paginate)
			.then(function(data) {
				console.log('Response sent');
				res.json(data);
			})
			.catch(function(err) {
				console.log('ERROR OCCURED - ' + err);
				res.json({"error" : false,"message" : "SORRY AN ERROR OCCURRED"});
			});
		}else{
			Tweet.find({},{},paginate).sort(req.body.sort)
			.then(function(data) {
				console.log('Response sent');
				res.json(data);
			})
			.catch(function(err) {
				console.log('ERROR OCCURED - ' + err);
				res.json({"error" : false,"message" : "SORRY AN ERROR OCCURRED"});
			});
		}
	}
	
	// CASE 02 - Only searching parameters provided
	if(req.body.search && !req.body.filter){
		if(!req.body.sort){
			Tweet.find({$text: { $search: req.body.search}})
				.then(function(data) {
					console.log('Response sent');
					res.json({"error" : false, message : data});
				})
				.catch(function(err) {
					console.log('ERROR OCCURED - ' + err);
					res.json({"error" : false,"message" : "SORRY AN ERROR OCCURRED"});
				});
		}else{
			Tweet.find({$text: { $search: req.body.search}}).sort(req.body.sort)
				.then(function(data) {
					console.log('Response sent');
					res.json({"error" : false, message : data});
				})
				.catch(function(err) {
					console.log('ERROR OCCURED - ' + err);
					res.json({"error" : false,"message" : "SORRY AN ERROR OCCURRED"});
				});
		}
	}
	
	// CASE 03 - Only filtering parameters provided 
	if(!req.body.search && req.body.filter){
		
	}
	
});

module.exports = app;