
  // When a person selects the number of people
  jQuery(".bowling-time .btn-time").each(function (index, element) {
    var timeExtension;

    // Retrieve the current start time (stime) in HHMM format from the element's data attribute
    var stime = parseInt(jQuery(element).attr("data-stime")); // Use attr() to ensure changes are reflected
    var ppl = 1;
    var jrppl = 2;
    console.log("ppl:" + ppl);
    console.log("jrppl:" + jrppl);

    var totalppl = ppl + jrppl;

    // Convert stime to minutes
    var stimeHours = Math.floor(stime / 100); // Extract hours
    var stimeMinutes = stime % 100; // Extract minutes
    var totalMinutes = stimeHours * 60 + stimeMinutes;

    // Calculate time extension in minutes
    timeExtension = totalppl * 10; // e.g., 10 minutes per person

    // Calculate the new end time in minutes
    var rawNewMinutes = totalMinutes + timeExtension;

    // Convert rawNewMinutes back to HHMM format
    var rawNewHours = Math.floor(rawNewMinutes / 60);
    var rawNewRemainingMinutes = rawNewMinutes % 60;

    // Handle times exceeding 24:00
    if (rawNewHours >= 24) {
      rawNewHours -= 24; // Reset hours to 24-hour format
    }

    // Function to convert time to 12-hour format with AM/PM
    function to12HrFormat(hours, minutes) {
      var period = hours >= 12 ? "PM" : "AM";
      var displayHours = hours % 12;
      if (displayHours === 0) {
        displayHours = 12; // Adjust for midnight/noon
      }
      return {
        display:
          String(displayHours).padStart(2, "0") +
          ":" +
          String(minutes).padStart(2, "0") +
          " " +
          period,
        period: period,
      };
    }

    // Convert start time to 12-hour format
    var stimeFormatted = to12HrFormat(stimeHours, stimeMinutes);
    var stimeDisplay = stimeFormatted.display;

    // Convert raw new time to 12-hour format
    var rawNewFormatted = to12HrFormat(rawNewHours, rawNewRemainingMinutes);
    var rawNewTimeDisplay = rawNewFormatted.display;

    // Update the text of the button
    jQuery(element).text(stimeDisplay + " - " + rawNewTimeDisplay);

    // Store rawNewTime as a data attribute for potential use later
    jQuery(element).attr(
      "data-rawNewTime",
      rawNewHours * 100 + rawNewRemainingMinutes
    );

    // Set the new attributes
    jQuery(element).attr("data-stime", stime); // Keep the original start time
    jQuery(element).attr(
      "data-etime",
      rawNewHours * 100 + rawNewRemainingMinutes // New end time
    );
    jQuery(element).attr("data-tdiff", timeExtension); // Time difference in minutes

    // Log start, new end times, and time difference
    console.log("Start Time (stime):", stimeDisplay);
    console.log("New Time (rawNewTime):", rawNewTimeDisplay);

    // Calculate the start time of the next slot dynamically with a 20-minute offset
    if (index + 1 < jQuery(".btn-time").length) {
      var nextElement = jQuery(".btn-time").eq(index + 1);

      // Add 20 minutes to the current start time
      var nextStartMinutes = totalMinutes + 20; // Add a fixed 20-minute gap

      var nextStartHours = Math.floor(nextStartMinutes / 60);
      var nextStartRemainingMinutes = nextStartMinutes % 60;

      if (nextStartHours >= 24) {
        nextStartHours -= 24; // Adjust for overflow beyond 24 hours
      }

     
    }
  });