var pg = require('pg');
var path = require('path');

var connectionString = require(path.join('../', 'config'));

var client = new pg.Client(connectionString);
client.connect();


// TODO: fix it later or not... 
/*
var query = client.query('CREATE TABLE ....');
query.on('end', function() { client.end(); });
*/
