const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const userController = require('./controllers/userController');

const PORT = 3000;

const app = express();

const mongoURI = 'mongodb+srv://unbiya:Ansdmsql93@cluster0.ivqzxal.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURI)
  .then(() => console.log('connected to Mongo DB'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //idk what this is


//root
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


//create an account
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'))
});

app.post('/signup',
  userController.createUser,
  (req, res)=> {
    res.redirect('/todo');
  });


//log-in
app.post('/login',
  userController.verifyUser,
  (req, res) => {
    res.redirect('/todo');

});

//to-do list page


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