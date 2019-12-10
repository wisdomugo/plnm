let express = require('express'),
  userRouter = express.Router();


// User model
let User = require('../models/User');


// Get All Users
userRouter.route('/').get((req, res, next) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


userRouter.post('/register', (req, res, next) => {
    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    });
    user.save().then(result => {
      console.log(result);
      res.status(201).json({
        result
      })
  })
  })

  // Log in A Usser
userRouter.route('/login').post((req, res, next) => {
    User.find({ 'email': req.body.email }, function(err, user) {
        if (err) throw err;
        // object of the user
        if(user.length > 0){
          res.status(201).json(user);
        }else{
          res.json('No such user')
        }
       
      });



  /*User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })*/
})

module.exports = userRouter;