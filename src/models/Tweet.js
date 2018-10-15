var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tweet = new Schema({
    tweet_id: {type:String,default:null},    
    text: {type:String,default:null},
    screen_name: {type:String,default:null},
    userId: {type:String,default:null},
    hashtags: {type:[{}],default:null},
    user_mentions: {type:[{}],default:null},
    timestamp: {type:Date,default:null},
    quote_count: {type:Number,default:null},
    reply_count: {type:Number,default:null},
		retweet_count: {type:Number,default:null},
		favourite_count: {type:Number,default:null}
});

tweet.index({text: 'text', 'screen_name': 'text' });
module.exports = mongoose.model("Tweet",tweet);