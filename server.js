
// BASE SETUP
var express = require('express');
var app 	= express();
var router	= express.Router();

// Middlewares 
var http 				= require('http');
var bodyParser 			= require('body-parser');
var secure				= require('./config/secure.js')


// Routes
var apiUsersRouteController = require('./api/routecontrollers/users.js');
var apiTaskRouteController = require('./api/routecontrollers/tasks.js');

var database   = require('./config/db');
var jwt        = require('jsonwebtoken');
var genRes     = require('./api/controllers/genres.js');
var cors       = require('cors');


// API ROUTES -------------------
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json())

// get an instance of the router for api routes
var apiRoutes = express.Router(); 
app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// unsecure apies for users
app.post('/api/v1/users/create', apiUsersRouteController.addUser)
app.get('/api/v1/users/get', apiUsersRouteController.getUsers)


//login api
app.post('/api/v1/users/login', apiUsersRouteController.login)


// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  var token = req.headers['x-access-token'];
  var user_id=req.headers['x-api-key'];
  var mongoose = require('mongoose');
  var newObjectId=new mongoose.Types.ObjectId(user_id);
  user_id=newObjectId;
  if (token) {
    jwt.verify(token, secure.secret, function(err, decoded) {      
      if (err) {
        var response=genRes.generateResponse(false,"Failed to authenticate token",401,null);
                                          
        return sendResponse(res,response);    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});
function sendResponse(res,response)
{

  res.send(response);

}
app.use('/api', apiRoutes);

//connect mongodb
var mongoose 		= require('mongoose');
const db = require('./config/db').url
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}
app.use('/', router);

// secure apies for tasks apies
app.get('/api/v1/tasks/get', apiTaskRouteController.getTasks)
app.post('/api/v1/tasks/create', apiTaskRouteController.addTask)
app.post('/api/v1/tasks/upadte', apiTaskRouteController.updateTask)
app.delete('/api/v1/tasks/remove', apiTaskRouteController.removeTask)
app.get('/api/v1/tasks/based/on/requirement', apiTaskRouteController.getTasks)
app.get('/api/v1/tasks/based/on/time', apiTaskRouteController.getTaskByTime)

//port
app.listen(3000, function(err, data){
  console.log("server is running on 3000 port")
})
