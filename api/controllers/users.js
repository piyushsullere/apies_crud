'use strict';
var User 	= require('../models/users.js');
var genRes 	= require('./genres.js');
var _ 		= require('lodash');


exports.get = function(params,callback){

	User.find(params).exec(function (err,user) {

		if( _.isNull(err) && user.length > 0 ){
			var response = genRes.generateResponse(true,"User found successfully");
			callback(response,user);
		}
		else if( user.length == 0 ){
			var response = genRes.generateResponse(false,"No User found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
};


exports.create = function(params,callback){
	var user = new User(params);
	user.save(function(err,user){
		
		if( !(_.isNull(err)) ){
			var response_string = genRes.generateResponse(false , "There occured some error : "+err.err);
			callback(response_string, null);
		}
		else{
			var response_string = genRes.generateResponse(true,"User created successfully");
			response_string = JSON.parse(response_string);
			response_string.user = user;
			response_string = JSON.stringify(response_string);
			callback(response_string,user);
		}
	})
}


exports.updateToken = function(id,params,callback){
	params = _.omit(params, ['_id', "$$hashKey"]);
	
	User.findByIdAndUpdate(id,{$set:{token:params.token}},function(err,user){
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


exports.getUserListBasedOnRole = function(params,callback){

	User.find({token:params }).exec(function (err,user) {

		if( _.isNull(err) && user.length > 0 ){
			var response = genRes.generateResponse(true,"User found successfully");
			callback(response,user);
		}
		else if( user.length == 0 ){
			var response = genRes.generateResponse(false,"No User found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
};


