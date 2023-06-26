var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin", 
    database: "blossom_care" 
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    
    var sql_table = "CREATE TABLE Userservices (username varchar(100), " + 
    "s_id int,PRIMARY KEY (username, s_id)," +
    "FOREIGN KEY (s_id) REFERENCES services(service_id))" ;
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("User Service Table created");
    });
});