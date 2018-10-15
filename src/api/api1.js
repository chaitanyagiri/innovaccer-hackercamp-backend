const express = require('express');
const router  = express.Router();

const Twit    = require('twit');
const config  = require('../config');

const Tweet   = require("./../models/Tweet");

const bot     = new Twit(config.twitterKeys);
const param   = config.twitterConfig;

router.route('/').get(function(req,res){
  
	bot.get(
    'search/tweets',
    {
      q: param.queryString+' -filter:retweets AND -filter:replies',
      count: param.searchCount
    },
    (err, data, response) => {
      if (err) {
        console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err);
				res.status(500).send('Internal error cannot search tweets please see log for more description.')
      } 
			else {
				let tweet = [];
				for(let i = 0; i<data.statuses.length;i++){
					tweet.push({
						tweet_id: data.statuses[i].id_str,
						text: data.statuses[i].text,
						screen_name: data.statuses[i].user.screen_name,
						userId: data.statuses[i].user.id_str,
						hashtags: data.statuses[i].entities.hashtags,
						user_mentions: data.statuses[i].entities.user_mentions,
						timestamp: data.statuses[i].created_at,
						quote_count: data.statuses[i].quote_count,
						reply_count: data.statuses[i].reply_count,
						retweet_count: data.statuses[i].retweet_count,
						favourite_count: data.statuses[i].favourite_count
					});
				}
				console.log(JSON.stringify(tweet,null,2));
				
				Tweet.insertMany(tweet)
					.then(function(docs) {
						console.log(param.searchCount.toString() + ' tweets successfully saved in mongoDB database.');
						res.status(200).send(param.searchCount.toString() + ' tweets successfully saved in mongoDB database.' + docs);
					})
					.catch(function(err) {
						console.log('ERROR OCCURED - ' + err);
					});
			}
		}
	)
});

module.exports = router;