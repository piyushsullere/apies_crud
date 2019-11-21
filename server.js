const express 		= require('express');
const app 			= express();
const router 		= express.Router()



//middlewares
var bodyParser 			= require('body-parser');
var mongoose 			= require('mongoose');
//var path 				= require('path')


//var api
var apiUsersRouteController = require('./api/routecontrollers/users.js');
var genRes      			= require('./api/controllers/genres.js');

//body parser
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());


app.use('/api', router);
//apies
app.get('/api/v1/users/get', apiUsersRouteController.getUsers)
app.post('/api/v1/users/create', apiUsersRouteController.addUser)
app.post('/api/v1/users/update', apiUsersRouteController.updateUser)
app.delete('/api/v1/users/remove', apiUsersRouteController.removeUser)




//connect mongodb
const db = require('./config/db').url
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});




//port
app.listen(3000, function(err, data){
	console.log("server is running on 3000 port")
})