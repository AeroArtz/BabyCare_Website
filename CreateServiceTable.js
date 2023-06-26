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
    
    var sql_table = "CREATE TABLE services (service_id INT PRIMARY KEY, " + 
    "service_name VARCHAR(255)," +
    "service_description VARCHAR(320)," +
    "price DECIMAL(10, 2))" ;
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Service Table created");
    });
});
