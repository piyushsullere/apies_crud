var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;
var ObjectId 		= Schema.ObjectId;
var StudentSchema 	= new Schema({
	first_name		: {type: String},
	last_name 		: {type: String},
	city 			: {type: String},
	company 		: {type: String},
	email 			: {type: String},
	salary 			: {type: Number},
	address 		: {type: String}
});

module.exports = mongoose.model('student', StudentSchema);