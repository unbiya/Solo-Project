const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const todoController = require('./controllers/todoController');

const PORT = 3000;

const app = express();

const mongoURI = 'mongodb+srv://unbiya:Ansdmsql93@cluster0.ivqzxal.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURI)
  .then(() => console.log('connected to Mongo DB'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/client', express.static(path.resolve(__dirname, '../client')));


//root
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/style.css', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/style.css'))
})


//create an account
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'))
});

app.post('/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res)=> {
    res.redirect('/todo');
  });


//log-in
app.post('/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.redirect('/todo');
});


//to-do list page
app.get('/todo',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/todo.html'));
});

app.get('/todo',
  userController.getTodos,
  (req, res) => {
    // console.log(res)
    return res.send(res.locals.todo);
  })

app.post('/todo',
  todoController.add,
  (req, res) => {
    res.send(res.locals.todo);
});


//404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});


//Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;