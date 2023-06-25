

exports.authenticateUser = function (res, body, mySess, myCallback) {
    var Username = body.username;
    var Password = body.password
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT * from users_info WHERE username = '" + Username + "' AND password = '" + Password + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result !== undefined && result.length > 0) {
                myCallback(res, mySess, result[0].username, body);
                res.redirect("/homepage.html");
            }
            else {

                var message = "<script>document.getElementById(\"displayErr\").innerHTML = \"Incorrect username or password\";</script> ";
                fs.readFile("login.html", function (err, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end(message);
                });
            }
        });
    });
}
