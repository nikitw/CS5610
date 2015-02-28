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
  {name: "Swidish House Mafia", genre:"House", dob:"22-10-1976"}];

app.get('/app/artists', function (req, res) {
    res.jsonp(artists);
});

app.listen("8888");
