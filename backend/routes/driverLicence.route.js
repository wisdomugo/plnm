let express = require('express'),
  multer = require('multer'),
   mongoose = require('mongoose'),
  driverLicenceRouter = express.Router();

  const DIR = '../src/assets/uploads/driverlicence';
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
let DriverLicence = require('../models/DriverLicence');


// Get All Driver Licences
driverLicenceRouter.route('/').get((req, res, next) => {
    DriverLicence.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Submit a driver's licence
driverLicenceRouter.post('/save-licence', upload.single('driverLicenceDoc'),
  (req, res, next) => {
    const driverlicence = new DriverLicence({
      fullName: req.body.fullName,
      stateOrigin: req.body.stateOrigin,
      driverLicenceDoc: req.file.filename,
      stateOrigin: req.body.stateOrigin,
      lgaOrigin: req.body.lgaOrigin,
      issueDate: req.body.issueDate,
      expiryDate: req.body.expiryDate,
      dateBirth: req.body.dateBirth,
      bloodGroup: req.body.bloodGroup,
      vehicleCategory: req.body.vehicleCategory

    });
    driverlicence.save().then(result => {
      console.log(result);
      res.status(201).json({
        result
      })
  })
  })

  // Get A Driver Licence
  driverLicenceRouter.route('/read/:id').get((req, res, next) => {
  DriverLicence.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = driverLicenceRouter;