const cookieController = {};

//store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  // get userid from mongo
  const username = res.locals.username;
  res.cookie('ssid', username, {httpOnly: true})
  return next();
}
  
module.exports = cookieController;
  