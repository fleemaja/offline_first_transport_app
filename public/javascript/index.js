var departureDropdown = $('#departure-station');
var arrivalDropdown = $('#arrival-station');
// global variable for stop names (populated with ajax json response)
var stops = [];

// populate departure and arrival dropdowns with caltrain stop names
$(document).ready(function() {
    $.ajax({
        type : 'GET',
        dataType : 'json',
        url: '/stop_list',
        success: function(json) {
            json.forEach(function(stop) {
                departureDropdown.append('<option>' + stop.stop_name + '</option>');
                arrivalDropdown.append('<option>' + stop.stop_name + '</option>');
                stops.push(stop.stop_name);
            });
        }
    })
});

departureDropdown.change(function() {
    var departure = departureDropdown.val();
    // update DOM with the stops in between start and end destination
    getStops();
    // disable arrival option already selected as departure station
    arrivalDropdown.children( "option" ).each(function () {
        if (this.text === departure) {
            $(this).attr('disabled', 'disabled');
        } else {
            $(this).removeAttr('disabled');
        }
    });
});

arrivalDropdown.change(function() {
    var arrival = arrivalDropdown.val();
    // update DOM with the stops in between start and end destination
    getStops();
    // disable departure option already selected as arrival station
    departureDropdown.children( "option" ).each(function () {
        if (this.text === arrival) {
            $(this).attr('disabled', 'disabled');
        } else {
            $(this).removeAttr('disabled');
        }
    });
});

// function to update DOM with intermediary stops between selected stations
function getStops() {
    var departure = departureDropdown.val();
    var arrival = arrivalDropdown.val();
    $('#stops').html("");
    
    var indexOfDeparture = stops.indexOf(departure);
    var indexOfArrival = stops.indexOf(arrival);
    
    if (indexOfArrival > -1 && indexOfDeparture > -1) {
        if (indexOfDeparture < indexOfArrival) {
            for (var i = indexOfDeparture + 1; i < indexOfArrival; i++) {
                $('#stops').append('<p><span class="stop-sign"><i class="fa fa-arrow-down"></i></span>' + stops[i] + '</p>');
            }
        } else {
            for (var j = indexOfDeparture - 1; j > indexOfArrival; j--) {
                $('#stops').append('<p><span class="stop-sign"><i class="fa fa-arrow-down"></i></span>' + stops[j] + '</p>');
            }
        }
    }
}