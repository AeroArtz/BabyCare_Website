var modules = require('./modules');
var http = require('http');
var url = require('url');
var fs = require('fs');
var session = require('./Session')
querystring = require('querystring');


http.createServer(
    function(req,res){
        var body = '';

        if (req.url=='/register'){
            
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                // use parse() method
                body = querystring.parse(body);
    
                // Authonticate user credentials.
                modules.registerUser(res,body,session);  
            });
        }else if(req.url=='/services.html'){
            modules.getServices(res,modules.displayServices);
        
        }else{
            fs.readFile("homepage.html", function (err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }

        
    }
).listen(8080);