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

var username = '';

app.get('/login_page',function(req,res){
    modules.login(res);
})

app.get('/viewServices',function(req,res){
    fs.readFile('./public/viewServices.html',function(err,data){
        if (err) throw err;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                
                return res.end();
        
            
    });
})

app.post('/checkout',function(req,res){
    let body = req.body;
    //for (let i=0;i<body.services.length;i++){
      //  console.log(body.services[i].id);
    //}
    var servicesObj = JSON.parse(body.services);
    modules.addServices(res,servicesObj,username);
    
    
    
    
});

app.post('/login',function(req,res){
            let body = req.body;
            console.log(body);
            // Authonticate user credentials.
            modules.auth_user(res,body); 
            username = body.username;
            
            
        });

    


app.get('/',function(req,res){
    fs.readFile('./public/login.html',function(err,data){
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
    })

});

app.get('/home',function(req,res){
    fs.readFile('./public/homepage.html',function(err,data){
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
    })

});

app.get('/registration_page',function(req,res){
    fs.readFile('./public/registration_page.html',function(err,data){
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
    })

});
app.post('/register',function(req,res){
    let body = req.body;
    console.log(body);
    // Authonticate user credentials.
    modules.registerUser(res,body);  
});

app.get('/services',function(req,res){
    modules.getServices(res,modules.displayServices);    
})

app.listen(8080);