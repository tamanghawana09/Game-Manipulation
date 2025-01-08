
  jQuery("#available_btn").on("click", function () {
  
    var selectedDate = jQuery("#inputDate").val();
    var noOfAdults = parseInt(jQuery("#no_people_jr").val());
    var noOfJuniors = parseInt(jQuery("#no_people_jr").val());

    
    jQuery(".search-alert").hide();

    // Validation checks
    if (!selectedDate || isNaN(noOfAdults) || isNaN(noOfJuniors)) {
      // If any input is missing
      jQuery(".search-alert")
        .text("Please enter all details.")
        .removeClass("alert-danger")
        .addClass("alert-warning")
        .show();
    } else if (noOfAdults === 0 && noOfJuniors > 0) {
      // If there are no adults and juniors are present
      jQuery(".search-alert")
        .text("At least 1 adult is required to accompany kids.")
        .removeClass("alert-warning")
        .addClass("alert-danger")
        .show();
    } else {a
   
      jQuery(".search-alert").hide(); 
      console.log("Form is valid. Proceeding...");
      
    }
  });
