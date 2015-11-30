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
    var data = {text: req.body.text, complete: req.body.complete};

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

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


/* TODO:  Potential code to help authenticate user !!!!

function createToken(user) {
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user._id
    };

    return jwt.encode(payload, config.tokenSecret);
};

function isAuthenticated(req, res, next) {
    if (!(req.headers === req.headers.authorization)) {
        return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
    }

    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, config.tokenSecret);
    var now = moment().unix();

    if (now >= payload.exp) {
        return res.status(401).send({ message: 'Token has expired.' });
    }

    // Here, User is a Mongoose object...
    User.findById(payload.sub, function(err, user) {
        if (!user) {
            return res.status(400).send({ message: 'User no longer exists.' });
        }

        req.user = user;
        next();
    })
}
*/
