const cookieController = {};

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  res.cookie('codesmith', 'hi');
  res.cookie('secret', Math.floor(Math.random() * 100))
  return next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // get userid from mongo
  const userId = res.locals.userId;
  res.cookie('ssid', userId, {httpOnly: true})
  return next();
}

module.exports = cookieController;
