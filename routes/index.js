'use strict';

var path = process.cwd();

var stopList = require("../caltrain_data/stop_list.json");
var stopTrips = require("../caltrain_data/stop_trips.json");

module.exports = function (app) {
    app.route('/')
        .get(function(req, res) {
        	  res.status(200).sendFile(path + '/index.html');
        });
        
    app.route('/stop_list')
        .get(function(req, res) {
            res.status(200).json(stopList);
        });
        
    app.route('/stop_trips')
        .get(function(req, res) {
            res.status(200).json(stopTrips);
        });
}