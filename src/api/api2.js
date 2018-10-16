const express    = require('express');
const app        = express(); 
const Tweet      = require("./../models/Tweet");
const q2m        = require('query-to-mongo');
app.use(express.json())

//   CASE 01 - Only filtering
app.post('/filter',function(req,res){
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
	
	let query = q2m(req.query);
	console.log(query);

	Tweet.find(query.criteria, query.options, paginate)
	.then(function(data) {
		console.log('Response sent');
		res.json(data);
	})
	.catch(function(err) {
		console.log('ERROR OCCURED - ' + err);
		res.json({"error" : false,"message" : "SORRY AN ERROR OCCURRED"});
	});
});
	
app.post('/search',function(req,res){
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
	let query = q2m(req.query);
	
	Tweet.find({$text: { $search: req.body.search}},query.options)
	.then(function(data) {
		console.log('Response sent');
		res.json({"error" : false, message : data});
	})
	.catch(function(err) {
		console.log('ERROR OCCURED - ' + err);
		res.json({"error" : false,"message" : "SORRY AN ERROR OCCURRED"});
	});
	
});


module.exports = app;