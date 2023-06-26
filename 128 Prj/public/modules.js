var mysql = require('mysql');
var fs = require('fs');

var con;

exports.connectToDB = function () {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin", // provide your own password.
        database: "blossom_care"
    });
    return con;
};

exports.register = function (res) {  
    fs.readFile("registration_page.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.home = function (res) {  
    fs.readFile("homepage.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.getServices = function(res,myCallBack){
    con = this.connectToDB();
    con.connect( function(err){
        if (err) throw err;
        var sql = 'SELECT * FROM services';
        con.query(sql,function(err,result){
            if (err) throw err;
            myCallBack(res,result);
        })
    })

};

exports.displayServices = function(res,result){
    fs.readFile('./public/services.html',function(err,data){
        if (err) throw err;
        res.write(data);
        res.write('<script>');
        var text = "";
        for (let i=0;i<result.length;i++){
            text+="<div id=\"s"+(i+1)+"\"><h2>"+result[i].service_name+"</h2><p>"+result[i].service_description+"</p><p class=\"price\"> AED "+result[i].price+" per session</p><button onclick=\"addService(id="+(i+1)+")\" class=\"add\">Add to Cart</button></div>";
        }
        res.write("document.getElementById('services-container').innerHTML ='"+text+"'");
        res.write('</script>');
        return res.end();
    })
};
exports.showHistory = function(req,res,username){
    con = this.connectToDB();
    con.connect( function(err){
        if (err) throw err;
        fs.readFile('./public/history.html',function(err,data){
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    
                    
        });
        const query = 'SELECT s_id,service_name FROM Userservices  WHERE username = ?' ;
        
        con.query(query,username,function(err,result){
            if (err) throw err;
        
            var text = '<table>';
            for (let i=0;i<result.length;i++){
                text+='<tr><td>'+result[i].s_id+'</td><td>'+result[i].service_name+'</td></tr>';
            }
            text+='</table>';
            
            res.write('<script>');
            res.write("document.getElementById(\"servicesHistory\").innerHTML = '" + text + "';" + "\n");
            //res.write("document.getElementById('servicesHistory').innerHTML ="+text+";")
            res.write('</script>');
            res.end();
            //document.getElementById('servicesHistory').innerHTML =text;
        })
    })
};
exports.hashpass = function(pass){
    return bcrypt.hash(pass,10);
}
exports.addServices = function(res,servicesObj,username){
    
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        for (let i =0;i<servicesObj.services.length;i++){
            
            var sql = "INSERT INTO Userservices(username,s_id,service_name) values('"+username+"',"+servicesObj.services[i].id+",'"+servicesObj.services[i].service+"')";
            con.query(sql, function (err, result) {
            if (err) throw err;
            
        });
            
        }
        
        
        
    });
    res.redirect('user_history');
    
    
    

};



exports.login = function (res) {   // to display error message if there is any.
    fs.readFile('./public/login.html', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};
/*
exports.auth_user = function (res, body) {
    var username = body.username;
    var password = body.password;
  
    // Connect to the database.
    con = this.connectToDB();
    con.connect(function (err) {
      if (err) throw err;
      // Get user record.
      var sql = "SELECT * FROM users_info WHERE username = ?";
      con.query(sql, [username], function (err, result) {
        if (err) throw err;
        if (result !== undefined && result.length > 0) {
          var user = result[0];
          // Compare the hashed password with the provided password
          bcrypt.compare(password, user.password, function (err, passwordMatch) {
            if (err) throw err;
            if (passwordMatch) {
              // Passwords match, redirect to the homepage
              fs.readFile('./public/homepage.html', function (err, data) {
                if (err) throw err;
                return res.end(data);
              });
            } else {
              // Passwords don't match, show error message on the login page
              fs.readFile("./public/login.html", function (err, data) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(data);
                res.write("<script>document.getElementById(\"displayErr\").innerHTML = \"You have entered an incorrect username or password!\";</script> ");
                return res.end();
              });
            }
          });
        } else {
          // User not found, show error message on the login page
          fs.readFile("./public/login.html", function (err, data) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(data);
            res.write("<script>document.getElementById(\"displayErr\").innerHTML = \"You have entered an incorrect username or password!\";</script> ");
            return res.end();
          });
        }
      });
    });
  };
  */
  exports.auth_user = function (res, body) {
    var username = body.username;
    var password = body.password;
    console.log(1);
    // Connect to the database.
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        // Get user record.
        console.log(1);
        var sql = "SELECT * from users_info WHERE username = '" + username + "' AND pass = '" + password + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result !== undefined && result.length > 0) {
                res.redirect('home');
                res.end();
            }
            else {
            // show error message on the login page.
                
                fs.readFile("./public/login.html", function (err, data) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.write("<script>document.getElementById(\"displayErr\").innerHTML = \"You have entered an incorrect username or password!\";</script> ");    
                    return res.end();                       
                });
                
            }      
     });
    });
};

exports.registerUser = function (res, body) {
    
    var firstname = body.firstname;
    console.log(firstname);
    let lastname = body.lastname;
    console.log(lastname);
    let username = body.username;
    console.log(username);
    var email = body.email;
    console.log(email);
    var password = body.password;
    console.log(password);
    con = this.connectToDB();
    con.connect( function(err){
        if (err) throw err;
        var sql = "INSERT INTO users_info(firstname,lastname,username,email_id,pass,dateof_reg) values('"+firstname+"','"+lastname+"','"+username+"','"+email+"','"+password+"',CURDATE()"+")";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("user added successfully")
        })
    }
    
    
    
    )



};