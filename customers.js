// Import the built-in HTTP module 
const http = require('http');

// Import the mysql module
const mysql = require('mysql');

// Import the database connection pool into customer.js
const pool = require ('../LAUNDRY APP/databaseconnect');

// Create a HTTP Server
const server = http.createServer ((req,res) => {
      const {method, url} = req;

      
// Route api/customers/
if (method === 'GET' && URL === '/api/customers' ){
    pool.getConnection((error,connection) =>{
        if (error){
            console.error ('Error connecting to database:', error);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
        else{
    // Perform a SELECT query to fetch all the customers
            connection.query ('SELECT * FROM customers',(error, results) => {
            // Release the database connection
                connection.release();
        if (error) {
            console.error ('Error fetching customers', error);
            res.statusCode = 500;
            res.end (JSON.stringify({error : 'Internal Server Error'}));
        }
       else{
        res.setHeader ('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end (JSON.stringify (results));
       }
            });
        }
    });
}
    // Get a specific customer 
if (req.method === 'GET' && req.url.startsWith('/api/customers/')){
        // Extract the customer ID from the URL
   const customerId = req.url.split('/')[3]; 
    // Get a connection from the database connection pool
    pool.getConnection((error,connection) => {
    if (error){
        console.error('Error connecting to database:', error);
        res.statusCode = 500;
        res.end (JSON.stringify ({error : 'Internal Server Error'}));
    }
    else {
        // Perform a SELECT query to fetch the specific customer 
        connection.query ('SELECT * FROM customers where id = ?', [customerId], (error,results) => {
            // Release the database connection
            connection.release ();
    if  (error) {
        console.log ('Error fetching customer:', error);
        res.statusCode = 500;
        res.end (JSON.stringify ({error: 'Internal Server Error'}));
    }
    else if (results.length === 0){
        res.statusCode = 404;
        res.end (JSON.stringify ({error : 'Customer not found'}));
    }
    else {
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'application/json');
        res.end (JSON.stringify (results[0]));
    }
        });
    }
    });
}
});

// Start the server and listen on port 3000
   server.listen (3000,() => {
    console.log('Server listening on port 3000');
   });






