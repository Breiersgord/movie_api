const http = require('http'); //creates a variable called 'http' then assigns to it an instance of the HTTP module. this is what imports the HTTP module and allows you to use its function createServer()
fs = require('fs');
url = require('url');

http.createServer((request, response) => { //2 arguments, request & response; this function will be called every time an HTTP request is made against that server, which why it's called the 'request handler'
    let addr = request.url,
        q = new URL(addr, 'http://localhost:8080'),

        filePath = '';
            if (q.pathname.includes('documentation')) {
                filePath = (__dirname + '/documentation.html');
            } else {
                filePath = 'index.html';
            }

        fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Added to log.');
            }
        });

        fs.readFile(filePath, (err, data) => {
                if (err) {
                    throw err;
                }
        
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(data);
        response.end('Hello Node!\n');
    });
}).listen(8080); // port 80 is the standard fort for the HTTP, but you can use any number you want with the following caveat: the port number must be >1024; this is because ports lower than this are reserved by the operating system
console.log('My first Node test server is running on Port 8080.');