var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "remotemysql.com",
  user: "GhhvtmJSVD",
  password: "FVWpDYeBuD",
  database: "GhhvtmJSVD"
});


var __dbConnection__ = conn


module.exports = {conn,mysql,__dbConnection__};