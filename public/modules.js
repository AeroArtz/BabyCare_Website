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

exports.registerUser = function (res, body) {
    var firstname = body.firstname;
    var lastname = body.lastname;
    var username = body.username;
    var email = body.email;
    var password = body.password;
    var repeatedPassword = body.pass2;
  
    if (password !== repeatedPassword) {
      // Passwords don't match, send error message
      fs.readFile("registration_page.html", function (err, data) {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end("404 Not Found");
        }
        var modifiedData = data.toString().replace('<p id="message"></p>', '<p id="message">Passwords do not match</p>');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(modifiedData);
        return res.end();
      });
    } else {
      // Passwords match, check username and email availability
      con = this.connectToDB();
      con.connect(function (err) {
        if (err) throw err;
        var selectQuery = "SELECT * FROM users_info WHERE username = ? OR email_id = ?";
        con.query(selectQuery, [username, email], function (err, result) {
          if (err) throw err;
          if (result.length > 0) {
            // Username or email already taken, send error message
            fs.readFile("registration_page.html", function (err, data) {
              if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
              }
              var modifiedData = data.toString().replace('<p id="message"></p>', '<p id="message">Username or email already in use</p>');
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.write(modifiedData);
              return res.end();
            });
          } else {
            // Username and email are available, proceed with registration
            bcrypt.hash(password, 10, function (err, hashedPassword) {
              if (err) throw err;
  
              var sql = "INSERT INTO users_info(firstname,lastname,username,email_id,password,dateof_reg) values(?,?,?,?,?,SYSDATE())";
              con.query(sql, [firstname, lastname, username, email, hashedPassword], function (err, result) {
                if (err) throw err;
                console.log("User added successfully");
                res.writeHead(302, { 'Location': '/login.html' });
                return res.end();
              });
            });
          }
        });
      });
    }
