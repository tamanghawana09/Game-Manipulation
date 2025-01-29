let currentSelection, totselbefUpgrade, people, adult, child, oaps, maxpeople, tppl, thistm, sday, selEtime, selStime, tme, title, loc, dte, ppl, zid, pid, pids, golfHole=8;
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
        const activityTitle = activity.querySelector('.elementor-heading-title').textContent;
        console.log(activityTitle)
        const timeBuffer = getTimeBuffer(activityTitle);
        const selectedDate = document.querySelector('.flatpickr-input').value;
        //console.log(timeBuffer)
        if (selectedDate === formattedDate) {
            disableTodayPastTime(timeBuffer);
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
    disable: ["2024-10-10","2024-12-25"],
    locale: {
        firstDayOfWeek: 1, // start week on Monday
    },
    minDate: "today",
    maxDate: "2025-12-31",
    disableMobile: "true",
    onChange: function (selectedDates, dateStr, instance) {
        date = selectedDates[0];
        sday = selectedDates[0].getDay();
        sday = sday + 1;

        var selDate = new Date(date).toLocaleDateString("en-GB");
        dte = jQuery(".flatpickr-input").val();
        jQuery("#booking-time").data("date", dte);
        jQuery("#booking-time").attr("data-date", dte);
    },
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


    jQuery(".dropdown-toggle").on("click", function (e) {
        e.preventDefault();
    });

    jQuery(".btn-goback").on("click", function (e) {
        e.preventDefault();
        jQuery("section[id*='booking-step']").hide();
        jQuery("#booking-step-1").show();
        jQuery('.activities').removeClass("selected");
    });

    jQuery(".dropdown-menu a").on("click tap", function (e) {
        e.preventDefault();
        jQuery(this).siblings(".dropdown-item").removeClass("active");
        jQuery(this).addClass("active");

        var val = jQuery(this).text();
        jQuery(this).closest(".dropdown").find(".val").text(val);
        
    });
    
    //triggers on each people change
    jQuery('.people-dropdown select').on("change", function(e){
        e.preventDefault();
        // Get the input elements
        const adult = parseInt(document.querySelector('input[name="adult"]').value);
        const child = parseInt(document.querySelector('input[name="kids"]').value);
        const oaps = parseInt(document.querySelector('input[name="OAPs"]').value);
        people = adult + child + oaps;

        console.log(people);
        
        maxpeople = people;
        if (people > 6) {
          maxpeople = 6;
        }
        
        jQuery(".choose_times .owl-carousel").data("needed", Math.ceil(people / 6)).attr("data-needed", Math.ceil(people / 6));
    });

    jQuery(".item-times").on("change", function (e) {
        e.preventDefault();
        //jQuery(".item-time").removeClass("selected-time");
        //jQuery(this).toggleClass("selected-time");

        var thisTime = jQuery(".item-times option:selected").text();
        jQuery(".timegroup").each(function (index) {
            var tmeIndex = jQuery(this).find('.btn-time[time^="' + thisTime.slice(0, -3) + '"]').parent().index();
            jQuery(this).find(".owl-carousel").trigger("to.owl.carousel", tmeIndex);
        });

    });

    // trigger input on clicking sbg icon
    jQuery(".flatpickr-date svg").on("click", function (e) {
        e.preventDefault();
        jQuery(".flatpickr-input").click();
    });

    //Triggers on Next Button on Search
    jQuery("#available_btn").on("click", function (e) {
        e.preventDefault();
        //var loc = jQuery(".form-select").val();
        var dte = jQuery(".flatpickr-input").val();
		    var tmes = jQuery(".item-times").val();
        var date = new Date(jQuery(".flatpickr-input").val());
        sday = date.getDay() + 1;
		
        jQuery(".activity_btn_no_add, .activity_btn_yes_add").hide();

        if (dte != "" && tmes != "Select Time" ) {
            if (jQuery("#available_btn").hasClass("bookingtime")) {
                jQuery("section[id*='booking-step']").hide();
                jQuery("#booking-step-3").show();
            } else {
                jQuery("section[id*='booking-step']").hide();
                jQuery("#booking-step-2").show();
            }

            jQuery(".search-alert").hide();
            
            jQuery(".box-date span").text(jQuery(".flatpickr-input").val());
            jQuery(".box-time span").text(jQuery(".item-times option:selected").val());
            jQuery(".box-people span").text(jQuery(".no_people").val());
           
            /*if (ppl > 7) {
                jQuery(".activities[title='Racing Sims']").addClass('inquirynow');
                jQuery(".enquirybtn").show();
            }*/

        } else {
            jQuery(".search-alert").show();
        }
    });

    jQuery(".activities.inquirynow").on("click", function (e) {
        e.preventDefault();
        if ($(this).css("pointer-events") === "none") {
            return;
        }
        // Your click event handler code here
        //jQuery("#enquiryformbtn").trigger();
        setTimeout(function () {
            jQuery('#enquiryformbtn').click();
        }, 500); // Wait 1 second before triggering the click
    });

    jQuery("#activity_btn_wrap").hide();

    // jQuery(".activities").on("click", function (e) {
    //     e.preventDefault();
    //     title = jQuery(this).attr("title");
    //     sday = date.getDay() + 1;

    //     if (jQuery(e.target).closest('.option_select').length) {
    //         return; // Exit the function if an option_select was clicked
    //     }
        
    //     if (!jQuery(this).hasClass("inquirynow")) {
    //         jQuery(this).toggleClass("selected");
    //     }

    //     jQuery(this).find('.activities').toggleClass("selected");
    //     jQuery(this).toggleClass("selectedwrapper");

    //     jQuery(this).find('.elementor-button-text').html(jQuery(this).hasClass("selected") ? 'Selected' : 'Select');

    //     if (jQuery('.activities').hasClass("selected")){
    //         jQuery('#activity_btn_wrap').show();
    //     } else {
    //         jQuery("#activity_btn_wrap").hide();
    //     }

    //     // Alert Message for Required Value
    //     if (jQuery(this).hasClass("selected") && jQuery(this).find('.form-control').length > 0) {
    //         var peopleValue = parseFloat(jQuery(this).find('.form-control').val());
    //         if (peopleValue <= 0) {
    //             alert("Please select number of people");
    //             e.preventDefault();
    //             return false;
    //         }
    //     }
    //     if (jQuery(this).hasClass("selected") && jQuery(this).find('.option_select input[type="number"]').length > 0) {
    //         var adultValue = parseFloat(jQuery(this).find('.option_select input[name="adult"]').val());
    //         if (adultValue <= 0) {
    //             alert("Please select a value greater than 0");
    //             e.preventDefault();
    //             return false;
    //         }
    //     }

    //     if (typeof currentSelection !== "undefined") {
    //         totselbefUpgrade = currentSelection.length;
    //     }

    //     currentSelection = jQuery(".activities.selected").map(function () {
    //         return jQuery(this).attr("title"); 
    //     }).get();
    //     jQuery(".current_selection").text(currentSelection.join(", "));

    //     currentUpsellSelection = jQuery(".booking-upsell .activities.selected").map(function () {
    //         return jQuery(this).attr("title"); }).get();
        
    //     if (currentSelection.indexOf("Golf Both") >= 0) {
    //       const family = parseInt(document.querySelector('.golfboth_opt input[name="family"]').value);
    //       console.log(family);
    //       //Get the popup ID (WING IT WEDNESDAY)
    //       const popupId = '1792';
    //       const condition = sday === 4 && family == 0;
    //       if (condition) {
    //         setTimeout(function () {
    //           elementorProFrontend.modules.popup.showPopup({ id: popupId });
    //         }, 300);
    //       }
    //     }

    // });
    jQuery(".activities").on("click", function (e) {
        e.preventDefault();
        title = jQuery(this).attr("title");
        sday = date.getDay() + 1;
    
        if (jQuery(e.target).closest('.option_select').length) {
            return; // Exit the function if an option_select was clicked
        }
    
        // Validate before toggling 'selected'
        if (jQuery(this).find('.form-control').length > 0) {
            var peopleValue = parseFloat(jQuery(this).find('.form-control').val());
            if (isNaN(peopleValue) || peopleValue <= 0) {
                alert("Please select the number of people before selecting this activity.");
                return false;
            }
        }
    
        if (jQuery(this).find('.option_select input[type="number"]').length > 0) {
            var adultValue = parseFloat(jQuery(this).find('.option_select input[name="adult"]').val());
            if (isNaN(adultValue) || adultValue <= 0) {
                alert("Please select a value greater than 0 for adults.");
                return false;
            }
        }
    
        if (!jQuery(this).hasClass("inquirynow")) {
            jQuery(this).toggleClass("selected");
        }
    
        jQuery(this).find('.activities').toggleClass("selected");
        jQuery(this).toggleClass("selectedwrapper");
    
        jQuery(this).find('.elementor-button-text').html(jQuery(this).hasClass("selected") ? 'Selected' : 'Select');
    
        if (jQuery('.activities').hasClass("selected")) {
            jQuery('#activity_btn_wrap').show();
        } else {
            jQuery("#activity_btn_wrap").hide();
        }
    
        if (typeof currentSelection !== "undefined") {
            totselbefUpgrade = currentSelection.length;
        }
    
        currentSelection = jQuery(".activities.selected").map(function () {
            return jQuery(this).attr("title"); 
        }).get();
        jQuery(".current_selection").text(currentSelection.join(", "));
    
        currentUpsellSelection = jQuery(".booking-upsell .activities.selected").map(function () {
            return jQuery(this).attr("title"); 
        }).get();
        
        if (currentSelection.indexOf("Golf Both") >= 0) {
            const family = parseInt(document.querySelector('.golfboth_opt input[name="family"]').value);
            console.log(family);
            //Get the popup ID (WING IT WEDNESDAY)
            const popupId = '1792';
            const condition = sday === 4 && family == 0;
            if (condition) {
                setTimeout(function () {
                    elementorProFrontend.modules.popup.showPopup({ id: popupId });
                }, 300);
            }
        }
    });
    

    jQuery("#add_activities, #upgrade_btn").on("click", function (e) {
        e.preventDefault()
        jQuery("#popup-activities").click();
		    jQuery(".back-button-wrapper").hide();

        if (currentSelection.length > 1) {
            jQuery("#continue_btn").click();
        } else {
            jQuery("#booking-step-2").show().addClass('booking-upsell');
            jQuery("#booking-step-3").hide();
            jQuery(".selectedwrapper").hide();
            jQuery(".activity_btn_no_add").show();
            jQuery(".activity_btn_yes_add").show();

            jQuery("#activity_btn").addClass("upgradenext");
            
            //when there is an upgrade, change the text rather than step 2.
            jQuery("#upselltitle").find('h2').html("Would you like to add anything else?");
            jQuery(".activities").hide()
            jQuery("#activity_btn").hide()
        }

    });

    jQuery("#activity_btn_no_add").on("click", function (e) {
        e.preventDefault()
        jQuery("#continue_btn").click();
    });
    jQuery("#activity_btn_yes_add").on("click", function (e) {
        e.preventDefault()
        jQuery(this).hide()
        jQuery(".activity_btn_no_add").hide();
        jQuery(".activities").not(".selected").show()
        jQuery("#activity_btn").show()
    });

    jQuery("#activity_btn").on("click", function (e) {
        e.preventDefault();
        //people = parseInt(ppl);
        console.log(people);
        jQuery(".timegroup").hide();

        //if user doesnt select any activity in upgrade, redirect directly to booking journey
        if (jQuery(this).hasClass("upgradenext") && currentSelection.length == 1) {
            const myElement = document.getElementById('continue_btn');
            //myElement.addEventListener('click', e => console.log(e.detail));
            
			jQuery(".back-button-wrapper").hide();
			jQuery("#continue_btn").click();
            return false;
        }
        if (jQuery(".activities").hasClass("selected")) {
            jQuery("section[id*='booking-step']").hide();
            jQuery("#booking-step-3").show();
        } else {
            alert('Please select the Activity');
        }

        /*console.log(currentSelection);*/
        if (currentSelection.indexOf("Golf Azura") >= 0) {
            jQuery(".golf-azura-time").show();
            //document.querySelector(".bloodbaker-time").style.display = "block";
        }
        if (currentSelection.indexOf("Golf Rosa") >= 0) {
            jQuery(".golf-rosa-time").show();
        }
        if (currentSelection.indexOf("Golf Both") >= 0) {
            jQuery(".golf-both-time").show();
        }
        if (currentSelection.indexOf("Escape Room BOBS") >= 0 ) {
            jQuery(".bloodbaker-time").show();
        }
        if (currentSelection.indexOf("Escape Room TOWK") >= 0 ) {
            jQuery(".wanderingking-time").show();
        }
        if (currentSelection.indexOf("Escape Room TOS") >= 0 ) {
            jQuery(".sorcery-time").show();
        }
        if (currentSelection.indexOf("Adventure Games") >= 0) {
            jQuery(".adventuregames-time").show();
        }
        if (currentSelection.indexOf("AR Darts") >= 0) {
            jQuery(".ardarts-time").show();
        }
        if (currentSelection.indexOf("TV Booth") >= 0) {
            jQuery(".tvbooth-time").show();
        }

        jQuery("#booking-time").zoneAvailability();

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
			    console.log(shouldScroll)
          if (shouldScroll) {
              // Stop observing once the classes are detected and scroll
              observer.disconnect();
              scrollToAvailableTime();
          }
        });
        // Start observing all '.btn-time' elements for class changes
        document.querySelectorAll('.owl-carousel .btn-time').forEach(function (item) {
            //observer.observe(item, { attributes: true });
        });

    });

    jQuery(".btn-time").on("click", function (e) {
        e.preventDefault();
        var stm = jQuery(".btn-time.selected").attr("time");
        thistm = jQuery(this).attr("time");
        selEtime = jQuery(this).data("etime");
        selStime = jQuery(this).data("stime");
        //var selDtime = jQuery(this).data("tdiff");
        var currItem = jQuery(this);

        if (!currItem.hasClass("selected")) {
            currItem.parent().siblings(".owl-item").children("a").removeClass("selected");
            jQuery(this).addClass("selected");
            //if (!currItem.closest('.timegroup').hasClass("table-bookings-time"))
                disableOverlapping(currItem);
        }
        
        //scroll to available time if all visible are disabled after selecting a time 
        //scrollToAvailabletime(currItem);
		    console.log(jQuery("a.btn-time.selected").length)
        document.getElementById("upgrade_btn").style.display = "inline-block";
    });

    function disableOverlapping(currItem) {
        var se_time = jQuery(".btn-time.selected").map(function () {
            return { start: jQuery(this).data("stime"), end: jQuery(this).data("etime") };
        }).get();

        jQuery(".btn-time:not(.selected)").each(function () {
            /*if (!jQuery(this).closest('.timegroup').hasClass("table-bookings-time-disable")) {*/
              var stTime = jQuery(this).data("stime");
              var enTime = jQuery(this).data("etime");
              var isOverlapping = se_time.some(item => {
                  return (stTime == item.start) ||
                      (stTime > item.start && stTime < item.end) ||
                      (enTime > item.start && enTime <= item.end) ||
                      (stTime < item.start && enTime > item.end);
              });
              if (isOverlapping) {
                  jQuery(this).addClass("disabled");
              } else {
                  jQuery(this).removeClass("disabled");
              }
        });
    }
});

let isDrinkYesClicked = false;
jQuery(document).on("elementor/popup/show", () => {
      jQuery("#yes_wiw").on("click", function (e) {
          e.preventDefault();
          isDrinkYesClicked = true; // Set the variable to true when clicked
      });
});
  
jQuery(document).ready(function () { 
    jQuery("#booking_btn, #continue_btn").click(function (e) {
        e.preventDefault();
        dte = jQuery(".flatpickr-input").val();
        const adult = parseInt(document.querySelector('input[name="adult"]').value);
        const child = parseInt(document.querySelector('input[name="kids"]').value);
        const oaps = parseInt(document.querySelector('input[name="OAPs"]').value);
        const family = parseInt(document.querySelector('input[name="family"]').value);

        people = adult + child + oaps;
        console.log(people);

        zid = jQuery(".selected")
            .map(function () {
                return jQuery(this).attr("category");
            })
            .get();
        zid = zid.join(",");

        //for now get the total people from dropdown as number of people same for all
        // people = parseInt(jQuery("#no_people option:selected").val());
        let totalPeople = people;
        let selectedProducts = '';

        const timeGroups = [
            ".timegroup.golf-azura-time",
            ".timegroup.golf-rosa-time",
            ".timegroup.golf-both-time",
            ".timegroup.bloodbaker-time",
            ".timegroup.sorcery-time",
            ".timegroup.wanderingking-time",
            ".timegroup.adventuregames-time",
            ".timegroup.ardarts-time",
            ".timegroup.tvbooth-time",
        ];

        // Generate the `pids` string
        const pids = timeGroups
            .map(group =>
                jQuery(`${group} .selected`)
                    .map(function () {
                        let pid;
                        if (group === ".timegroup.golf-azura-time") {

                          const adult = parseInt(document.querySelector('.golfazura_opt [name="adult"]').value);
                          const child = parseInt(document.querySelector('.golfazura_opt [name="kids"]').value);
                          const oaps = parseInt(document.querySelector('.golfazura_opt [name="OAPs"]').value);
                          const family = parseInt(document.querySelector('.golfazura_opt [name="family"]').value);

                          if (adult > 0) {
                            selectedProducts += `&selected_products[116923145]=${adult}`;
                          }
                          if (child > 0) {
                            selectedProducts += `&selected_products[116923146]=${child}`;
                          }
                          if (family > 0) {
                            selectedProducts += `&selected_products[116923147]=${family}`;
                          }
                          if (oaps > 0) {
                            selectedProducts += `&selected_products[116923148]=${oaps}`;
                          }

                            //return `&selected_products[${pid}]=${totalPeople}`;
                            return `${selectedProducts}`;

                        } else if (group === ".timegroup.golf-rosa-time") {
                          
                          const adult = parseInt(document.querySelector('.golfrosa_opt [name="adult"]').value);
                          const child = parseInt(document.querySelector('.golfrosa_opt [name="kids"]').value);
                          const oaps = parseInt(document.querySelector('.golfrosa_opt [name="OAPs"]').value);
                          const family = parseInt(document.querySelector('.golfrosa_opt [name="family"]').value);

                          if (adult > 0) {
                            selectedProducts += `&selected_products[116923149]=${adult}`;
                          }
                          if (child > 0) {
                            selectedProducts += `&selected_products[116923150]=${child}`;
                          }
                          if (family > 0) {
                            selectedProducts += `&selected_products[116923151]=${family}`;
                        }
                          if (oaps > 0) {
                            selectedProducts += `&selected_products[116923152]=${oaps}`;
                          }

                            //return `&selected_products[${pid}]=${totalPeople}`;
                            return `${selectedProducts}`;
                        
                        } else if (group === ".timegroup.golf-both-time") {
                          
                            const adult = parseInt(document.querySelector('.golfboth_opt [name="adult"]').value);
                            const child = parseInt(document.querySelector('.golfboth_opt [name="kids"]').value);
                            const oaps = parseInt(document.querySelector('.golfboth_opt [name="OAPs"]').value);
                            const family = parseInt(document.querySelector('.golfboth_opt [name="family"]').value);
                            const ttlpeople = adult+child+oaps;

                            if (adult > 0) {
                              selectedProducts += `&selected_products[116923153]=${adult}&selected_products[116923157]=${adult}`;
                            }
                            if (child > 0) {
                              selectedProducts += `&selected_products[116923154]=${child}&selected_products[116923158]=${child}`;
                            }
                            if (family > 0) {
                                selectedProducts += `&selected_products[116923155]=${family}&selected_products[116923159]=${family}`;
                            }
                            if (oaps > 0) {
                              selectedProducts += `&selected_products[116923156]=${oaps}&selected_products[116923160]=${oaps}`;
                            }

                            if (isDrinkYesClicked) {
                              // If the #yes_wiw button was clicked
                              selectedProducts += `&selected_products[119797899]=${ttlpeople}`;
                            }

                            // Reset the variable after processing
                            isDrinkYesClicked = false;
  
                            //return `&selected_products[${pid}]=${totalPeople}`;
                            return `${selectedProducts}`;
                            
                        } else if (group === ".timegroup.bloodbaker-time") {
                            let bb_people = parseInt(jQuery("#bloodbaker_opt option:selected").val());
                            if (bb_people <= 3) {
                                pid = 116923132;
                            } else if (bb_people === 4) {
                                pid = 116923133;
                            } else if (bb_people === 5) {
                                pid = 116923134;
                            } else {
                                pid = 116923135;   
                            }
                            return `&selected_products[${pid}]=${bb_people}`;
                        } else if (group === ".timegroup.sorcery-time") {
                            let sorcery_people = parseInt(jQuery("#sorcery_opt option:selected").val());
                            if (sorcery_people <= 2) {
                                pid = 116923136;
                            } else if (sorcery_people === 3) {
                                pid = 116923137;
                            } else if (sorcery_people === 4) {
                                pid = 116923138;
                            } else if (sorcery_people === 5) {
                                pid = 116923139;
                            } else {
                                pid = 116923140;   
                            }
                            return `&selected_products[${pid}]=${sorcery_people}`;
                        } else if (group === ".timegroup.wanderingking-time") {
                            let wk_people = parseInt(jQuery("#wanderingking_opt option:selected").val());
                            if (wk_people <= 3) {
                                pid = 116923141;
                            } else if (wk_people === 4) {
                                pid = 116923142;
                            } else if (wk_people === 5) {
                                pid = 116923143;
                            } else {
                                pid = 116923144;   
                            }
                            return `&selected_products[${pid}]=${wk_people}`;

                        } else if (group === ".timegroup.adventuregames-time") {
                            let adv_people = parseInt(jQuery("#adventure_opt option:selected").val());
                            if (adv_people <= 2) {
                                pid = 116923129;
                            } else if (adv_people === 3) {
                                pid = 116923130;
                            } else {
                                pid = 116923131;   
                            }
                            return `&selected_products[${pid}]=${adv_people}`;
                        
                        } else if (group === ".timegroup.ardarts-time") {
                            let darts_people = parseInt(jQuery("#ardarts_opt option:selected").val());
                            pid = jQuery(this).attr("pid");
                            
                            return `&selected_products[${pid}]=${darts_people}`;

                        } else if (group === ".timegroup.tvbooth-time") {
                            pid = jQuery(this).attr("pid");
                            return `&selected_products[${pid}]=1`;

                        } else {
                            pid = jQuery(this).attr("pid");
                            //return '&selected_products['+pid+']='+Math.ceil(people / 6);
                            return `&selected_products[${pid}]=${totalPeople}`;
                        }
                    })
                    .get()
                    .join("")
            )
            .join("");
          
        zntmes = jQuery(".timegroup .selected").map(function () {
            var thiszn = jQuery(this).parents('.owl-carousel').attr('zone_id');
            return "&zone_times["+thiszn+"]=" + jQuery(this).attr("time");
        }).get().join("");

        var tme = jQuery(".timegroup .selected").eq(0).attr("time");

        //var burl = "https://bookedit.online/spider-box-book/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + pids + zntmes+"&people="+people;
        var burl = "https://hackers.bookedit.online/book/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + pids + zntmes + "&people=" + people;
        //console.log(burl);
        location.href = burl;
    });

    // Function to calculate total value for each wrapper
    function calculateTotal(wrapper) {
      var adultVal = parseInt(wrapper.find(".adl").val(), 10) || 0;
      var kidsVal = parseInt(wrapper.find(".kds").val(), 10) || 0;
      var oapVal = parseInt(wrapper.find(".oap").val(), 10) || 0;
      var familyVal = parseInt(wrapper.find(".fmly").val(), 10) || 0;

      //return adultVal + kidsVal + oapVal + familyVal;
      return adultVal + kidsVal + oapVal;
    }

    jQuery(".input-number-increment").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        jQuery(".dropdown-pp").addClass("open");

        var wrapper = jQuery(this).closest(".option_select");
        var total = calculateTotal(wrapper);

        /*var $input = jQuery(this).parents(".input-number-group").find(".input-number");
        var val = parseInt($input.val(), 10);
        if (val < 30) {*/

        if (total < 18) {
            var $input = jQuery(this).parents(".input-number-group").find(".input-number");
            var val = parseInt($input.val(), 10);
            $input.val(val + 1);
        } else {
            alert("Total is 18 or more. Cannot increment.");
        }
    });

    jQuery(".input-number-decrement").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        jQuery(".dropdown-pp").addClass("open");

        var wrapper = jQuery(this).closest(".option_select");
        var total = calculateTotal(wrapper);

        var $input = jQuery(this).parents(".input-number-group").find(".input-number");
        var val = parseInt($input.val(), 10);
        if (val > 0) {
            $input.val(val - 1);
        }
    });

    jQuery(".btn-gobacktogame").on("click", function (e) {
      e.preventDefault();
      jQuery("section[id*='booking-step']").hide();
      jQuery("#booking-step-2").show();
    
    });
});

jQuery(document).on("elementor/popup/show", () => {
    //wpcf7.init( jQuery('.wpcf7-form')[0] );

    var loc = jQuery(".form-select").val();
    var dte = jQuery(".flatpickr-input").val();
    var people = jQuery(".no_people").val();
    var tme = jQuery(".item-times option:selected").text();

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
        case 'Escape Room BOBS', 'Escape Room TOWK', 'Escape Room TOS':
            return 180; // 3 hours
        case 'Adventure Games':
            return 120; // 2 hours
        case 'Golf Azura', 'Golf Rosa', 'Golf Both':
            return 30;  // 30 minutes
        case 'AR Darts':
            return 120;  // 2 hours
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

document.querySelectorAll(".option_select input[type='number']").forEach(input => {
    input.addEventListener('change', validateActivities);
});

function validateActivities(){
		const azadults = parseInt(document.querySelector(".golfazura_opt .adl").value);
		const azkids = parseInt(document.querySelector(".golfazura_opt .kds").value);
		const azgame = parseInt(document.querySelector(".golfazura_opt .oap").value);

		let errors = false;
		if(azkids > 0 && azadults == 0){
			errors = true;
			//document.querySelector('.activity-error').textContent = '';
            alert('At least 1 adult is required to acompany kids.');
		}
		
		console.log('Validation Check: '+errors);
	
		if(!errors){ 
			document.querySelector('#available-step-3').classList.remove('disabled'); 
			document.querySelector('.activity-error').classList.add('d-none');
		}else{
			document.querySelector('#available-step-3').classList.add('disabled');
			document.querySelector('.activity-error').classList.remove('d-none');
		}	
};