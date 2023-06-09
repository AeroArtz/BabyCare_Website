document.addEventListener('DOMContentLoaded', function() {
  function handleFormSubmit(event) {
    event.preventDefault();

    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    const checkValid = document.getElementById('validate');

    if (inputUsername === savedUsername && inputPassword === savedPassword) {
      window.location.href = 'Homepage.html';
    } else {
      checkValid.textContent = 'Invalid username or password';
    }
  }

  const loginForm = document.querySelector('form');
  loginForm.addEventListener('submit', handleFormSubmit);
});
