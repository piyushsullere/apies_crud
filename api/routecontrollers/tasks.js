var request 	= require('request');
var mongoose 	= require('mongoose');
var Task 		= require('../controllers/tasks.js');
var genRes		=require('../controllers/genres.js');
mongoose.set('debug',true)


/* get Task data */
exports.getTasks = function(req,res){
		var query = req.query;
		Task.get(query,function(msg,data){
			var obj = JSON.parse(msg);
			obj.data = data;
			if(obj.status){
				res.send(genRes.generateResponse(obj.status,obj.message,200,obj.data));
			}
			else{
				res.send(genRes.generateResponse(obj.status, obj.message,200,null));
			}
		});
	}


/* get Task data by time */
exports.getTaskByTime = function(req,res){
		var query = req.query;
		console.log(query)
		Task.getTaskByTime(query,function(msg,data){
			var obj = JSON.parse(msg);
			obj.data = data;
			if(obj.status){
				res.send(genRes.generateResponse(obj.status,obj.message,200,obj.data));
			}
			else{
				res.send(genRes.generateResponse(obj.status, obj.message,200,null));
			}
		});
	}


/* add Task data */
exports.addTask = function(req,res){
			var task = req.body.task;
			Task.create(task,function(str,data){
			var obj = JSON.parse(str)
			obj.data = data;
			if(obj.status){
				res.send(genRes.generateResponse(obj.status,obj.message,200,obj.data));
			}
			else{
				res.send(genRes.generateResponse(obj.status, obj.message,200,null));
			}
		});
	}

/* update Task data */
exports.updateTask = function(req, res){
		var task = req.body.task;
		console.log(task)
		Task.update(task._id, task, function(str){
			var obj = JSON.parse(str)
			if(obj.status){
				res.send(genRes.generateResponse(obj.status,obj.message,200,obj.data));
			}
			else{
				res.send(genRes.generateResponse(obj.status, obj.message,200,null));
			}
		});
	}

/* remove Task data */
exports.removeTask = function(req,res){
		var taskId = req.body.task;
		Task.remove(taskId,function(str){
			var obj = JSON.parse(str)
			if(obj.status){
				res.send(genRes.generateResponse(obj.status,obj.message,200,obj.data));
			}
			else{
				res.send(genRes.generateResponse(obj.status, obj.message,200,null));
			}
		});
	}