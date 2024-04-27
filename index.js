// Wait for the DOM to be fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
  // Get the login form element
  var loginForm = document.getElementById("login-form");

  // Add event listener for form submission
  loginForm.addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if the username and password match any of the predefined credentials
    var validCredentials = [
      { username: "salsat", password: "test1234" },
      { username: "marjur", password: "test1234" },
      { username: "vojcer", password: "test1234" } //Add admin user
    ];

    // Check if the entered credentials match any of the valid credentials
    var isValidUser = validCredentials.some(function(credential) {
      return credential.username === username && credential.password === password;
    });

    // If the credentials are valid, redirect to the dashboard with appropriate parameters
    if (isValidUser) {
      // Determine if the user is an admin
      var isAdmin = username === "admin";
      // Redirect to the dashboard with appropriate parameters
      window.location.href = "dashboard.html?isAdmin=" + isAdmin;
    } else {
      // If the credentials are invalid, display an error message
      document.getElementById("error-message").textContent = "Invalid username or password. Please try again.";
    }
  });
});
