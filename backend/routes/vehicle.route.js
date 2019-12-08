let express = require('express'),
  multer = require('multer'),
   mongoose = require('mongoose'),
  vehicleRouter = express.Router();

  const DIR = '../src/assets/uploads/vehicle';
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
        return cb(new Error('Only Image(png, jpg and jpeg) and pdf formats are allowed!'));
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

var docsUpload = upload.fields([
  { name: 'purchaseReceipt', maxCount: 1 }, 
  { name: 'proofOfOwnership', maxCount: 1 },
  { name: 'meansOfIdentification', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'customPapers', maxCount: 1 },
  { name: 'insurancePapers', maxCount: 1 },
  { name: 'vehicleImage', maxCount: 1 }
])


vehicleRouter.post('/register', docsUpload,
  (req, res, next) => {
    const vehicle = new Vehicle({
      fullName: req.body.fullName,
      //purchaseReceipt: req.file.filename
      purchaseReceipt: req.files['purchaseReceipt'][0].filename,
      proofOfOwnership: req.files['proofOfOwnership'][0].filename,
      meansOfIdentification: req.files['meansOfIdentification'][0].filename,
      passport: req.files['passport'][0].filename,
      customPapers: req.files['customPapers'][0].filename,
      insurancePapers: req.files['insurancePapers'][0].filename,
      vehicleImage: req.files['vehicleImage'][0].filename,
      vehicleEngineNumber: req.body.vehicleEngineNumber,
      state: req.body.state,
      lga: req.body.lga,
      age: req.body.age
    });
    vehicle.save().then(result => {
      console.log(result);
      res.status(201).json({
        result
        /*message: "Vehicle registered successfully!",
        VehicleCreated: {
          _id: result._id,
          name: result.name,
          purchaseReceipt: result.purchaseReceipt
        }*/
      })
  })
  })

  // Get An Employee
vehicleRouter.route('/read/:id').get((req, res, next) => {
  Vehicle.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = vehicleRouter;