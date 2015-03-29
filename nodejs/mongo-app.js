/**
 * Created by nikit on 3/21/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var mongoose = require('mongoose');
var mongoIP = process.env.OPENSHIFT_MONGODB_DB_HOST;
if(!mongoIP)
    mongoIP = '127.0.0.1';
else
    mongoIP = 'admin:9F5qmd3f6BCB@'+mongoIP;

var db = mongoose.createConnection(mongoIP, 'nodejs');
var artistSchema = require('./artist.js');
var md5 = require('MD5');
var ObjectId = require('mongoose').Types.ObjectId;
var Artist = db.model('artists', artistSchema);

app.get('/', function (req, res) {
    res.render("index.html");
});

app.get('/artists', function(req, res) {
    var keyword;
    try {
        keyword = JSON.parse(req.query.keyword);
    } catch (err) {
        keyword = null;
    }

    if(!keyword || keyword == 'null' || keyword == 'undefined' || keyword == 'NaN') keyword = {name:'.*'};

    getArtists(getFilter({keyword:keyword, start:new Date('undefined'), end:new Date('undefined')}), 1, function(doc, err) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else
            res.jsonp({data: doc});
    });
});

app.get('/albums', function(req, res) {
    var keyword;
    try {
        keyword = JSON.parse(req.query.keyword);
    } catch (err) {
        keyword = null;
    }

    if(!keyword || keyword == 'null' || keyword == 'undefined' || keyword == 'NaN') keyword = {'albums.name':'.*'};

    getAlbums(null,getFilter({keyword:keyword, start:new Date('undefined'), end:new Date('undefined')}), 1, function(doc, err) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else
            res.jsonp({data: doc});
    });
});

app.get('/songs', function(req, res) {
    var keyword;
    try {
        keyword = JSON.parse(req.query.keyword);
    } catch (err) {
        keyword = null;
    }

    if(!keyword || keyword == 'null' || keyword == 'undefined' || keyword == 'NaN') keyword = {'albums.name':'.*'};

    getSongs(null,getFilter({keyword:keyword, start:new Date('undefined'), end:new Date('undefined')}), 1, function(doc, err) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else
            res.jsonp({data: doc});
    });
});

app.post('/artists', function(req, res) {
    if(!req.body) {
        res.jsonp({err: new Error('no artist object found')});
        return;
    }
    var artist = new Artist(req.body);
    artist.save(function(err, doc) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist added!')});
        else
            res.jsonp({data: doc});
    });
});


app.get('/artists/:id', function(req, res) {
    Artist.findOne({_id: req.params.id}, function(err, doc) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else
            res.jsonp({data: doc});
    });
});

app.delete('/artists/:id', function(req, res) {
    Artist.findOneAndRemove({_id: req.params.id}, function(err, doc) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else
            res.jsonp({data: doc});
    });
});

app.put('/artists/:id', function(req, res) {
    if(!req.body) {
        res.jsonp({err: new Error('no artist object found')});
        return;
    }
    delete req.body._id;
    Artist.findOneAndUpdate({_id: req.params.id}, req.body,function(err, doc) {
        if(err || !doc)
            res.jsonp({err: {message: err.message}});
        else
            res.jsonp({data: doc});
    });
});

app.get('/artists/:id/albums', function(req, res) {
    getAlbums(req.params.id, getFilter({keyword:null, start:new Date('undefined'), end:new Date('undefined')}), 1, function(doc, err) {
        if(err || !doc)
            res.jsonp({err: 'no albums found!'});
        else
            res.jsonp({data: doc});
    });
});

app.get('/artists/:id/songs', function(req, res) {
    getSongs(req.params.id, getFilter({keyword:null, start:new Date('undefined'), end:new Date('undefined')}), 1, function(doc, err) {
        if(err || !doc)
            res.jsonp({err: 'no songs found!'});
        else
            res.jsonp({data: doc});
    });
});

app.delete('/artists/:id/albums/:aid/songs/:sid', function(req, res) {
    Artist.findOne({_id: req.params.id}, function(err, doc) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else {
            var songs = doc.albums.id(req.params.aid).songs;
            songs.id(req.params.sid).remove(function(err, doca) {
                if(err)
                    res.jsonp({err: new Error('no album found!')});
                else {
                    doc.save(function(err, docs) {
                        if(err)
                            res.jsonp({err: new Error('failed to save artist!')});
                        else
                            res.jsonp({data: doc});
                    });
                }
            });
        }
    });
});

app.get('/artists/:id/albums/:aid', function(req, res) {
    Artist.findOne({_id: req.params.id}, function(err, doc) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else {
            res.jsonp({data: doc.albums.id(req.params.aid)});
        }
    });
});

app.delete('/artists/:id/albums/:aid', function(req, res) {
    Artist.findOne({_id: req.params.id}, function(err, doc) {
        if(err || !doc)
            res.jsonp({err: new Error('no artist found!')});
        else {
            doc.albums.id(req.params.aid).remove(function(err, doca) {
                if(err)
                    res.jsonp({err: new Error('no album found!')});
                else {
                    doc.save(function(err, docs) {
                        if(err)
                            res.jsonp({err: new Error('failed to save artist!')});
                        else
                            res.jsonp({data: doc});
                    });
                }
            });
        }
    });
});

function getArtists(filter, order, callback) {
    Artist.aggregate([
        {$match: filter},
        {$sort: {dob: order}}
    ], function(err, res) {
        if(err || !res)
            callback(null, err);
        else
            callback(res);
    });
}

function getAlbums(id, filter, order, callback) {
    if(!id) {
        Artist.aggregate([
            {$unwind: "$albums"},
            {$match: filter},
            {
                $project: {
                    name: '$albums.name',
                    dor: '$albums.dor',
                    songs: '$albums.songs',
                    _id: '$albums._id',
                    artist_name: '$name',
                    artist_id: '$_id'
                }
            },
            {$sort: {dor: order}}
        ], function (err, res) {
            if (err || !res) {
                console.log(err);
                callback(null, err);
            }
            else
                callback(res);
        });
    } else {
        Artist.aggregate([
            {$match: {_id: new ObjectId(id)}},
            {$unwind: "$albums"},
            {$match: filter},
            {
                $project: {
                    name: '$albums.name',
                    dor: '$albums.dor',
                    songs: '$albums.songs',
                    _id: '$albums._id',
                    artist_name: '$name',
                    artist_id: '$_id'
                }
            },
            {$sort: {dor: order}}
        ], function (err, res) {
            if (err || !res)
                callback(null, err);
            else
                callback(res);
        });
    }
}

function getSongs(id, filter, order, callback) {
    if(!id) {
        Artist.aggregate([
            {$unwind: "$albums"},
            {$unwind: "$albums.songs"},
            {$match: filter},
            {
                $project: {
                    name: '$albums.songs.name',
                    album: '$albums.name',
                    album_id: '$albums._id',
                    dor: '$albums.dor',
                    soundCloud: '$albums.songs.soundCloud',
                    _id: '$albums.songs._id',
                    artist_name: '$name',
                    artist_id: '$_id'
                }
            },
            {$sort: {name: order}}
        ], function (err, res) {
            if (err || !res)
                callback(null, err);
            else
                callback(res);
        });
    }
    else {
        Artist.aggregate([
            {$match: {_id: new ObjectId(id)}},
            {$unwind: "$albums"},
            {$unwind: "$albums.songs"},
            {$match: filter},
            {
                $project: {
                    name: '$albums.songs.name',
                    album: '$albums.name',
                    album_id: '$albums._id',
                    dor: '$albums.dor',
                    soundCloud: '$albums.songs.soundCloud',
                    _id: '$albums.songs._id',
                    artist_name: '$name',
                    artist_id: '$_id'
                }
            },
            {$sort: {name: order}}
        ], function (err, res) {
            if (err || !res)
                callback(null, err);
            else
                callback(res);
        });
    }
}

function getFilter(filter) {
    var flt = {};
    if(!filter) return {};
    if(filter.keyword) {
        flt.$or = [];
        for(var f in filter.keyword) {
            var kw = {};
            if(!filter.keyword[f] || filter.keyword[f] == 'null' || filter.keyword[f] == 'undefined' || filter.keyword[f] == 'NaN')
                filter.keyword[f] = '.*';
            kw[f] = {$regex: eval('/' + filter.keyword[f] + '/i')};
            flt.$or.push(kw);
        }
    }
    if(isNaN( filter.start.getTime() ) && isNaN( filter.end.getTime()))
        return flt;
    if(filter.start || filter.end) {
        flt.$and = [];
        if(filter.start && !isNaN( filter.start.getTime() ))
            flt.$and.push({dor: {$gte: filter.start}});
        if(filter.end && !isNaN( filter.end.getTime() ))
            flt.$and.push({dor: {$lte: filter.end}});
    }
    return flt;
}

module.exports = app;