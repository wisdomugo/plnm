const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let vehicleSchema = new Schema({
    purchaseReceipt: {
      type: String
    },
    fullName: {
      type: String
    }
    /*
    proofOfOwnership: {
      type: String
    },
    meansOfIdentification: {
        type: String
      },
    passport: {
        type: String
      },
    customPapers: {
        type: String
      },
    insurancePapers: {
        type: String
      },
    vehicleImage: {
        type: String
      },
    vehicleEngineNumber: {
        type: String
      },
    fullName: {
        type: String
      },
    state: {
        type: String
      },
    lga: {
        type: String
      },
    age: {
        type: String
      }*/ 
  }, {
      collection: 'vehicles'
    })
  
  module.exports = mongoose.model('Vehicle', vehicleSchema)