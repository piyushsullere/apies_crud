var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;
var ObjectId 		= Schema.ObjectId;


var TaskSchema 	= new Schema({
	taskname: {type: String},
	discription : {type: String},
	start_time : {type: String},
	end_time : {type : String},
	status : {type: String, default : 'scheduled'}   
});

module.exports = mongoose.model('task', TaskSchema);