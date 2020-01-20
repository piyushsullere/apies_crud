const express 		= require('express');
const app 			= express();
const router 		= express.Router()
var bodyParser 		= require('body-parser');
var mongoose 		= require('mongoose');
const Pusher 		= require('pusher');

const pusher = new Pusher({
	appId      : '932875',
	key        : 'eb03d86eceb52e259c74',
	secret     : '2047b3ea9071bc92d59f',
	cluster    : 'ap2',
	encrypted  : true,
});


const channel = 'testapp';


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


var apiTaskRouteController = require('./api/routecontrollers/tasks.js');
var genRes      			= require('./api/controllers/genres.js');


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());


app.use('/api', router);

app.get('/api/v1/tasks/get', apiTaskRouteController.getTask)
app.post('/api/v1/tasks/create', apiTaskRouteController.addTask)
app.post('/api/v1/tasks/update', apiTaskRouteController.updateTask)
app.delete('/api/v1/tasks/remove', apiTaskRouteController.removeTask)




mongoose.connect('mongodb://localhost:27017/sampleDb?replicaSet=myRepl');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
  app.listen(9000, () => {
    console.log('Node server running on port 9000');
  });

  const taskCollection = db.collection('testapp');
  const changeStream = taskCollection.watch();
    
  changeStream.on('change', (change) => {
    console.log(change);
      
    if(change.operationType === 'insert') {
      const task = change.fullDocument;
      pusher.trigger(
        channel,
        'inserted', 
        {
          id: task._id,
          task: task.task,
        }
      ); 
    } else if(change.operationType === 'delete') {
      pusher.trigger(
        channel,
        'deleted', 
        change.documentKey._id
      );
    }
  });
});