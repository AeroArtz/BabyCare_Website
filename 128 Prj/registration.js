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

function passmatch() {
  var x = document.getElementById("new_password").value;
  var y = document.getElementById("repeated_password").value;
  
  var messageElement = document.getElementById("message");
  
  if (x === y) {
    var firstname = document.getElementById("fname").value;
    var lastname = document.getElementById("lname").value;
    var username = document.getElementById("new_username").value;
    var email = document.getElementById("new_email").value;
    var password = document.getElementById("new_password").value;
  
    // Create an object with the user data
    var userData = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password
    };
  
    // Make a POST request to the server-side API
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        messageElement.textContent = "Registered Successfully.";
        alert("User created");
      })
      .catch(error => {
        console.error('Error registering the user:', error);
        messageElement.textContent = "An error occurred while registering. Please try again.";
      });
  } else {
    messageElement.textContent = "Fields do not match. Please try again.";
    document.getElementById("repeated_password").value = "";
  }
}



