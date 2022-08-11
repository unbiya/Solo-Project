const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userController = {};

//retrieve all users from the database and store it into res.locals
userController.getTodos = (req, res, next) => {
  const username = req.cookies.ssid

  if (username) {
    User.findOne({username})
      .then(data => {
        if (data === null) return res.direct('/signup');
        res.locals.todo = data.todo;
        console.log(typeof res.locals.todo)
        return next();
      })
      .catch(err => next(err))
  } else {
    return res.direct('/signup');
  }
};

//add user's id and password into database
userController.createUser = (req, res, next) => {
  let {
    username,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    password = hash;
    console.log(password)
    User.create({username, password})
      .then(data => {
        res.locals.username = data.username.toString();
        res.locals.todo = data.todo;
        return next();
      })
      .catch(err => next(err));
  })
  
};

//obtain username and password from the request body,
// locate the appropriate user in the database,
// and then authenticate the submitted password against the password stored in the database.
userController.verifyUser = (req, res, next) => {
  const {
    username,
    password,
  } = req.body;

  User.findOne({username}).exec()
    .then((data) => {
      if (data === null) return res.redirect('/signup');
      // console.log(data)
      data.comparePassword(password, function(err, result){
        if (result) {
          res.locals.username = data.username.toString();
          res.locals.todo = data.todo;
          return next();
        } else {console.log('failed comparing password')}
      })
    }).catch((err) => {
      return next(err);
    });
};

module.exports = userController;
