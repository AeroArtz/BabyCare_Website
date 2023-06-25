const express = require('express');
const app = express();
const path = require('path');
var mysql = require('mysql');
var fs = require('fs');
querystring = require('querystring');
var modules = require('./public/modules');
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var modules = require('./public/modules');
app.use(express.static(path.join(__dirname,'/public')));


app.get('/',function(req,res){
    modules.login(res);
})

app.post('/login',function(req,res){
            let body = req.body;
            console.log(body);
            // Authonticate user credentials.
            modules.auth_user(res,body);  
        });

    


app.get('/home',function(req,res){
    fs.readFile('./public/homepage.html',function(err,data){
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
    })

})

app.get('/services',function(req,res){
    modules.getServices(res,modules.displayServices);    
})

app.listen(8080);