const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        // match:`Regex match to ensure that string follows email format`  
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    password: {
        type: String
      }
  }, {
      collection: 'users'
    })
  
  module.exports = mongoose.model('User', userSchema)