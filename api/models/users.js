var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;
var ObjectId 		= Schema.ObjectId;


var UserSchema 	= new Schema({
	role : {type : String, default : 'user',required : true,trim:true}, 
	name: {type: String,required : true},
	token : {type : String,trim:true},
	password : {type : String,required : true},
	email: {type: String,required : true},
	   
});

module.exports = mongoose.model('users', UserSchema);