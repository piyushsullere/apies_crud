var request 	= require('request');
var mongoose 	= require('mongoose');
var Task 		= require('../controllers/tasks.js');
var genres		=require('../controllers/genres.js');


exports.getTask = function(req,res){
					Task.get('',function(msg,data){
					var obj = JSON.parse(msg);
					obj.data = data;
					res.send(JSON.stringify(obj));
				});
			}

exports.addTask = function(req,res){
					var tasks =req.body.tasks;
					Task.create(tasks,function(str){
					res.send(str);
				});
			}

exports.updateTask = function(req, res){
					var tasks = req.body.tasks;
					//console.log(tasks)
					Task.update(tasks._id, tasks, function(str){
					res.send(str);
				});
			}

exports.removeTask = function(req,res){
					var tasks_id = req.body.tasks;
					Task.remove(tasks_id,function(str){
						res.send(str);
					});
				}

