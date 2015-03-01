var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(express.static(__dirname + "/public/"))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.get('/', function (req, res) {
  res.render("index.html");
});

var artists = [
    {name: "Coldplay", genre:"Rock", dob:"1978-02-17", albums:['Parachutes', 'X & Y', 'Ghost Stories']},
    {name: "James Blunt", genre:"Pop", dob:"1977-03-20", albums:['Back To Beldam', 'Moon Landing']},
    {name: "Imagine Dragons", genre:"Pop-Rock", dob:"1983-09-10", albums:['Continued Silence EP', 'Demons', 'Night Visions']},
    {name: "Above & beyond", genre:"Progressive Trance", dob:"1976-02-10", albums:['Group Therapy', 'TriState', 'Acoustic']},
    {name: "Swidish House Mafia", genre:"House", dob:"1983-02-18", albums:['Save The World', 'Until Now', 'One']},
    {name: "Armin Van Buuren", genre:"Trance", dob:"1978-02-11", albums:['Intense', 'Imagine', 'Mirage']}
  ];

app.get('/app/artists', function (req, res) {
    res.jsonp(artists);
});

app.get('/app/artists/:id', function (req, res) {
    res.jsonp(artists[req.params.id]);
});

app.post('/app/artists', function (req, res) {
    var body = req.body;
    if(body.name && body.dob)
      artists.push(req.body);
    res.jsonp(artists);
});

app.delete('/app/artists/:id', function (req, res) {
    var index = req.params.id;
    artists.splice(index, 1);
    res.jsonp(artists);
});

app.put('/app/artists/:id', function (req, res) {
    var index = req.params.id;
    artists[index] = req.body;
    res.jsonp(artists);
});

app.ip = process.env.OPENSHIFT_NODEJS_IP;
if(app.ip === undefined) {
    app.ip = '127.0.0.1';
    app.port = '8888';
} else
    app.port = '8080';

app.listen(app.port, app.ip, function () {
  console.log('server started at '+app.ip+':'+app.port);
});
