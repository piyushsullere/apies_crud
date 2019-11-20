var request 	= require('request');
var mongoose 	= require('mongoose');
var Users 		= require('../controllers/users.js');
var genres		=require('../controllers/genres.js');


exports.getUsers = function(req,res){
					Users.get('',function(msg,data){
					var obj = JSON.parse(msg);
					console.log(obj)
					obj.data = data;
					res.send(JSON.stringify(obj));
				});
			}

exports.addUser = function(req,res){
					var users =req.body.user_history;
					console.log(users);
					Users.create(users,function(str){
					res.send(str);
				});
			}