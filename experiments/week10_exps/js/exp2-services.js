var services = angular.module('TripPlannerApp.services', []);

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

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        callback({ err: "Geolocation is not supported by this browser."});
    }
}

services.factory('mapsAPIservice', function($http) {
    var mapsAPI = {};

    mapsAPI.load = function () {
        getLocation(function(data) {
            var loc;
            if(data.err)
                console.log(data.err);
            else {
                loc = {lat: data.coords.latitude, lng: data.coords.longitude};
                google.maps.event.addDomListener(window, 'load', initialize(null, loc, 15));
            }
        });

    };

    return mapsAPI;
  });