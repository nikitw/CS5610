var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public/"))
app.get('/', function (req, res) {
  res.render("index.html");
});

var artists = [
  {name: "Coldplay", genre:"Rock", dob:"02-17-1978"},
  {name: "James Blunt", genre:"Pop", dob:"03-20-1977"},
  {name: "Imagine Dragons", genre:"Pop-Rock", dob:"09-10-1983"},
  {name: "Above & beyond", genre:"Progressive Trance", dob:"22-10-1976"},
  {name: "Swidish House Mafia", genre:"House", dob:"22-10-1976"},
  {name: "Armin Van Buuren", genre:"Trance", dob:"2-11-1978"}];

app.get('/app/artists', function (req, res) {
    res.jsonp(artists);
});

app.ip = process.env.OPENSHIFT_NODEJS_IP;
if(app.ip === undefined)
  app.ip = '127.0.0.1';
app.port = '8080';

app.listen(app.port, app.ip, function () {
  console.log('server started at '+app.ip+':'+app.port);
});
