var request 	= require('request');
var mongoose 	= require('mongoose');
var User 		= require('../controllers/users.js');
var genRes		=require('../controllers/genres.js');
mongoose.set('debug',true)
var database 		= require('../../config/db.js');
var secure				= require('../../config/secure.js')
var jwt             = require('jsonwebtoken');	


/* add users data */
exports.addUser = function(req,res){
			var user = req.body.user;
			User.create(user,function(str,data){
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

/* get users data */
exports.getUsers = function(req,res){
		var query = req.query;
		User.get(query,function(msg,data){
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

/* users login based on JWT */
exports.login = function(req,res){
			var query = req.body.credentials;
			var params={
				username:query.username
			}
			User.get(query,function(msg,data){
				var obj = JSON.parse(msg);
				obj.data = data;
				if(obj.status)
				{
					if(query.password==obj.data[0].password)
					{
						const payload = {
                  			  user: query.username
             			   };	 
						token = jwt.sign(payload, secure.secret, {
							expiresIn: 5259492 
						});	
						var response_data={
							_id:obj.data[0]._id,
							name:obj.data[0].name,
							role:obj.data[0].role,
							token:token
						}
						var update_params={
							token:token
						}
						User.updateToken(obj.data[0]._id,update_params,function(str){
							str=JSON.parse(str);
							if(str.status)
								res.send(genRes.generateResponse(true,'Login successful',200,response_data))	
							else
								res.send(genRes.generateResponse(false,'Authentication Failed In Update',200,null))	
			
						});
					}
					else
						res.send(genRes.generateResponse(false,'Authentication Failed',200,null))	
					
				}
				else
					res.send(genRes.generateResponse(false,'User not found',200,null))	
			});
		}		



