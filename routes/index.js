'use strict';

var path = process.cwd();

module.exports = function (app) {
    app.route('/')
        .get(function(req, res) {
        	  res.status(200).render(path + '/public/html/index.ejs');
        });
}