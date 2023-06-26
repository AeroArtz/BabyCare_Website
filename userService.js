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
    
    var sql_table = "CREATE TABLE Userservices (user_id VARCHAR(255), " + 
    "service_id VARCHAR(255)," +
    "PRIMARY KEY (user_id, service_id)," +
    "FOREIGN KEY (user_id) REFERENCES users_info(user_id),"+
    "FOREIGN KEY (service_id) REFERENCES services(service_id))" ;
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("User Service Table created");
    });
});