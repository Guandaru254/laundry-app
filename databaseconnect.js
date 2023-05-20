// Import mysql module
const mysql = require('mysql');

// Database connection configuration
const dbconfig = {
    host : 'localhost',
    user : 'root',
    password : ' ',
    database : 'laundry_app',
}

// Create a database connection pool
const pool = mysql.createPool (dbconfig);

// Export the connection pool
module.exports = pool;


