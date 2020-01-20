'use strict';
var Task 	= require('../models/tasks.js');
var genRes 	= require('./genres.js');
var _ = require('lodash');


exports.get = function(params,callback){

	Task.find().exec(function (err,tasks) {

		if( _.isNull(err) && tasks.length > 0 ){
			var response = genRes.generateResponse(true,"found successfully");
			callback(response,tasks);
		}
		else if( tasks.length == 0 ){
			var response = genRes.generateResponse(false,"No tasks found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
};


exports.create = function(params,callback){
	var tasks = new Task(params);
	tasks.save(function(err,tasks){
		
		if( !(_.isNull(err)) ){
			var response_string = genRes.generateResponse(false , "There occured some error : "+err.err);
			callback(response_string);
		}
		else{
			var response_string = genRes.generateResponse(true,"tasks created successfully");
			callback(response_string);
		}
	})
};

exports.update = function(id,params,callback){
	params = _.omit(params, ['_id', "$$hashKey"	]);

	Task.findByIdAndUpdate(id,params,function(err,tasks){
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"updated successfully");
			callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response);
		}
	})
};

exports.remove = function(id,callback){
	Task.findByIdAndRemove(id, function (err,tasks) {
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"removed successfully");
			callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response);
		}
	})
};