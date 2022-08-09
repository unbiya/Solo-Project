const Session = require('../models/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  // check if user has ssid cookie
  if (req.cookies.ssid) { 
  // if so check if cookie has session
    Session.findOne({cookieId : req.cookies.ssid}).exec()
      .then((data) => {
        if (data === null) return res.redirect('/signup');
        return next();
      }).catch((err) => {
        return next({
          log: 'error at userController.verifyUser',
          status: 400,
          message: { err: 'error at userController.verifyUser' }
        });
      });
  } else return res.redirect('/signup');
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  // create new session in the DB (Session.create())
  // console.log(res.locals.userId)
  Session.create({cookieId: res.locals.userId})
    .then(data => next())
    .catch(err => next(err))
  // pass in cookieid (value of ssid cookie)

};

module.exports = sessionController;
