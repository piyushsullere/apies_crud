'use strict';
var Task 	= require('../models/tasks.js');
var genRes 	= require('./genres.js');
var _ 		= require('lodash');



exports.get = function(params,callback){

	Task.find(params).sort({start_time:1}).exec(function (err,task) {

		if( _.isNull(err) && task.length > 0 ){
			var response = genRes.generateResponse(true,"Task found successfully");
			callback(response,task);
		}
		else if( task.length == 0 ){
			var response = genRes.generateResponse(false,"No Task found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
};

exports.getTaskByTime = function(params,callback){

	Task.find({$and: [{start_time:{'$gte': params.start_time}},{end_time:{'$lte': params.end_time}}]}).sort({start_time:1}).exec(function (err,task) {

		if( _.isNull(err) && task.length > 0 ){
			var response = genRes.generateResponse(true,"Task found successfully");
			callback(response,task);
		}
		else if( task.length == 0 ){
			var response = genRes.generateResponse(false,"No Task found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
};



exports.create = function(params,callback){
	var task = new Task(params);
	task.save(function(err,task){
		
		if( !(_.isNull(err)) ){
			var response_string = genRes.generateResponse(false , "There occured some error : "+err.err);
			callback(response_string, null);
		}
		else{
			var response_string = genRes.generateResponse(true,"Task created successfully");
			response_string = JSON.parse(response_string);
			response_string.task = task;
			response_string = JSON.stringify(response_string);
			callback(response_string,task);
		}
	})
}



exports.update = function(id,params,callback){
	params = _.omit(params, ['_id', "$$hashKey"]);
	Task.findByIdAndUpdate(id,params,function(err,task){
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"Task updated successfully");
			callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response);
		}
	})
};

exports.remove = function(id,callback){
	Task.findByIdAndRemove(id, function (err,task) {
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"Task removed successfully");
			callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response);
		}
	})
};



