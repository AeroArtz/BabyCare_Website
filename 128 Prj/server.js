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
        }else{
            modules.register(res);
        }

        
    }
).listen(8080);