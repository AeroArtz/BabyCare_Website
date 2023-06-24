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

exports.register = function (res) {   // to display error message if there is any.
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



}