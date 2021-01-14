const http = require('http');

const hostname = 'localhost';
const port = 3000;

//simulates a request from the client-side and a response from the server-side
const server = http.createServer((req,res) => {
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello, World!</h1></body></html>')
})

//starts the server (the server listens for incoming requests)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});