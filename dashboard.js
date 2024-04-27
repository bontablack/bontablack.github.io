// Get the isAdmin flag from the URL parameter
var urlParams = new URLSearchParams(window.location.search);
var isAdmin = urlParams.get('isAdmin') === 'true';

// Function to generate and display the calendar for the given month and year
function displayCalendar(monthIndex, year) {
  // Existing code...

  // Display the current month name
  document.getElementById("dashboard-heading").textContent = "Welcome to " + currentMonthName + " " + currentYear;

  // Display option to add events if the user is admin
  if (isAdmin) {
    var addButton = document.createElement('button');
    addButton.textContent = 'Add Event';
    addButton.addEventListener('click', function() {
      // Add event handling logic here
      alert('Add event functionality is not implemented yet.');
    });
    document.getElementById("dashboard-heading").appendChild(addButton);
  }

  // Existing code...
}

// Get the container for the calendar
var calendarContainer = document.getElementById("calendar-container");
var currentMonthIndex;

// Function to generate and display the calendar for the given month and year
function displayCalendar(monthIndex, year) {
  currentMonthIndex = monthIndex;
  var currentDate = new Date(year, monthIndex, 1);
  var currentYear = currentDate.getFullYear();
  
  // Array of month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var currentMonthName = monthNames[monthIndex];

  // Display the current month name
  document.getElementById("dashboard-heading").textContent = "Welcome to " + currentMonthName + " " + currentYear;

  var firstDayOfMonth = new Date(currentYear, monthIndex, 1);
  var lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0);

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
  calendarContainer.innerHTML = calendarHTML;
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
