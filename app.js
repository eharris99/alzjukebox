var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var users = require('./controllers/UserController');
var index = require('./controllers/index');
var routes = require('./routes/api.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var connect = require('connect');
var handlebars = require('handlebars');
var http = require('http');
var User = require('./models/User.js')

var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/alzjukebox'
mongoose.connect(dbUrl, function(err, res){
  if (err){
    console.log('DB CONNECTION FAIL: '+err)
  }
  else {
    console.log('DB CONNECTION SUCCESS: '+dbUrl)
  }
})

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Consuming route parameters
app.get('/users/:username', (req, res) => {
  var msg = 'The username is: ' + req.params.username;
  if (req.query.test != null) {
    msg += ' -- A test query received!'
  }
  res.send(msg);
});

app.get('/users/:fName lName', (req, res) => {
  res.send('The username is: ' + "   " +  req.params.fName + "   " + req.params.lName);
});


app.get('/', (req, res) => {
  res.send('alzjukebox homepage');
});

// GET method route
app.get('/users', (req, res) => {
  // res.send('users homepage');
  res.render('users');
});



var users = [
  { firstName : 'Audrey', 
  lastName : 'Hepburn',
  email: 'audrey@gmail.com',
  password: '1234'
},
{ firstName : 'Fred', 
  lastName : 'Flintstone',
  email: '1234@gmail.com',
  password: '1234'
}
  
];

app.get('/index', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);  
    // res.render('./index.hjs');  
  });
});






// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});

app.listen(8000);


app.set('view engine', 'hjs');   
app.use('/', routes);
app.use('/api', api);
// app.use('/users', users);
// app.use(app.router);
// routes.initialize(app);
module.exports = app;




// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('suh !');
// });

// app.post('/', function (req, res) {
//   res.send('Got a POST request');
// });

// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user');
// });

// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });