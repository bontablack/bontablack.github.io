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

// Function to generate and display the calendar for the given month and year
function displayCalendar(monthIndex, year) {
  // Array of month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var currentMonthName = monthNames[monthIndex];

  // Display the current month name
  document.getElementById("dashboard-heading").textContent = "Welcome to " + currentMonthName + " " + year;

  var firstDayOfMonth = new Date(year, monthIndex, 1);
  var lastDayOfMonth = new Date(year, monthIndex + 1, 0);

  var daysInMonth = lastDayOfMonth.getDate();
  var startingDay = firstDayOfMonth.getDay();

  var calendarHTML = "<table>";
  calendarHTML += "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";

  var dayCount = 1;
  for (var i = 0; i < 6; i++) {
    calendarHTML += "<tr>";
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        calendarHTML += "<td></td>";
      } else if (dayCount > daysInMonth) {
        calendarHTML += "<td></td>";
      } else {
        calendarHTML += "<td>" + dayCount + "</td>";
        dayCount++;
      }
    }
    calendarHTML += "</tr>";
    if (dayCount > daysInMonth) {
      break;
    }
  }
  calendarHTML += "</table>";

  // Display the calendar in the container
  document.getElementById("calendar-container").innerHTML = calendarHTML;
}

  // Display option to add events if the user is admin
  if (isAdmin) {
    // Add event listeners to date cells for adding events
    var dateCells = document.querySelectorAll("#calendar-container td");
    dateCells.forEach(function(cell) {
      cell.addEventListener("click", function() {
        var selectedDate = cell.textContent;
        var selectedMonth = monthIndex + 1; // Month is zero-indexed
        var formattedDate = year + "-" + (selectedMonth < 10 ? "0" + selectedMonth : selectedMonth) + "-" + (selectedDate < 10 ? "0" + selectedDate : selectedDate);
        var eventName = prompt("Enter event name:");
        if (eventName) {
          var eventColor = prompt("Enter event color (e.g., #ff0000):");
          addEvent(formattedDate, eventName, eventColor);
          displayCalendar(monthIndex, year); // Refresh calendar display
        }
      });
    });
  }
}

// Function to add event to the calendar
function addEvent(date, name, color) {
  // Create a unique ID for the event
  var eventId = "event-" + Math.random().toString(36).substr(2, 9);

  // Create event element
  var eventElement = document.createElement("div");
  eventElement.id = eventId;
  eventElement.classList.add("event");
  eventElement.style.backgroundColor = color;
  eventElement.textContent = name;

  // Find the cell corresponding to the date and append the event
  var dateCell = document.querySelector("td[data-date='" + date + "']");
  if (dateCell) {
    dateCell.appendChild(eventElement);
  }
}

// Function to display the previous month
function prevMonth() {
  currentMonthIndex--;
  if (currentMonthIndex < 0) {
    currentMonthIndex = 11; // December
    currentYear--;
  }
  displayCalendar(currentMonthIndex, currentYear);
}

// Function to display the next month
function nextMonth() {
  currentMonthIndex++;
  if (currentMonthIndex > 11) {
    currentMonthIndex = 0; // January
    currentYear++;
  }
  displayCalendar(currentMonthIndex, currentYear);
}

// Initialize the calendar with the current month
var currentDate = new Date();
var currentMonthIndex = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
displayCalendar(currentMonthIndex, currentYear);
