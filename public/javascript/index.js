var departureDropdown = $('#departure-station');
var arrivalDropdown = $('#arrival-station');

$.ajax({
    type : 'GET',
    dataType : 'json',
    url: '/stop_list',
    success: function(json) {
        json.forEach(function(stop) {
            departureDropdown.append('<option>' + stop.stop_name + '</option>');
            arrivalDropdown.append('<option>' + stop.stop_name + '</option>');
        });
    }
})