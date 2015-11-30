var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');
var pg = require('pg');
var path = require('path');
var request = require('request');

var app = express();
var connectionString = process.env.DATABASE_URL || 'postgres://mc:dbms-project-3753@localhost:5432/dbmsproject_hua_chen';

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*  sign in */
app.get('/auth/login', function(req, res) {
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

/* list a specific user */
app.get('/api/v1/user', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("select username from registered_user where username='huamichaelchen';");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

/* list all photos */
app.get('/api/v1/p', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("select * from photo;");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

/* list specific photo */
app.get('/api/v1/p/:photo_id', function(req, res) {
    var results = [];
    var photo_id = req.params.photo_id;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        var query = client.query("select * from photo where photo_id=($1);", photo_id);

        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
    })
});

/* list photos with specific hashtag */
app.get('/api/v1/explore/:hashtag', function(req, res) {
    var results = [];
    var hashtag = req.params.values;

    console.log(req);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        var query = client.query("select photo_url from hashtag where hashtag=($1);", hashtag);
        console.log(query);
        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});


app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
