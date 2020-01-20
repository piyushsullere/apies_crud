var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;
var ObjectId 		= Schema.ObjectId;
var TaskSchema 	= new Schema({
	
	task : {type: String}
});

module.exports = mongoose.model('task', TaskSchema);