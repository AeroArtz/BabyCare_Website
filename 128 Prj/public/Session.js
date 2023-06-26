const session = require('express-session');
var mySession;

exports.setMySession = function (username) {
    session.userName = username;
    mySession = session;
    console.log("Session Created.");
};

exports.setUserIdSession = function (empId) {
    session.empId = empId;
    mySession = session;
    console.log("Employee ID Session Created.");
};

exports.getMySession = function(){
    return mySession;
};

exports.deleteSession = function () {
    mySession = "";
    console.log("Session Deleted.");
}
