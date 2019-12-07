let express = require('express'),
  multer = require('multer'),
   mongoose = require('mongoose'),
  vehicleRouter = express.Router();

  const DIR = './uploads/';
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
      cb(null, fileName)
    }
  });

  upload = multer({ 
    storage: storage,
    limits: {
      fileSize: '40mb'
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  })


// Vehicle model
let Vehicle = require('../models/Vehicle');


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



vehicleRouter.post('/register', upload.single('purchaseReceipt'),
  (req, res, next) => {
    const vehicle = new Vehicle({
      fullName: req.body.fullName,
      purchaseReceipt: req.file.filename
    });
    vehicle.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Vehicle registered successfully!",
        VehicleCreated: {
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

module.exports = vehicleRouter;