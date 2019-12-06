let express = require('express'),
  path = require('path'),
  multer = require('multer'),

  app = express();

  const DIR = '../uploads/';
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.fieldname + '-' + Date.now();
      cb(null, fileName)
    }
  });
  
  let upload = multer({ 
    storage: storage
  })

vehicleRouter = express.Router();

// Vehicle model
let Vehicle = require('../models/Vehicle');

app.use(express.static(path.join(__dirname, '../uploads')));


// Get All Employees
vehicleRouter.route('/').get((req, res, next) => {
  Vehicle.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



vehicleRouter.post('/register', upload.single('purchaseReceipt'), (req, res, next) => {
  res.json(req.file.filename)
  return;

/*vehicleRouter.post('/register', upload.single('purchaseReceipt'), (req, res, next) => {
  res.json(req.file)
  return;
  const vehicle = new Vehicle({
    fullName: req.body.fullName,
    purchaseReceipt: req.file.filename
  });
  vehicle.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Vehicle registered successfully!",
      userCreated: {
        _id: result._id,
        name: result.name,
        purchaseReceipt: result.purchaseReceipt
      }
    })
  })
  
  /*Vehicle.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })*/

  //res.json('from register vehicle')
  })

  app.use(express.static(path.join(__dirname, './uploads')));
module.exports = vehicleRouter;