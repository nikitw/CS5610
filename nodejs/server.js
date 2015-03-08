var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var md5 = require('MD5');
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


app.ip = process.env.OPENSHIFT_NODEJS_IP;
if(app.ip === undefined) {
    app.ip = '127.0.0.1';
    app.port = '8888';
} else
    app.port = '8080';

var URL = "http://"+app.ip+":"+app.port;

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

var users = [
  {name: "admin", username:"admin@neu.edu", password:"admin", hint:"admin", admin:true},
  {name: "alice", username:"alice@neu.edu", password:"alice", hint:"alice"},
  {name: "bob", username:"bob@neu.edu", password:"bob", hint:"bob"}
];

var User = function (name, username, password, hint, admin) {
  this.name = name;
  this.username = username;
  this.password = password;
  this.hint = hint;
  this.admin = admin;
};



var CHPASS = [];
var ChPass = function (username) {
    this.hash = md5(username);
    this.username = username;
    this.email = null;
    this.confirm = false;
};

var Email = function (to, cc, bcc, from, subject, msgbody, url) {
  this.to = to;
  this.cc = cc;
  this.bcc = bcc;
  this.from = from;
  this.subject = subject;
  this.msgbody = msgbody;
  this.url = url;
};

app.get('/app/login', function (req, res) {
    var user = null;
    for (var u in users)
      if(users[u].username == req.query.username &&
        users[u].password == req.query.password) {
        user = users[u];
        break;
      }
    if(!user) {
      user = new User(null,null,null,null,null);
      user.err = 701;
      user.errmsg = "Login failed!";
    }

    res.jsonp(user);
});

app.post('/app/register', function (req, res) {
    var username = req.body.username;
    var auser = null;
    var user = new User(
      req.body.name,
      username,
      req.body.password,
      req.body.hint,
      req.body.admin
    );
    for (var u in users)
      if(users[u].username == username) {
        auser = users[u];
        break;
      }
    if(auser) {
      user.err = 702;
      user.errmsg = "user already exists";
    } else {
      users.push(user);
    }
    res.jsonp(user);
});

app.put('/app/update/:id', function (req, res) {
    var user = new User(
      req.body.name,
      req.body.username,
      req.body.password,
      req.body.hint,
      req.body.admin
    );;
    var username = req.params.id;
    var auser = null;
    var u = 0;
    for (u in users)
      if(users[u].username == username) {
        auser = users[u];
        break;
      }
    if(!auser) {
      user.err = 703;
      user.errmsg = "no such user exists";
    } else {
      for(var key in user)
        if(user[key] == null)
          user[key] = auser[key];
      for(var c in CHPASS)
        if(CHPASS[c].username == username) {
          CHPASS.splice(c,1);
          break;
        }
      users[u] = user;
    }
    res.jsonp(user);
});

app.post('/app/chpassrequest', function (req, res) {
    var username = req.body.email;
    var user = new User(null,null,null,null,null);
    for (var c in CHPASS)
      if(CHPASS[c].username == username) {
        CHPASS.splice(c, 1);
        break;
      }
    var chpass = new ChPass(username);
    var response = {};
    var auser = null;
    for (var u in users)
      if(users[u].username == username) {
        auser = users[u];
        break;
      }
    if(!auser) {
        response.err = 703;
        response.errmsg = "no such user exists";
        response.body = "no susch user exists";
        response.cstat = 703;
    } else {
        CHPASS.push(chpass);
        var body = "Hi "+auser.name+",\n";
        body += "\nClick the link below if you initiated this activity to confirm"+
        " the password change.\n\nThank you,\nPrimeBox";

        response.body = {username:username};
        response.cstat = 200;
        chpass.email = new Email(username, null, null, 'no-reply@primebox.com',
        "Change of password request", body, URL+"/app/chpassconfirm/"+chpass.hash);
    }
    // send email

    res.jsonp(response);
});

app.get('/app/chpassemail/:id', function(req, res) {
  var username = req.params.id;
  var chpass = null;
  var response = {};
  for (var u in CHPASS)
    if(CHPASS[u].username == username) {
      chpass = CHPASS[u];
      break;
    }
  if(chpass) {
    response.body = chpass.email;
    response.cstat = (chpass.confirm == true)? 301 : 302;
  } else {
    response.err = 705;
    response.errmsg = "Invalid change request";
    response.body = "Invalid change request";
    response.cstat = 705;
  }

  res.jsonp(response);
});

app.get('/app/chpassconfirm/:hash', function (req, res) {
    var hash = req.params.hash;
    var chapss = null;
    var response = {};
    for (var u in CHPASS)
      if(CHPASS[u].hash == hash) {
        chpass = CHPASS[u];
        break;
      }
    if(!chpass) {
      response.err = 705;
      response.errmsg = "Invalid change request";
      response.body = "Invalid change request";
      response.cstat = 705;
    } else {
      chpass.confirm = true;
      response.body = "Thank you, for confirming";
      response.cstat = 301;
    }

    res.jsonp(response);
});

app.get('/app/chpass/:id', function (req, res) {
    var username = req.params.id;
    var chpass = null;
    var response = {};
    for (var u in CHPASS)
      if(CHPASS[u].username == username) {
        chpass = CHPASS[u];
        break;
      }
    if(!chpass) {
      response.err = 705;
      response.errmsg = "Invalid change request";
      response.body = "Invalid change request";
      response.cstat = 705;
    } else {
      if(chpass.confirm) {
        response.body = "Confirmed";
        response.cstat = 301;
      } else {
        response.body = "Pending";
        response.cstat = 302;
      }
    }

    res.jsonp(response);
});

app.listen(app.port, app.ip, function () {
  console.log('server started at '+app.ip+':'+app.port);
});
