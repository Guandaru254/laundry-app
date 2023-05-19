const http = require('http');

// Craete a HTTP server
const server = http.createServer((req,res) => {
    // set response status code to  200 to mean success
    res.statusCode = 200;
    
    //set the header content-type to plain text
    res.setHeader('Content-Type', 'text/plain');

    //send the response body as Hello World
    res.end ('Hello JS');
});

const port = process.env.PORT || 3000;

//Start the server and listen on port 3000
server.listen(port, () => {
      console.log ('Server listening at http://localhost:${port}/');
});