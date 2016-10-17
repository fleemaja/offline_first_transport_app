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
    });

    // auto select the day tab based on current day
    // new Date().getDay() will return 0 for Sunday, 1 for Monday, and so on...
    switch (new Date().getDay()) {
        case 0:
            $('#sunday').addClass("active");
            break;
        case 6:
            $('#saturday').addClass("active");
            break;
        default:
            $('#weekday').addClass("active");
    }
});

departureDropdown.change(function() {
    var departure = departureDropdown.val();
    // update DOM with the stops in between start and end destination
    getStops();
    // update DOM with time table
    getTimes();
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
    // update DOM with time table
    getTimes();
    // disable departure option already selected as arrival station
    departureDropdown.children( "option" ).each(function () {
        if (this.text === arrival) {
            $(this).attr('disabled', 'disabled');
        } else {
            $(this).removeAttr('disabled');
        }
    });
});

// function to update DOM with display of intermediary stops between selected stations
function getStops() {
    var departure = departureDropdown.val();
    var arrival = arrivalDropdown.val();
    $('#stops').html("");
    
    var indexOfDeparture = stops.indexOf(departure);
    var indexOfArrival = stops.indexOf(arrival);
    
    if (indexOfArrival > -1 && indexOfDeparture > -1) {
        var direction = indexOfArrival > indexOfDeparture ? "Southbound" : "Northbound";
        $('#service-direction').html("<h2>" + direction + " Service</h2>");
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

$('.nav-tabs li').click(function() {
    $('.nav-tabs li').removeClass("active");
    $(this).addClass("active");
    getTimes();
});

function getTimes() {
    var departure = departureDropdown.val();
    var arrival = arrivalDropdown.val();
    
    var dayType = $('.nav-tabs .active').text();
    
    var indexOfDeparture = stops.indexOf(departure);
    var indexOfArrival = stops.indexOf(arrival);
    
    if (indexOfArrival > -1 && indexOfDeparture > -1) {
    
        $.ajax({
            type : 'GET',
            dataType : 'json',
            url: '/stop_trips',
            success: function(json) {
                $('#time-table').html("");
                var departureTrips = json[departure];
                var arrivalTrips = json[arrival];
                var html;
                for (var i = 0; i < departureTrips.length; i++) {
                    for (var j = 0; j < arrivalTrips.length; j++) {
                        if (departureTrips[i].trip_id.toString() === arrivalTrips[j].trip_id.toString()) {
                            if (departureTrips[i].stop_sequence < arrivalTrips[j].stop_sequence) {
                                if (departureTrips[i].trip_day === dayType) {
                                    html = "";
                                    html += '<tr>';
                                    html += '<td>' + departureTrips[i].stop_time + '</td>';
                                    html += '<td>' + departureTrips[i].trip_day + '</td>';
                                    html += '<td>' + arrivalTrips[j].stop_time + '</td>';
                                    html += '</tr>'
                                    $('#time-table').append(html);
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}