const buttons = document.querySelectorAll('.activities .elementor-button');
// Get current London time
const londonTime = new Date().toLocaleString("en-US", { timeZone: "Europe/London" });
const currentLondonTime = new Date(londonTime);

// Format current date to 'YYYY-MM-DD'
const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/London',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
const formattedDate = formatter.format(currentLondonTime);

// Extract current time 
const currentTimeFormatted = `${String(currentLondonTime.getHours()).padStart(2, '0')}${String(currentLondonTime.getMinutes()).padStart(2, '0')}`;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const activity = button.closest('.activities');
    const activityTitle = activity.querySelector('h3').textContent;
    //console.log(activityTitle)
    const timeBuffer = getTimeBuffer(activityTitle);
    const selectedDate = document.querySelector('.flatpickr-input').value;
    //console.log(timeBuffer)
    if (selectedDate === formattedDate) {
      disableTodayPastTime(timeBuffer);
    }

  });
});

jQuery(document).ready(function () {
  jQuery(".timegroup .owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    stagePadding: 0,
    dots: false,
    navText: ['<i aria-hidden="true" class="fas fa-arrow-left"></i>', '<i aria-hidden="true" class="fas fa-arrow-right"></i>'],
    //navText: ["<img src='/img/svg/icon-caret-left.svg' alt='Prev'/>", "<img src='/img/svg/icon-caret-right.svg' alt='Next'/>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
        nav: true,
        slideBy: "2",
      },
      600: {
        items: 4,
        nav: false,
      },
      1000: {
        items: 5,
        nav: true,
        loop: false,
      },
    },
  });

  let currentSelection, totselbefUpgrade;
  var tppl, thistm;
  var ss, selEtime, selStime;
  var tme, title, loc, dte, ppl, jrppl, people, maxpeople, tlpeople, zid, pid, pids, games, duration;

  jQuery(".dropdown-toggle").on("click", function (e) {
    e.preventDefault();
  });

  jQuery(".btn-goback").on("click", function (e) {
    e.preventDefault();
    jQuery("section[id*='booking-step']").hide();
    jQuery("#booking-step-1").show();
  });

  jQuery(".dropdown-menu a").on("click tap", function (e) {
    e.preventDefault();
    jQuery(this).siblings(".dropdown-item").removeClass("active");
    jQuery(this).addClass("active");

    var val = jQuery(this).text();

    jQuery(this).closest(".dropdown").find(".val").text(val);
    //jQuery("#main-title h3").text("Book Now");
  });

  jQuery(".no_people").on("change", function (e) {
    e.preventDefault();
    var val = jQuery(this).val();
    jQuery(".ad").val(val);

    jQuery(".people-dropdown").click();

    if (val == "19") {
      location.href = '/corporate-booking/';
    }
  });

  // triggers when clicking done on people dropdown
  jQuery(".dp2_people div, .people-dropdown").on("click tap", function (e) {
    e.preventDefault();
    people = parseInt(jQuery("#no_people option:selected").val());

    var label;
    maxpeople = people;

    if (people == 1) {
      label = " Person";
    } else {
      label = " People";
    }
    var val = people + label;

    if (people > 6) {
      maxpeople = 6;
    }

    jQuery(this).closest(".dropdown").find(".val").text(val);

    jQuery(".choose_times .owl-carousel").data("needed", people).attr("data-needed", people);
    jQuery(".darts-time .owl-carousel").data("needed", Math.ceil(people / 6)).attr("data-needed", Math.ceil(people / 6));
  });

  /*jQuery(".dp2_people input").on("input", function (e) {
    e.preventDefault();
    people = parseInt(jQuery(".ad").val());
    var label;
    if (people == 1) {
      label = " Person";
    } else {
      label = " People";
    }
    var val = people + label;
    jQuery(this).closest(".dropdown").find(".val").text(val);
  });*/

  jQuery(".item-times").on("change", function (e) {
    jQuery(".item-time").removeClass("selected-time");
    jQuery(this).toggleClass("selected-time");
    //var owlNumber = jQuery('.bowling-time').find('.btn-time[data-stime="' + time + '"]').index();

    var owlNumber2 = jQuery(this).prop("selectedIndex");
    // 	console.log(owlNumber2);
    jQuery(".timegroup .owl-carousel").trigger("to.owl.carousel", owlNumber2 - 1);

    var owlNumber = jQuery(this).val();
    jQuery(".bowling-time .owl-carousel, .bowlagain-time .owl-carousel").trigger("to.owl.carousel", owlNumber);
  });

  // trigger input on clicking sbg icon
  jQuery(".flatpickr-date svg").on("click", function (e) {
    e.preventDefault();
    jQuery(".flatpickr-input").click();
  });

  jQuery('.activities[title="Family Deals"]').hide();

  //Triggers on Next Button on Search
  jQuery("#available_btn").on("click", function (e) {
    e.preventDefault();
    var loc = jQuery(".form-select").val();
    var dte = jQuery(".flatpickr-input").val();
    //var tme = jQuery("#dp2_time .val").text();
    var ppl = jQuery("#no_people").val();
    var jrppl = jQuery("#no_people_jr").val();

    console.log('jrppl' + jrppl);

    jQuery(".activity_btn_no_add,.activity_btn_yes_add").hide();
    //jQuery("#bookButton").hide();

    /* if (loc != "" && loc != "Select Location" && dte != "" && tme != "" && tme != "Time" && tppl != "") { */
    if (loc != "" && loc != "Select Location" && dte != "" && ppl != "Select No. of Adults") {
      if (jQuery("#available_btn").hasClass("bookingtime")) {
        jQuery("section[id*='booking-step']").hide();
        jQuery("#booking-step-3").show();
      } else {
        jQuery("section[id*='booking-step']").hide();
        jQuery("#booking-step-2").show();
      }
		
		failyDeal(ppl,jrppl);

      //jQuery("section[id*='booking-step']").hide();
      //jQuery("#booking-step-2").show();
      jQuery(".search-alert").hide();

      /*jQuery(".form-select").val();
      jQuery(".box-date span").text(jQuery(".flatpickr-input").val());
      jQuery(".box-people span").text(jQuery("#dp2_people .val").text());*/

    } else {
      jQuery(".search-alert").show();
    }
  });

  jQuery(".activities").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    title = jQuery(this).attr("title");
	
    //if (!jQuery(e.target).closest('.option_select').length) {
	if (jQuery(e.target).closest('.option_select').length) {
		return; // Exit the function if an option_select was clicked
	}

    jQuery(this).toggleClass("selected");
    jQuery(this).find('.activities').toggleClass("selected");
    //jQuery(this).parent().toggleClass("selectedwrapper");
    jQuery(this).toggleClass("selectedwrapper");

    if (typeof currentSelection !== "undefined") {
      totselbefUpgrade = currentSelection.length;
      //console.log(totselbefUpgrade);
    }

    currentSelection = jQuery(".activities.selected")
      .map(function () {
        return jQuery(this).attr("title");
      })
      .get();
    jQuery(".current_selection").text(currentSelection.join(", "));
    //console.log(currentSelection.length);

    currentUpsellSelection = jQuery(".booking-upsell .activities.selected")
      .map(function () {
        return jQuery(this).attr("title");
      }).get();

    //next btn on bowling page popup
    /*if (currentSelection.length >= 1 ) {
        jQuery("#bowl_activity_btn").css("display", "inline-block");
        jQuery("#activity_btn").addClass('d-md-inline-block').show();
    } else {
        jQuery("#bowl_activity_btn").hide();
    }*/

  });

  const bowlingSelect = document.getElementById('bowling_opt');
  const btnTimes = document.querySelectorAll('.bowling-time .btn-time');
  
  bowlingSelect.addEventListener('change', function(event) {
    event.stopPropagation();
    const selectedValue = bowlingSelect.value;
      btnTimes.forEach(btn => {
          // Change the pid based on the selected value
          if (selectedValue === '1') {
              btn.setAttribute('pid', '116685532'); // Replace with actual pid
          } else if (selectedValue === '2') {
              btn.setAttribute('pid', '116685536'); // Replace with actual pid
          } else if (selectedValue === '3') {
              btn.setAttribute('pid', '116685618'); // Replace with actual pid
          }
      });
  });

  jQuery("#add_activities,#upgrade_btn").on("click", function (e) {
    e.preventDefault()
    jQuery("#popup-activities").click();
    if (currentSelection.length > 2) {
      jQuery("#continue_btn").click();
    } else {
      jQuery("#booking-step-2").show().addClass('booking-upsell');
      jQuery("#booking-step-3").hide();
      jQuery(".selectedwrapper").hide();
      jQuery(".activity_btn_no_add").show();
      jQuery(".activity_btn_yes_add").show();

      //add class so that we can separate between normal next and upgrade next button click
      jQuery("#activity_btn").addClass("upgradenext");
      //when there is an upgrade, change the text rather than step 2.
      jQuery("#upselltitle").find('h2').html("Would you like to add more activity?");
      jQuery(".activities").hide();
      jQuery("#activity_btn").hide();
    }

  });

  jQuery("#activity_btn_no_add").on("click", function (e) {
    e.preventDefault()
    jQuery("#continue_btn").click();
  });
  jQuery("#activity_btn_yes_add").on("click", function (e) {
    e.preventDefault();
    jQuery(this).hide();
    jQuery(".activity_btn_no_add").hide();
    jQuery(".activities").not(".selected").show();
	failyDeal(ppl,jrppl);
    jQuery("#activity_btn").show();
  });

  jQuery("#activity_btn").on("click", function (e) {
    e.preventDefault();
    people = parseInt(ppl);
    jQuery(".timegroup").hide();

    //if user doesnt select any activity in upgrade, redirect directly to booking journey
    if (jQuery(this).hasClass("upgradenext") && currentSelection.length == 2) {
      const myElement = document.getElementById('continue_btn');
      //myElement.addEventListener('click', e => console.log(e.detail));
      jQuery("#continue_btn").click();
      return false;
    }
    if (jQuery(".activities").hasClass("selected")) {
      jQuery("section[id*='booking-step']").hide();
      jQuery("#booking-step-3").show();
    } else {
      //alert('test');
    }

    //console.log(currentSelection);

    /*if (jQuery(this).is("#bowl_activity_btn") ) {
        jQuery(".upsell-activities").hide();
        jQuery(".upsell-timegroup").show();
    }*/

    if (currentSelection.indexOf("Bowling") >= 0 || currentSelection.includes("Family Deals")) {
      jQuery(".timegroup.bowling-time").show();
    }
    if (currentSelection.indexOf("Shuffleboard") >= 0) {
      jQuery(".shuffleboard-time").show();
    }
    if (currentSelection.indexOf("Darts") >= 0) {
      jQuery(".darts-time").show();
    }

    /*jQuery('html, body').animate({
      scrollTop: parseInt(jQuery("#booking-time").offset().top-50)
    }, 500);*/

    //jQuery("#booking-time").zoneAvailability();
    jQuery("#booking-input-inner").zoneAvailability();
    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(function (mutationsList, observer) {
      // Flag to determine if the scroll should happen
      let shouldScroll = false;

      mutationsList.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList.contains('disabled-availability')) {
            shouldScroll = true;
          }
        }
      });

      if (shouldScroll) {
        // Stop observing once the classes are detected and scroll
        observer.disconnect();
        scrollToAvailableTime();
      }
    });
    // Start observing all '.btn-time' elements for class changes
    document.querySelectorAll('.owl-carousel .btn-time').forEach(function (item) {
      observer.observe(item, { attributes: true });
    });

  });

  jQuery(".btn-time").on("click", function (e) {
    e.preventDefault();
    var stm = jQuery(".btn-time.selected").attr("time");
    thistm = jQuery(this).attr("time");
    selEtime = jQuery(this).data("etime");
    selStime = jQuery(this).data("stime");
    var selDtime = jQuery(this).data("tdiff");
    var currItem = jQuery(this);

    if (!currItem.hasClass("selected")) {
      currItem.parent().siblings(".owl-item").children("a").removeClass("selected");
      jQuery(this).addClass("selected");
      disableOverlapping(currItem);
    }

    if (jQuery("a.btn-time").hasClass("selected"))
      jQuery("#upgrade_btn").show();
    else
      jQuery("#upgrade_btn").show();
  });

  function disableOverlapping(currItem) {
    var se_time = [];
    jQuery(".btn-time.selected").each(function () {
      se_time.push({ start: jQuery(this).data("stime"), end: jQuery(this).data("etime") });
    });
    //console.log(se_time);

    jQuery(".btn-time:not(.selected)").each(function () {
      var stTime = jQuery(this).data("stime");
      var enTime = jQuery(this).data("etime");

      jQuery(this).removeClass("disabled");
      se_time.forEach((item) => {
        if (stTime == item["start"]) {
          jQuery(this).addClass("disabled");
        } else if (stTime > item["start"] && stTime < item["end"]) {
          jQuery(this).addClass("disabled");
        } else if (enTime > item["start"] && enTime <= item["end"]) {
          jQuery(this).addClass("disabled");
        } else if (stTime < item["start"] && enTime > item["end"]) {
          jQuery(this).addClass("disabled");
        } else {
          // jQuery(this).removeClass("disabled");
        }
      });
    });
  }

  // Berlin-booking page
  // #booking_btn - > Food n drink popup: no thank you btn
  // #upgrade_booking_btn -> upgrade/upsell popup: Upgrade btn
  // #no_add_activities -> upgrade/upsell popup: no thank you btn

  // Berlin-bowling-booking page
  // #bowl_upgrade_booking_btn - > upgrade activity popup: upgrade btn
  jQuery("#booking_btn, #continue_btn").click(function (e) {
    e.preventDefault();

    dte = jQuery(".flatpickr-input").val();
    //pid = jQuery(".btn-time.selected").attr("pid");
    var gameStatus = jQuery("#bowling_opt").val();
    var duration = jQuery("#shuffleboard_opt").val();
    var ppl = parseInt(jQuery("#no_people").val());
    var jrppl = parseInt(jQuery("#no_people_jr").val());

    //for now get the total people from dropdown as number of people same for all
    //people = parseInt(jQuery("#no_people option:selected").val());
    tlpeople = ppl + jrppl;
    productidUrl = "";

    console.log("game" + games);

    zid = jQuery(".selected")
      .map(function () {
        return jQuery(this).attr("category");
      })
      .get();
    zid = zid.join(",");

    pid = jQuery(".timegroup.shuffleboard-time .selected")
      .map(function () {
        //return "&selected_products[" + jQuery(this).attr("pid") + "]=" + tlpeople;
      })
      .get();
    pids = pid.join("");

    if (currentSelection.indexOf("Bowling") >= 0) {
      if (gameStatus === "1") {
        if (ppl > 0) {
          //return "&selected_products[116685532]=" + ppl;
          productidUrl += "&selected_products[116685532]=" + ppl;
        }
        if (jrppl > 0) {
          productidUrl += "&selected_products[116685533]=" + jrppl;
        }
      } else if (gameStatus === "2") {
        if (ppl > 0) {
          productidUrl += "&selected_products[116685536]=" + ppl;
        }
        if (jrppl > 0) {
          productidUrl += "&selected_products[116685537]=" + jrppl;
        }
      } else if (gameStatus === "3") {
        if (ppl > 0) {
          productidUrl += "&selected_products[116685618]=" + ppl;
        }
        if (jrppl > 0) {
          productidUrl += "&selected_products[116685622]=" + jrppl;
        }
      }
    }
	//for the family deals
    if (currentSelection.indexOf("Bowling") >= 0) {
        fgameStatus = jQuery("#family_bowling_opt").val();
		console.log(tlpeople)
		if (fgameStatus === "1") {
            if (tlpeople == 3 ) {
                productidUrl += "&selected_products[70643285]=1";
            } else if (tlpeople == 4) {
                productidUrl += "&selected_products[70643285]=1";
            } else if (tlpeople == 5) {
                productidUrl += "&selected_products[70643562]=1";
            } else { }
        } else if (fgameStatus === "2") { 
            if (tlpeople == 4) {
                productidUrl += "&selected_products[70644695]=1";
            } else if (tlpeople == 3) {
                productidUrl += "&selected_products[70644695]=1";
            } else if (tlpeople == 5) {
                productidUrl += "&selected_products[70644393]=1";
            } 
        }
		//console.log(productidUrl)
    }
    if (currentSelection.indexOf("Shuffleboard") >= 0) {
        if (duration === "25") {
          productidUrl += "&selected_products[112313920]=" + tlpeople;
        } else if(duration === "55") {
          productidUrl += "&selected_products[112314011]=" + tlpeople;
        }
      }
    if (currentSelection.indexOf("Darts") >= 0) {
      var dtTime = jQuery(".darts-time .selected").data("stime");
      if (sday == 7 || sday == 1 || (sday == 6 && dtTime > 1600)) {
        productidUrl += "&selected_products[115244195]=" + tlpeople;
      } else {
        productidUrl += "&selected_products[115244167]=" + tlpeople;
      }
    }

    zntme = jQuery(".timegroup .selected")
      .map(function () {
        if (jQuery(this).attr("category") == 13770) {
          return "&zone_times[897]=" + jQuery(this).attr("time");
        }
        if (jQuery(this).attr("category") == 13190) {
          return "&zone_times[3384]=" + jQuery(this).attr("time");
        }
        if (jQuery(this).attr("category") == 13720) {
          return "&zone_times[3467]=" + jQuery(this).attr("time");
        }
      })
      .get();
    zntmes = zntme.join("");

    var tme = jQuery(".timegroup .selected").eq(0).attr("time");

    //var burl = "https://bookedit.online/bugsys-bowling-book/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + pids + zntmes + "&people=" + tlpeople;
    var burl = "https://bookedit.online/bugsys-bowling-book/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + productidUrl + zntmes + "&people=" + tlpeople;
    location.href = burl;
  });

  jQuery(".input-number-increment").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    jQuery(".dropdown-pp").addClass("open");
    var $input = jQuery(this).parents(".input-number-group").find(".input-number");
    var val = parseInt($input.val(), 10);
    if (val < 30) {
      $input.val(val + 1);
    }
  });

  jQuery(".input-number-decrement").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    jQuery(".dropdown-pp").addClass("open");
    var $input = jQuery(this).parents(".input-number-group").find(".input-number");
    var val = parseInt($input.val(), 10);
    if (val > 0) {
      $input.val(val - 1);
    }
  });
});

jQuery(".flatpickr-input").flatpickr({
  altInput: true,
  altFormat: "d/m/Y",
  //defaultDate: default_date,
  //inline: true,
  dateFormat: "Y-m-d",
  position: "auto center",
  locale: {
    firstDayOfWeek: 1, // start week on Monday
  },
  minDate: "today",
  maxDate: "2025-02-28",
  disableMobile: "true",
  onChange: function (selectedDates, dateStr, instance) {
    date = selectedDates[0];
    sday = selectedDates[0].getDay();
    sday = sday + 1;

    var selDate = new Date(date).toLocaleDateString("en-GB");
    dte = jQuery(".flatpickr-input").val();
    jQuery("#booking-time").data("date", dte);
    jQuery("#booking-time").attr("data-date", dte);

    console.log("day" + sday)

  }
});

jQuery(document).on("elementor/popup/show", () => {
  var loc = jQuery("#dp2_loc .val").text();
  var dte = jQuery(".booking-date").val();
  var tme = (tme = jQuery("a.category.active").data("time"));

  people = parseInt(jQuery(".ad").val());

  jQuery(".fguests").val(people);
  jQuery(".fdate").val(dte);
  jQuery(".ftime").val(tme);
  jQuery(".flocation").val(loc);
});

function addMinutes(time, minsToAdd) {
  function D(J) {
    return (J < 10 ? "0" : "") + J;
  }
  var piece = time.split(":");
  var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

  return D(((mins % (24 * 60)) / 60) | 0) + ":" + D(mins % 60);
}

function disableTodayPastTime(timeBuffer) {
  //console.log(currentTimeFormatted)
  document.querySelectorAll('.btn-time.category.item').forEach(element => {
    const startTime = parseInt(element.getAttribute('data-stime'), 10);
    const bufferHours = Math.floor(timeBuffer / 60);
    const bufferMinutes = timeBuffer % 60;
    const adjustedCurrentTime = `${String(currentLondonTime.getHours() + bufferHours).padStart(2, '0')}${String(currentLondonTime.getMinutes() + bufferMinutes).padStart(2, '0')}`;

    if (startTime < adjustedCurrentTime) {
      //element.style.display = 'none';
      element.disabled = true;
      element.style.pointerEvents = 'none';
      element.classList.add('disabled');

      // If using Owl Carousel, disable the corresponding item
      const owlItem = element.closest('.owl-item');
      if (owlItem) {
        owlItem.classList.add('disabletime');
      }
    } else {
      // Enable future time slots if previously disabled
      //element.style.display = '';
      element.disabled = false;
      element.style.pointerEvents = 'auto';
      element.classList.remove('disabled');
      const owlItem = element.closest('.owl-item');
      if (owlItem) {
        owlItem.classList.remove('disabletime');
      }
    }
  });
}

function getTimeBuffer(activityTitle) {
  switch (activityTitle) {
    case 'Music Box':
      return 180; // 3 hours
    default:
      return 60;  // 1 hour for all other activities
  }
}

// Function to scroll to the first available time
function scrollToAvailableTime() {
  document.querySelectorAll('.timegroup .owl-carousel').forEach(function (carousel) {
    // Find the first '.btn-time' without the 'disabled-availability' class
    const availableTimes = Array.from(carousel.querySelectorAll('.btn-time:not(.disabled-availability)'));

    if (availableTimes.length > 0) {
      // Ensure the first available time is fully in view
      const firstAvailableTime = availableTimes[0];
      const slideIndex = firstAvailableTime.getAttribute('data-slide-index');

      // Adjust the carousel to show the first available time
      jQuery(carousel).trigger('to.owl.carousel', [parseInt(slideIndex) - 1, 300]);
    }
  });
}

function failyDeal(ppl,jrppl){
	if (ppl == 2 && (jrppl == 1 || jrppl == 2 || jrppl == 3)) {
		jQuery('.family_bowling_deal').show();
		//jQuery('.activities[title="Family Deals"]').show();
	} else {
		jQuery('.family_bowling_deal').hide();
		//jQuery('.activities[title="Family Deals"]').hide();
	}
}
