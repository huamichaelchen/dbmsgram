var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join('../', 'config'));



router.get('/auth/login', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("select username, password from registered_user where username='huamichaelchen';");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});
