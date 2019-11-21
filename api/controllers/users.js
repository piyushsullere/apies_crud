'use strict';
var Users 	= require('../models/users.js');
var genRes 	= require('./genres.js');
var _ 		= require('lodash');


exports.get = function(params,callback){

	Users.find().exec(function (err,users) {

		if( _.isNull(err) && users.length > 0 ){
			var response = genRes.generateResponse(true,"found successfully");
			callback(response,users);
		}
		else if( users.length == 0 ){
			var response = genRes.generateResponse(false,"No users found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
};


exports.create = function(params,callback){
	var users = new Users(params);
	users.save(function(err,users){
		
		if( !(_.isNull(err)) ){
			var response_string = genRes.generateResponse(false , "There occured some error : "+err.err);
			callback(response_string);
		}
		else{
			var response_string = genRes.generateResponse(true,"users created successfully");
			callback(response_string);
		}
	})
};

exports.update = function(id,params,callback){
	params = _.omit(params, ['_id', "$$hashKey"]);
	//console.log(params)
	Users.findByIdAndUpdate(id,params,function(err,users){
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
	Users.findByIdAndRemove(id, function (err,users) {
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