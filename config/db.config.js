'use strict';
const mysql = require('mysql');
//local mysql db connection
const host = process.env.HOST || 'localhost';
const dbConn = mysql.createConnection({
    host     :  host,
    user     : 'root',
    password : 'secret',
    database : 'test',
    port: 3306
});
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;