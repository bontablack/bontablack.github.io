document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the username and password entered by the user
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Define the list of possible usernames and passwords
  var users = [
    { username: "salsat", password: "test1234" },
    { username: "marjur", password: "test1234" },
    { username: "vojcer", password: "test1234" },
    { username: "tvojemama", password: "smrdi" },
    { username: "adrian", password: "jekkt" },
    { username: "admin", password: "test1234" } // Add admin user
  ];

  // Check if the entered username and password match any of the users
  var isAuthenticated = users.some(function(user) {
    return user.username === username && user.password === password;
  });

  if (isAuthenticated) {
    // Set isAdmin flag based on the logged-in user
    var isAdmin = username === "admin";
    // Redirect to the dashboard page and pass isAdmin flag as URL parameter
    window.location.href = "dashboard.html?isAdmin=" + isAdmin;
  } else {
    // Display error message if username or password is incorrect
    document.getElementById("error-message").textContent = "Incorrect username or password";
  }
});
