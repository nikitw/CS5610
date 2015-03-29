var services = angular.module('PrimeBoxApp.services', []);

var Error = function(errno, message) {
  this.errno = errno;
  this.message = message;
};

Error.prototype.printConsole = function() {
  console.log("\terror\n");
  console.log("\t   ERRNO: "+this.errno+"\n");
  console.log("\t   MSG  : "+this.message+"\n");
  console.log("\tend");
};

var Request = function(body, success, error) {
    this.body= body;
    this.success= success;
    this.error= error;
};

var Artist = function(data) {
    if(!data) {
        this.name = null;
        this.dob = null;
        this.albums = [{name: null, dor: null, songs: [{name: null, soundCloud: null}]}];
        this.genre = [{type: null}];
    } else {
        this._id = data._id;
        this.name = data.name;
        this.dob = new Date(data.dob).toDateString();
        this.albums = data.albums.slice(0);
        this.genre = data.genre.slice(0);
    }
};

Artist.prototype = {
  copy: function() {
      var anew = new Artist();
      anew._id = this._id;
      anew.name = this.name;
      anew.dob = this.dob;
      anew.albums = [];

      for(var a in this.albums) {
          var album = {
              _id: this.albums[a]._id,
              name: this.albums[a].name,
              dor: this.albums[a].dor
          };
          album.songs = [];
          for(var s in this.albums[a].songs)
              album.songs.push({
                  _id: this.albums[a].songs[s]._id,
                  name: this.albums[a].songs[s].name,
                  soundCloud: this.albums[a].songs[s].soundCloud
              });

          anew.albums[a] = album;
      }
      anew.genre = [];
      for(var a in this.genre) {
          anew.genre.push({
              _id: this.genre[a]._id,
              type: this.genre[a].type
          });
      }
      return anew;
  }
};
var URL = "http://nodejs-cs6240nwaghela.rhcloud.com/primebox/";
//var URL = "http://localhost:8888/primebox/";

services.factory('lfmAPIservice', function($http) {

    var lfmAPI = {};
    var artists = [];
    var searchList = [];

    lfmAPI.searchArtistsUI = function (filter, callback) {
        searchList = [];
        if(filter.keyword) {
            var reg = new RegExp(filter.keyword, 'ig');
            for (var i in artists) {
                var found = false;
                if (reg.test(artists[i].name)) {
                    found = true;
                }
                for (var j in artists[i].albums) {
                    if (reg.test(artists[i].albums[j].name)) {
                        found = true;
                    }
                    for (var k in artists[i].albums[j].songs) {
                        if (reg.test(artists[i].albums[j].songs[k].name)) {
                            found = true;
                        }
                    }
                }
                if(found)
                    searchList.push(artists[i]);
            }
        }
        if(searchList.length == 0)
            searchList = artists;
        callback(searchList);
        return searchList;
    };

    lfmAPI.getAllArtists = function(filter, callback) {
        $http.jsonp(URL+"artists?callback=JSON_CALLBACK&keyword="+filter.keyword)
          .success(function(data){
                artists = [];
                for(var d in data.data) {
                    for(var dt in data.data[d].albums) {
                        data.data[d].albums[dt].dor = new Date(data.data[d].albums[dt].dor).toDateString();
                    }
                    artists.push(new Artist(data.data[d]));
                }
            callback(artists);
          });
    };

    lfmAPI.getArtistById = function(id, callback) {
        $http.jsonp(URL+"artists/"+id+"?callback=JSON_CALLBACK")
          .success(function(data){
                callback(new Artist(data.data));
          });
    };

    lfmAPI.addArtist = function(request) {
        $http.post(URL+"artists", request.body)
          .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    for(var dt in data.data.albums) {
                        data.data.albums[dt].dor = new Date(data.data.albums[dt].dor).toDateString();
                    }
                    request.success(new Artist(data.data));
                }
          });
    };

    lfmAPI.removeArtist = function(request) {
        $http.delete(URL+"artists/"+request.body)
          .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    request.success(data.data);
                }
          });
    };

    lfmAPI.removeAlbum = function(request) {

        $http.delete(URL+"artists/"+request.body.artist+"/albums/"+request.body.album)
            .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    request.success(data.data);
                }
            });
    };

    lfmAPI.removeSong = function(request) {
        $http.delete(URL+"artists/"+request.body.artist+"/albums/"+request.body.album+"/songs/"+request.body.song)
            .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    request.success(data.data);
                }
            });
    };

    lfmAPI.editArtist = function(request) {
        $http.put(URL+"artists/"+request.body._id, request.body)
            .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    for(var dt in data.data.albums) {
                        data.data.albums[dt].dor = new Date(data.data.albums[dt].dor).toDateString();
                    }
                    request.success(new Artist(data.data));
                }
            });
    };

    lfmAPI.getFilter = function () {
        return new Filter();
    };

    return lfmAPI;
  });

var Filter =  function() {
    this.keyword = null;
    this.start = null;
    this.end = null;
};