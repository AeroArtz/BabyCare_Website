var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin", // provide your own password.
    database: "blossom_care"
});


con.connect( function(err){
    if (err) throw err;
    var sql = 'SELECT * FROM services';
    con.query(sql,function(err,result){
        if (err) throw err;
        var text = "";
        for (let i=0;i<result.length;i++){
            text+="<div><h2>"+result[i].s_title+"</h2><p>"+result[i].s_desc+"</p><p>"+result[i].s_price+"</p></div>";
        }
        document.getElementById('services-container').innerHTML =text;
    })
})