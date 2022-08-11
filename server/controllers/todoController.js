const User = require('../models/userModel');

const todoController = {};

//add todo list
todoController.add = (req, res, next) => {
  const username = req.cookies.ssid;
  const active = {active: true};

  User.findOne({username})
    .then(data => {
      if (data === null) return res.direct('/login');
      const newTask = {...req.body, ...active};
      data.todo.push(newTask);
      data.save();
      res.locals.todo = data.todo;
      return next();
    })
    .catch(err => next(err))
};


// userController.getTodos = (req, res, next) => {
//     const username = req.cookies.ssid
//     if (username) {
//       User.findOne({username})
//         .then(data => {
//           if (data === null) return res.direct('/signup');
//           res.locals.todo = data.todo;
//           return next();
//         })
//         .catch(err => next(err))
//     } else {
//       return res.direct('/signup');
//     }
//   };

//delete todo list
todoController.delete = (req, res, next) => {

};

//checkoff todo list
todoController.checkoff = (req, res, next) => {

};

module.exports = todoController;