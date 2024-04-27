// Get the isAdmin flag from the URL parameter
var urlParams = new URLSearchParams(window.location.search);
var isAdmin = urlParams.get('isAdmin') === 'true';

// Function to generate and display the calendar for the given month and year
function displayCalendar(monthIndex, year) {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();
  
  // Array of month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var currentMonthName = monthNames[currentMonth];

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

// Function to generate and display the calendar for the given month and year
function displayCalendar(monthIndex, year) {
  // Existing code...

  // Display the calendar in the container
  document.getElementById("calendar-container").innerHTML = calendarHTML;

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

  // Display the current month name
  document.getElementById("dashboard-heading").textContent = "Welcome to " + currentMonthName + " " + currentYear;

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

  // Display option to add events if the user is admin
  if (isAdmin) {
    document.getElementById("add-event-form").style.display = "block";
    document.getElementById("event-form").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission

      // Get event details from the form
      var eventDate = document.getElementById("event-date").value;
      var eventName = document.getElementById("event-name").value;
      var eventColor = document.getElementById("event-color").value;

      // Add event to the calendar
      addEvent(eventDate, eventName, eventColor);

      // Clear the form fields
      document.getElementById("event-date").value = "";
      document.getElementById("event-name").value = "";
      document.getElementById("event-color").value = "#ff0000"; // Reset color to default

      // Hide the form
      document.getElementById("add-event-form").style.display = "none";
    });
  } else {
    document.getElementById("add-event-form").style.display = "none";
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

// Function to add event to the calendar
function addEvent(date, name, color) {
  // Add event handling logic here (e.g., update the calendar display)
  // For demonstration purposes, let's just log the event details
  console.log("New event added:");
  console.log("Date: " + date);
  console.log("Name: " + name);
  console.log("Color: " + color);
}

// Function to display the previous month
function prevMonth() {
  // Add logic to display the previous month
}

// Function to display the next month
function nextMonth() {
  // Add logic to display the next month
}

// Initialize the calendar with the current month
var currentDate = new Date();
var currentMonthIndex = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
displayCalendar(currentMonthIndex, currentYear);

