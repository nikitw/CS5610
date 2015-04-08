/**
 * Created by nikit on 4/7/15.
 */

$(document).on('keyup', '#address', function(e) {
    if(e.keyCode == 13) {
        var loc;
        var address = $(this).val().replace(/\s+/, '+');
        if(address == '')
            initialize(e);
        else
            $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address, function (data) {
                try{
                    loc = data.results[0].geometry.location;
                    initialize(e, loc, 15);
                } catch (err) {
                    alert('invalid address');
                }
            });
    }
});
