// Import the built-in http module
const http = require('http');

// Import the mysql module
const mysql = require('mysql');

// Import the database connection pool into orders.js
const pool = require('../LAUNDRY APP/databaseconnect.js');

// Create a HTTP server
const server = http.createServer (async(req,res) => {
      const {method, url} = req;

// Create Route : GET  /api/orders 
if (method === 'GET' && URL === '/api/orders'){
    try {
        // Get a connection from the database connection pool
        const connection = awaitpool.getConnection();
        // Perform a SELECT query to fetch all orders
        const results = awaitconnection.query('SELECT * FROM orders');
        // Release the database connection
        connection.release();
        // Set the response header to JSON format
        res.setHeader('Content-Type', 'application/json');
        // Set the HTTP status code
        res.statusCode = 200;
        // Send the response with the JSON string as the response body
        res.end (JSON.stringify (results)); 
    }
    // Use catch to handle error that may occur within the try block  
    catch (error) {
        // Log an error message to the console
        console.error('Error fetching orders', error);
        // Set the response HTTP status code
        res.statusCode = 500;
        // Send the error response body back to the client as a JSON string
        res.end (JSON.stringify ({error : 'Internal Server Error'}));
    }
}

// Create Route : POST /api/orders
if (method === 'POST' && url === '/api/orders') {
        // Create body variable to accumulate the request body data
        let body = '';
        // Set up event listener on the request body
        req.on ('data', (chunk) => {
            // Accumulate the request body
            body += chunk 
        });
        req.on ('end', async () => {
            try {
                // Parse the request body as JSON 
                const order = JSON.parse(body);
                // Get a connection from the database connection pool
                const connection = await pool.getConnection();
                // Perform an insert query to create a new order
                const result = await connection.query('INSERT INTO ORDERS SET order_id = ?', order);
                // Release the database connection
                connection.release ();
                // Set the response status code
                res.statusCode = 201;
                // Set the response header to JSON format
                res.setHeader ('Content-Type', 'application/json');
                // Send the response to the client as JSON string
                res.end (JSON.stringify ({ orderId : result.insertId})) 
            }
            catch (error) {
                console.error ('Error creating order', error);
                res.statusCode = 500;
                res.end (JSON.stringify ({error : 'Internal Server Error'}));
            }
        });
}

// Create Route : PUT /api/orders:id
if (method === 'PUT' && url.startsWith ('api/orders/:id')) {
    // Extract order ID from url 
   const orderId = url.split('/')[3];
   // Create a body variable to accumulate the body data
   let body = '';
   // Set up an event listener on the request object for the 'data' event
   req.on ('data', (chunk) => {
    // Accumulate the request body 
   body += chunk ;
   });
   // Set up an event listener on the 'end' event
   req.on ('end', async () => {
    // Set up error handling using try-catch block
    try {
        // Parse the request body as JSON
       const order = JSON.parse(body);
        // Get a connection from the database connection pool
       const connection = await pool.getConnection();
        // Perform an UPDATE query to update the order
        await connection.query ('UPDATE orders SET ? WHERE id = ?', [order,orderId]);
        // Release the database connection
        connection.release ();
        // Set up the response status code
        res.statusCode = 200;
        //
        res.setHeader ('Content-Type', 'application/json');
        //
        res.end (JSON.stringify ({success : true }));       
    }
    catch (error) {
        console.error ('Error updating order', error);
        res.statusCode = 500;
        res.end (JSON.stringify ({error : 'Internal Server Error'}));
    }
   });
}

// Create Route : DELETE /api/orders/:id
if (method ==='DELETE' && url.startsWith('/api/orders/')) {
    const orderId = url.split ('/',)[3];
    try {
        // Get a connection from the database connection pool
        const connection = await pool.getConnection 
        // Perform a DELETE query to delete the order
        await connection.query ('DELETE FROM orders WHERE id = ?', orderId);
        // Release the database connection
        connection.release ();
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'application/json');
        res.end (JSON.stringify ({success : true }));
    }
    catch (error) {
        console.error ('Error fetching data', error);
        res.statusCode = 500;
        res.end (JSON.stringify ({error : 'Internal Server Error'}));
    }
}
   });

// Start the server and listen on port 3000
   server.listen (3000, () => {
    console.log ('Server listening on port 3000');
   });
















