/**
 * Created by nikit on 3/21/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var mongoIP = process.env.OPENSHIFT_MONGODB_DB_HOST;
if(!mongoIP)
    mongoIP = '127.0.0.1';
else
    mongoIP = 'admin:9F5qmd3f6BCB@'+mongoIP;

var db = mongoose.createConnection(mongoIP, 'nodejs');
var userSchema = require('./user.js');
var md5 = require('MD5');
var User = db.model('users', userSchema);

app.get('/', function (req, res) {
    res.render("index.html");
});

app.post('/authenticate', function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.jsonp({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.jsonp({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.jsonp({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
});

app.post('/signin', function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.jsonp({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.jsonp({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET || md5('SECRET OF API'));
                    user.save(function(err, user1) {
                        res.jsonp({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
});

app.get('/me', ensureAuthorized, function(req, res) {
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

process.on('uncaughtException', function(err) {
    console.log(err);
});

module.exports = app;