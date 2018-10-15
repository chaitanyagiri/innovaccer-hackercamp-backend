var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    user_id: {type:Schema.Types.ObjectId,index:true,unique:true,default:null},    
    screen_name: {type:String,default:null},
    full_name: {type:String,default:null},
		following_count: {type:Number,default:null},
		follower_count: {type:Number,default:null}
});

module.exports = mongoose.model("User",user);