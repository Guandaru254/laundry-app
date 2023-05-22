// Import the http module
const http = require('http');

// Import the mysql module
const mysql = require('mysql');

// Import the database connection pool
const pool = require('../LAUNDRY APP/employees.js');

// Create a http server
const server = http.createServer ((req,res) => {
      const {method, url:requesturl} = req;

// Route for Create Customer
      if (method === 'POST'  && requesturl === '/api/employees/'){
  let requesstbody = '';
// Assign event listener to the req object 
  req.on ('data', (chunk) => {
    requestbody += chunk; });
      }
// Assign  another event listener to the req object again
  req.end ('data', () => {})      
});
