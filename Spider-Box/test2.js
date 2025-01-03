let currentSelection, totselbefUpgrade, people, maxpeople, tppl, thistm, sday, selEtime, selStime, tme, title, loc, dte, ppl, zid, pid, pids;
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
        console.log(activityTitle)
        const timeBuffer = getTimeBuffer(activityTitle);
        const selectedDate = document.querySelector('.flatpickr-input').value;
        //console.log(timeBuffer)
        if (selectedDate === formattedDate) {
            disableTodayPastTime(timeBuffer);
        }
    });
});


var select = jQuery('.item-times');
select.data("originalHTML", select.html());
var ogTimes = select.data("originalHTML"); 
        
jQuery(".flatpickr-input").flatpickr({
    altInput: true,
    altFormat: "d/m/Y",
    //defaultDate: default_date,
    //inline: true,
    dateFormat: "Y-m-d",
    position: "auto center",
    disable: ["2024-10-07","2024-10-8","2024-10-9","2024-10-10","2024-12-25"],
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

       
        if (sday == 2 || sday == 3  || sday == 4){
            //mon-wed from 4 only available
            select.find('option').each(function() {
                if (parseFloat(jQuery(this).val()) < 1600) {
                    jQuery(this).remove();
                }
            });
            
        }else if(sday == 1 || sday == 7){
            //opening hours until 01:00 on sat & sunday
             const optionsToAdd = [
                { value: '2330', text: '23:30' },
                { value: '2400', text: '24:00' },
                { value: '2430', text: '24:30' },
                { value: '2500', text: '01:00' }
            ];
            optionsToAdd.forEach(option => {
                select.append(jQuery('<option>',{
                    class: "item-time",
                    value: option.value,
                    text: option.text
                }));
            });
        }else{
            select.html(ogTimes);
        }
    }
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
    });

    jQuery(".dropdown-menu a").on("click tap", function (e) {
        e.preventDefault();
        jQuery(this).siblings(".dropdown-item").removeClass("active");
        jQuery(this).addClass("active");

        var val = jQuery(this).text();
        jQuery(this).closest(".dropdown").find(".val").text(val);
        
    });

    jQuery(".no_people").on("change", function (e) {
        e.preventDefault();
        var val = jQuery(this).val();
        jQuery(".ad").val(val);

        jQuery(".people-dropdown").click();

        if (val >= 19) {
            //location.href = '/?booking=open';
            /*setTimeout(function () {
                jQuery('#enquiryformbtn').click();
            }, 500); */ // Wait 1 second before triggering the click

            jQuery('#enquiryformbtn').show();
            jQuery('#available_btn').hide();

        } else {
            jQuery('#enquiryformbtn').hide();
            jQuery('#available_btn').show();
        }

        // Get the popup ID
        const popupId = '1792';
        const condition = val <= 5;
        // Check the condition and trigger the popup if true
        if (condition) {
            setTimeout(function() {
                elementorProFrontend.modules.popup.showPopup({ id: popupId });
              }, 500); // 1000ms = 1 seconds
        }
    });

    // triggers when clicking done on people dropdown
    jQuery(".dp2_people div, .people-dropdown").on("click tap", function (e) {
        e.preventDefault();
        people = parseInt(jQuery("#no_people option:selected").val());
        //console.log(people);
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
        //jQuery("#booking-input-inner").data("interval", maxpeople * 10);

        jQuery(".musicbox-time a.category").attr("pid",
            (sday === 5 || sday === 6 || sday === 7 || sday === 1) ? "113101480" : "114340933"
        );
        jQuery(".karaoke-time a.category").attr("pid",
            (sday === 1 || sday === 5 || sday === 6) ? "113111244" : "113111245"
        );
        //let dataNeeded = Math.ceil(people / 4);
        let dataNeeded = Math.ceil(people / 8);
        dataNeeded = dataNeeded * 2;
        jQuery(".choose_times .owl-carousel").data("needed", people).attr("data-needed", people);
        jQuery(".musicbox-time .owl-carousel").data("needed", dataNeeded).attr("data-needed",dataNeeded );
        jQuery(".racingsims-time .owl-carousel").data("needed", Math.ceil(people / 6)).attr("data-needed", Math.ceil(people / 6));

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
        var loc = jQuery(".form-select").val();
        var dte = jQuery(".flatpickr-input").val();
        var tmes = parseInt(jQuery(".item-times option:selected").val());
        var ppl = jQuery(".no_people").val();

        jQuery(".activity_btn_no_add, .activity_btn_yes_add").hide();

        if (loc != "" && loc != "Select Location" && dte != "" && tmes != "Select Time" && ppl != "Select Guests") {
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
           
            if (ppl > 6) {
                jQuery(".activities[title='Racing Sims']").addClass('inquirynow');
                jQuery(".enquirybtn").show();
            }
			
            var date = new Date(jQuery(".flatpickr-input").val());
            sday = date.getDay() + 1;
            console.log('sday'+sday)

            if( tmes > 1900 ){
				      jQuery(".activities[title='Karaoke']").removeClass('disabled');
            }
            if ( tmes >= 1800 ) {
              jQuery(".activities[title='Music Arena']").addClass("disabled");
            }
            
            if ((sday === 1 || sday === 5 || sday === 6 || sday === 7 ) && tmes < 0000 ) {
                //jQuery(".activities[title='Karaoke']").addClass("disabled");
				        jQuery(".activities[title='Karaoke']").addClass('inquirynow');
                jQuery("#kenquiryformbtn").show();
				        jQuery('#kavailable_btn').hide();
            } else {
              jQuery(".activities[title='Karaoke']").removeClass('inquirynow');
              jQuery('#kenquiryformbtn').hide();
              jQuery('#kavailable_btn').show();
			      }
            if (sday === 1 || sday === 7) {
              jQuery(".activities[title='Bottomless Brunch']").removeClass("disabled");
            } else {
              jQuery(".activities[title='Bottomless Brunch']").addClass("disabled");
            }
            
            
            // mon-wed only bookable 4pm onwards
            if (sday == 2 || sday == 3  || sday == 4){
                jQuery(".btn-time").each(function () {
                    var thisTime = parseFloat(jQuery(this).attr('data-stime') ); 
                    if (thisTime < 1600) {
                        jQuery(this).addClass("monthu-disabled");
                    }
                });
            }

        } else {
            jQuery(".search-alert").show();
        }
    });

    jQuery(".activities.inquirynow").on("click", function (e) {
        e.preventDefault();
        if ($(this).css("pointer-events") === "none") {
            // Do nothing, as the element is not clickable
            return;
        }
        // Your click event handler code here
        //jQuery("#enquiryformbtn").trigger();
        setTimeout(function () {
            jQuery('#enquiryformbtn').click();
        }, 500); // Wait 1 second before triggering the click
    });

    jQuery(".activities").on("click", function (e) {
        e.preventDefault();
		    e.stopPropagation();
        title = jQuery(this).attr("title");

        if (jQuery(e.target).closest('.option_select').length) {
          return; // Exit the function if an option_select was clicked
        }
        if (!jQuery(this).hasClass("inquirynow")) {
            jQuery(this).toggleClass("selected");
        }
		
		    jQuery(this).find('.activities').toggleClass("selected");
        jQuery(this).toggleClass("selectedwrapper");

        //console.log(currentSelection);
        if (typeof currentSelection !== "undefined") {
            totselbefUpgrade = currentSelection.length;
        }

        currentSelection = jQuery(".activities.selected")
            .map(function () {
                return jQuery(this).attr("title");
            })
            .get();
        jQuery(".current_selection").text(currentSelection.join(", "));
        
        const isMusicQuiz = currentSelection.includes("Music Quiz");
        const isKaraoke = currentSelection.includes("Karaoke");

        jQuery(".activities[title='Karaoke']").toggleClass('disabled', isMusicQuiz);
        jQuery(".activities[title='Music Quiz']").toggleClass('disabled', isKaraoke);

        currentUpsellSelection = jQuery(".booking-upsell .activities.selected")
            .map(function () {
                return jQuery(this).attr("title");
            }).get();

        //next btn on bowling page popup
        
        //times disabled for all days except friday and saturday
        if(sday == 1 || sday == 2 || sday == 3 || sday == 4 || sday == 5){
          if(title === "Music Quiz"){
            jQuery(".musicbox-time .btn-time[time='23:30'], .musicbox-time .btn-time[time='24:00']").addClass('disabled');
          } else if(title === "Racing Sims"){
            jQuery(".racingsims-time .btn-time[time='23:30'], .racingsims-time .btn-time[time='24:00'], .racingsims-time .btn-time[time='00:30']").addClass('disabled');
          } else if(title === 'Karaoke'){
            jQuery(".karaoke-time .btn-time[time='23:30'], .karaoke-time .btn-time[time='24:00']").addClass('disabled');
          } else if(title === 'Table Bookings'){
            jQuery(".table-bookings-time .btn-time[time='23:30']").addClass('disabled');
          } else if(title === 'Music Arena'){
            jQuery(".music-arena-time .btn-time[time='23:30'], .music-arena-time .btn-time[time='24:00']").addClass('disabled');
          }
        }

    });

    jQuery("#add_activities,#upgrade_btn").on("click", function (e) {
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
            //jQuery("#activity_btn").addClass('width-half').removeClass('d-md-inline-block').hide();
            //add class so that we can separate between normal next and upgrade next button click
            jQuery("#activity_btn").addClass("upgradenext");
            //when there is an upgrade, change the text rather than step 2.
            jQuery("#upselltitle").find('h2').html("Would you like to add anything else?");
            jQuery(".activities").hide();
            jQuery(".instruction-text").hide();
            jQuery("#activity_btn").hide();
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
        people = parseInt(ppl);
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
            //alert('test');
        }


        //console.log(currentSelection);        
        if (currentSelection.indexOf("Music Quiz") >= 0 || currentSelection.includes("Music Quiz")) {
            jQuery(".timegroup.musicbox-time").show();
            document.querySelector(".musicbox-time").style.display = "block";
            var timeDuration;
            //alert(currentSelection)
            jQuery(".musicbox-time a.btn-time").each(function (index) {
                var eachtime = jQuery(this).find("span.unskew:first-child");
                thistm = jQuery(this).attr("time");
                //if(index==0)alert(thistm)
                timeDuration = parseInt(maxpeople * 10);
                var endtime = addMinutes(thistm, timeDuration);
                var eachtimeTxt = eachtime.text();

                if (eachtimeTxt.length < 6) {
                    eachtime.append(" - " + endtime);
                }
                jQuery(this).attr("data-etime", endtime.replace(":", ""));
            });
        }

        if (currentSelection.indexOf("Music Arena") >= 0) {
            jQuery(".music-arena-time").show();
        }
        if (currentSelection.indexOf("Racing Sims") >= 0) {
            jQuery(".racingsims-time").show();
        }
        if (currentSelection.indexOf("Racing Sims") >= 0) {
            jQuery(".racingsims-time").show();
        }
        if (currentSelection.indexOf("Karaoke") >= 0) {
            jQuery(".karaoke-time").show();
        }
        if (currentSelection.indexOf("Table Bookings") >= 0) {
            jQuery(".table-bookings-time").show();
        }
        if (currentSelection.indexOf("Bottomless Brunch") >= 0) {
          jQuery(".bottomless-time").show();
        }
        
        if (currentSelection.indexOf("NYE") >= 0) {
          jQuery(".nye-time").show();
        }

        jQuery("#booking-time").zoneAvailability();
		
		//disable karaoke time after 7pm 

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
            //observer.observe(item, { attributes: true });
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
            //if (!currItem.closest('.timegroup').hasClass("table-bookings-time"))
                disableOverlapping(currItem);
        }
        
        //scroll to available time if all visible are disabled after selecting a time 
        //scrollToAvailabletime(currItem);
		console.log(jQuery("a.btn-time.selected").length)
        //if (jQuery("a.btn-time.selected").hasClass("selected"))
            jQuery("#upgrade_btn").show();
        //else
            //jQuery("#upgrade_btn").show();
    });

    function disableOverlapping(currItem) {
        var se_time = jQuery(".btn-time.selected").map(function () {
            return { start: jQuery(this).data("stime"), end: jQuery(this).data("etime") };
        }).get();

        jQuery(".btn-time:not(.selected)").each(function () {
            //if (!jQuery(this).closest('.timegroup').hasClass("table-bookings-time-disable")) {
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
            //}
        });
    }

    jQuery("#booking_btn, #continue_btn").click(function (e) {
        e.preventDefault();

        dte = jQuery(".flatpickr-input").val();
        zid = jQuery(".selected")
            .map(function () {
                return jQuery(this).attr("category");
            })
            .get();
        zid = zid.join(",");

        //for now get the total people from dropdown as number of people same for all
        people = parseInt(jQuery("#no_people option:selected").val());
        var splOffer = jQuery("#offers_opt").val();

        let totalPeople;
        const timeGroups = [
            ".timegroup.musicbox-time",
            ".timegroup.music-arena-time",
            ".timegroup.racingsims-time",
            ".timegroup.karaoke-time",
            ".timegroup.table-bookings-time",
            ".timegroup.bottomless-time",
            ".timegroup.nye-time",
        ];

        // Generate the `pids` string
        const pids = timeGroups
            .map(group =>
                jQuery(`${group} .selected`)
                    .map(function () {
                        let pid;
                        if (group === ".timegroup.musicbox-time") {
                            let selectedTime = parseInt(jQuery(this).attr("data-stime"));

                            // Check conditions for peak day
                            if ((selectedTime >= 1600 && (sday === 5 || sday === 6)) || (sday === 7 || sday === 1)) {
                                pid = 113101480;
                                if(people<6) people = 6;
                                totalPeople = people;
								              // totalPeople = Math.ceil(people / 8); // Calculate total people for musicbox-time

                            } else { //off peak day
                                pid = 114340933;
                                if( people<4 )people=4
                                totalPeople = people;
                            }

                            return `&selected_products[${pid}]=${totalPeople}`;
                        } else if (group === ".timegroup.karaoke-time") {
                            let selectedTime = parseInt(jQuery(this).attr("data-stime"));

                            // Check conditions for peak day
							              //thu - sun
                            if (sday === 5 || sday === 6 || sday === 7 || sday === 1) {
                                pid = 113111244;
                                if(people<6) people = 6;
                                totalPeople = people;

                            } else { //off peak day
                                pid = 113111245;
								                if( people<4 )people=4
								                totalPeople = people;
                            }
							
                            return `&selected_products[${pid}]=${people}`;
                            
                        } else if (group === ".timegroup.racingsims-time") {
                            const pidMap = [
                                { min: 0, max: 6, pid: 113109993 },
                                { min: 7, max: 12, pid: 114481089 },
                                { min: 13, max: 18, pid: 114481111 },
                                { min: 19, pid: pid }
                            ];
                            pid = pidMap.find(range => people >= range.min && people < (range.max || Infinity)).pid;
                            return `&selected_products[${pid}]=${people}`;
						               
						} else if (group === ".timegroup.bottomless-time") {
						    
						    pid = jQuery(this).attr("pid");
                            /*if(splOffer=== "beer"){
                              pid = 118678760;
                            } else if(splOffer=== "cocktail"){
                              pid = 118678943;
                            } else {
                              pid = 118678668;
                            }*/
                            return `&selected_products[${pid}]=${people}`;
						    
						} else if(group === ".timegroup.table-bookings-time"){
                            return `&selected_products[${pid}]=${people}`;
                        } else {
                            pid = jQuery(this).attr("pid");
                            return `&selected_products[${pid}]=${people}`;
                        }
                    })
                    .get()
                    .join("")
            )
            .join("");

        const categoryToZoneMap = {
            12684: 3114,
            12685: 3115,
            12686: 3116,
            13248: 3114,
            12688: 3117
        };

        zntmes = jQuery(".timegroup .selected")
            .map(function () {
                const category = jQuery(this).attr("category");
                const zoneId = categoryToZoneMap[category];
                if (zoneId) {
                    return `&zone_times[${zoneId}]=${jQuery(this).attr("time")}`;
                }
            })
            .get()
            .join("");

        var tme = jQuery(".timegroup .selected").eq(0).attr("time");

        //var burl = "https://bookedit.online/spider-box-book/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + pids + zntmes+"&people="+people;
        var burl = "https://bookings.thespiderbox.com/book/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + pids + zntmes + "&people=" + people;
        //console.log(burl);
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
jQuery(document).on("elementor/popup/show", () => {
    wpcf7.init( jQuery('.wpcf7-form')[0] );

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
        case 'Music Quiz':
            return 180; // 3 hours
        case 'Music Arena':
            return 120; // 2 hours
        case 'Racing Sims':
            return 30;  // 30 minutes
        case 'Table Bookings':
            return 60;  // 2 hours
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

jQuery("a.btn-time.selected").each(function() {
    var pid = jQuery(this).attr('pid'); // Get the 'pid' attribute

    // Check if 'pid' exists
    if (pid === undefined || pid === null) {
        console.error("Missing pid for this time slot:", jQuery(this)); // Log an error if 'pid' is missing
    } else {
        console.log("Selected slot with pid:", pid); // Log the 'pid' value
    }
});