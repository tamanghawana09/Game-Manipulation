jQuery(document).ready(function () {
  // Function to convert time to 12-hour format with AM/PM
  function to12HrFormat(hours, minutes) {
    var period = hours >= 12 ? "PM" : "AM";
    var displayHours = hours % 12;
    if (displayHours === 0) {
      displayHours = 12; // Adjust for midnight/noon
    }
    return (
      String(displayHours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      " " +
      period
    );
  }

  // Get the current day of the week (0 = Sunday, 6 = Saturday)
  var today = new Date().getDay();

  // Define opening and closing times based on the day
  var openingTime, closingTime;
  if (today >= 1 && today <= 5) { // Monday to Friday
    openingTime = 1200; // 12:00 PM
    closingTime = 1940; // 7:40 PM
  } else { // Saturday and Sunday
    openingTime = 1000; // 10:00 AM
    closingTime = 2110; // 9:10 PM
  }

  let lastEndTimeInMinutes = Math.floor(openingTime / 100) * 60 + (openingTime % 100); // Initialize to opening time

  jQuery(".btn-time").each(function (index, element) {
    // Retrieve the current start time (stime) in HHMM format
    var stime = parseInt(jQuery(element).attr("data-stime"));
    var ppl = 3; // Example number of adults
    var jrppl = 2; // Example number of juniors
    var totalppl = ppl + jrppl;

    // Skip if start time is outside opening hours
    if (stime < openingTime || stime >= closingTime) {
      jQuery(element).hide(); // Hide the button if it's out of operating hours
      return true; // Continue to the next iteration
    }

    // Convert stime to minutes since midnight
    var stimeHours = Math.floor(stime / 100); // Extract hours
    var stimeMinutes = stime % 100; // Extract minutes
    var totalMinutes = stimeHours * 60 + stimeMinutes;

    // Ensure the start time is not earlier than the last end time
    if (totalMinutes < lastEndTimeInMinutes) {
      totalMinutes = lastEndTimeInMinutes; // Adjust to start right after the previous slot
    }

    // Calculate time extension in minutes
    var timeExtension = totalppl * 10; // Example: 10 minutes per person

    // Calculate the new end time in minutes
    var rawNewMinutes = totalMinutes + timeExtension;

    // Ensure new time does not exceed closing time
    var closingTimeInMinutes = Math.floor(closingTime / 100) * 60 + (closingTime % 100);
    if (rawNewMinutes > closingTimeInMinutes) {
      rawNewMinutes = closingTimeInMinutes;
    }

    // Update the last end time for the next iteration
    lastEndTimeInMinutes = rawNewMinutes;

    // Convert rawNewMinutes back to HHMM format
    var rawNewHours = Math.floor(rawNewMinutes / 60);
    var rawNewRemainingMinutes = rawNewMinutes % 60;

    // Update the text of the button
    var stimeDisplay = to12HrFormat(stimeHours, stimeMinutes);
    var rawNewTimeDisplay = to12HrFormat(rawNewHours, rawNewRemainingMinutes);
    jQuery(element).text(stimeDisplay + " - " + rawNewTimeDisplay);

    // Set attributes and log for debugging
    jQuery(element).attr("data-etime", rawNewHours * 100 + rawNewRemainingMinutes);
    console.log("Start Time:", stimeDisplay, "End Time:", rawNewTimeDisplay);
  });
});
