// const data = require('./../../database/users');
const fs = require('fs');
const data = '/Users/jennaemoon/Codesmith/Solo Project/database/users.txt';

const userController = {};

//retrieve all users from the database and store it into res.locals
userController.getAllUsers = (req, res, next) => {

};

//add user's id and password into database
userController.createUser = (req, res, next) => {
  console.log(req.body);
  fs.readFile(data, 'utf8', (err, data) =>{
    console.log(JSON.parse(data));
    if (err) console.log(err);
  });
  // const content = JSON.stringify(req.body);
  // fs.writeFile(data, content, err => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  // })
  return next();

};

//obtain username and password from the request body,
// locate the appropriate user in the database,
// and then authenticate the submitted password against the password stored in the database.
userController.verifyUser = (req, res, next) => {

};

module.exports = userController;
