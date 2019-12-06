let express = require('express'),
cors = require('cors'),
path = require('path'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
dbConfig = require('./database/db');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

const app = express()
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({
   limit: "50mb",
   extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, './uploads')));
app.use(express.static(path.join(__dirname, 'dist/plate')));
app.use('/', express.static(path.join(__dirname, 'dist/plate')));

const port = 3000;
const server = app.listen(port, () => {
   console.log('Connected to port ' + port)
 })

const vehicleRouter = require('../backend/routes/vehicle.route')
app.use('/vehicle', vehicleRouter)

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});


