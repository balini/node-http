const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

//simulates a request from the client-side and a response from the server-side
const server = http.createServer((req,res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method == 'GET') {
        var fileUrl;

        //passes the url from the index file
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        var filePath = path.resolve('./public'+fileUrl);

        //verify if the file extension is correct (html file)
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {

            //verify if the file exists
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404:' + fileUrl + ' not found</h1></body></html>')

                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                //reads the file and includes it in the body of the response (send the file out)
                fs.createReadStream(filePath).pipe(res);
            })
        }

        //if the file is not html throw an error
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404:' + fileUrl + ' not an HTML file</h1></body></html>')

            return;
        }
    }

    //if the request method is not GET
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404:' + req.method + ' not supported </h1></body></html>')

        return;
    }
})

//starts the server (the server listens for incoming requests)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});