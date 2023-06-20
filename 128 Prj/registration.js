function showPass1() {

    var x = document.getElementById("new_password");
    if (x.type === "password") {
    x.type = "text";

    } else {
        x.type = "password";
    }
} 
function showPass2() {

    var x = document.getElementById("repeated_password");
    if (x.type === "password") {
    x.type = "text";

    } else {
        x.type = "password";
    }
} 

function passmatch(){
    var x = document.getElementById("new_password").value;
    
    var y = document.getElementById("repeated_password").value;
    
    var messageElement = document.getElementById("message");

    if(x == y){
        
        messageElement.textContent = "Registered Successfully.";

        let username = document.getElementById("new_username").value;
        let password = document.getElementById("new_password").value;

//localstorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        alert("Details saved in local storage");
    }
    else{
        messageElement.textContent = "Fields do not match. Please try again.";
        document.getElementById("repeated_password").value = "";
    }
}
