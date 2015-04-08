/**
 * Created by nikit on 4/7/15.
 */
function initialize(e, loc, zoom) {
    if(loc == null || loc == undefined)
        loc = {lat: 42.333821, lng: -71.0966081};
    var mapOptions = {
        center: loc,
        zoom: (zoom)? zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: $('#address').val()
    });

    return loc;
}
