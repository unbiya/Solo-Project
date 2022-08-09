const User = require('../models/userModel');

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
  // write code here
  if (typeof (req.body.username) === 'string' && typeof (req.body.password) === 'string') {
    User.create(req.body)
      .then(data => {
        res.locals.userId = data._id.toString();
        next();
      })
      .catch(err => next(err))
  }
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  const {
    username,
    password
  } = req.body;

  User.findOne({username}).exec()
    .then((data) => {
      if (data === null) return res.redirect('/signup');
      data.comparePassword(password, function(err, result){
        if (result) {
          res.locals.userId = data._id.toString();
          return next();
        }
      })
    }).catch((err) => {
      return next(err);
    });
};

module.exports = userController;
