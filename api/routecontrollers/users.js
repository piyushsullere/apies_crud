var request 	= require('request');
var mongoose 	= require('mongoose');
var Users 		= require('../controllers/users.js');
var genres		=require('../controllers/genres.js');


exports.getUsers = function(req,res){
					Users.get('',function(msg,data){
					var obj = JSON.parse(msg);
					obj.data = data;
					res.send(JSON.stringify(obj));
				});
			}

exports.addUser = function(req,res){
					var users =req.body.users_history;
					Users.create(users,function(str){
					res.send(str);
				});
			}

exports.updateUser = function(req, res){
					var users = req.body.users_history;
					//console.log(users)
					Users.update(users._id, users, function(str){
					res.send(str);
				});
			}

exports.removeUser = function(req,res){
					var users_id = req.body.users_history;
					Users.remove(users_id,function(str){
						res.send(str);
					});
				}