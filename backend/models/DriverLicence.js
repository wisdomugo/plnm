const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DriverLicenceSchema = new Schema({
    fullName: {
      type: String
    },
    user: {
      type: String, ref: 'User'
    },
    stateOrigin: {
      type: String
    },
    driverLicenceDoc: {
      type: String
    },
    lgaOrigin: {
        type: String
      },
    issueDate: {
        type: String
      },
    expiryDate: {
        type: String
      },
    dateBirth: {
        type: String
      },
    bloodGroup: {
        type: String
      },
    vehicleCategory: {
        type: String
      }
  }, {
      collection: 'driverLicences'
    })
  
  module.exports = mongoose.model('DriverLicence', DriverLicenceSchema)