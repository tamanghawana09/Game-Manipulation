jQuery(document).ready(function () {
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
        maxDate: "2025-12-31",
        disableMobile: "true",
        onChange: function (selectedDates, dateStr, instance) {
            date = selectedDates[0];
            sday = selectedDates[0].getDay();
            sday = sday + 1;
            console.log(sday);

            var selDate = new Date(date).toLocaleDateString("en-GB");
            dte = jQuery(".flatpickr-input").val();
            jQuery("#booking-input-inner").data("date", dte);
            jQuery("#booking-input-inner").attr("data-date", dte);
            
            if( new Date(dte) >= new Date('2024-06-28') && new Date(dte) <= new Date('2024-07-30') ){
                
                if( sday == 6 || sday == 7 || sday == 1){
                    jQuery("#roller_skating").removeClass('disable');
                } else {
                    jQuery("#roller_skating").addClass('disable');
                }
                
                jQuery('.skating-time .btn-time').addClass('disabled');
                if(dte=="2024-06-28" || dte=="2024-06-29" || dte=="2024-07-05" || dte=="2024-07-06" || dte=="2024-07-26"){
                    jQuery('.skating-time .btn-time[time="18:00"]').removeClass('disabled');
                    
                } else if( dte=="2024-07-07"){
                    jQuery('.skating-time .btn-time[time="15:00"]').removeClass('disabled');
                    
                } else if( dte=="2024-07-27" ){
                    jQuery('.skating-time .btn-time[time="16:00"]').removeClass('disabled');
                } else {
                    jQuery('.skating-time .btn-time[time="17:00"]').removeClass('disabled');
                }
            } else if( dte == '2024-11-29' || dte == '2024-11-30'){
                jQuery("#roller_skating").removeClass('disable');
                
                jQuery('.skating-time .btn-time').addClass('disabled');
                if(dte=='2024-11-29'){
                    jQuery('.skating-time .btn-time[time="19:00"]').removeClass('disabled');
                }
                else if(dte=="2024-11-30"){
                    jQuery('.skating-time .btn-time[time="18:00"]').removeClass('disabled');
                }
            } else if(dte=='2024-12-01' || dte=='2024-12-06' || dte=='2024-12-08' || dte=='2024-12-13' || dte=='2024-12-14' || dte=='2024-12-15' || dte=='2024-12-20' || dte=='2024-12-21' || dte=='2024-12-27'){
                jQuery("#roller_skating").removeClass('disable');
                
                jQuery('.skating-time .btn-time').addClass('disabled');
                jQuery('.skating-time .btn-time[time="17:00"]').removeClass('disabled');
                if(dte=='2024-12-27'){
                    jQuery('.skating-time .btn-time[time="17:00"]').addClass('disabled');
                    jQuery('.skating-time .btn-time[time="13:00"]').removeClass('disabled');
                }
            } else{
                jQuery("#roller_skating").addClass('disable');
            }

            if (dte == '2025-02-01' || dte == '2025-02-02') {
                jQuery("#roller_skating").removeClass('disable');
        
                jQuery('.skating-time .btn-time').addClass('disabled');
                jQuery('.skating-time .btn-time[time="17:00"]').removeClass('disabled');
                jQuery('.skating-time .btn-time[time="18:00"]').addClass('disabled');
            } else if (dte == '2025-02-03') {
                jQuery("#roller_skating").removeClass('disable');
        
                jQuery('.skating-time .btn-time').addClass('disabled');
                jQuery('.skating-time .btn-time[time="14:00"]').removeClass('disabled');
                jQuery('.skating-time .btn-time[time="15:00"]').addClass('disabled');
            } else if (
                dte == '2025-02-07' || dte == '2025-02-08' || dte == '2025-02-09' || 
                dte == '2025-02-15' || dte == '2025-02-16' || dte == '2025-02-23'
            ) {
                jQuery("#roller_skating").removeClass('disable');
        
                jQuery('.skating-time .btn-time').addClass('disabled');
                jQuery('.skating-time .btn-time[time="17:00"]').removeClass('disabled');
                jQuery('.skating-time .btn-time[time="18:00"]').addClass('disabled');
            } else {
                jQuery("#roller_skating").addClass('disable');
            }
        },
    });

    let currentSelection, totselbefUpgrade;
    var people;
    var maxpeople;
    var kd;
    var tppl, thistm;
    var ss, selEtime, selStime;
    var tme, title, loc, dte, ppl, zid, pid, pids, adults, childrens;

    jQuery(".dropdown-toggle").on("click", function (e) {
        e.preventDefault();
    });

    jQuery(".btn-backto a.elementor-button").on("click", function (e) {
        e.preventDefault();
        jQuery("section[id*='booking-step']").hide();
        if (jQuery(this).hasClass("todate")) {
            jQuery("section#booking-step-1").show();
        } else {
            jQuery("section#booking-step-2").show();
        }
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

        if (val == "30") {
            location.href = "/corporate-booking/";
        }
    });

    // triggers when clicking done on people dropdown
    jQuery(".dp2_people div, .people-dropdown").on("click tap", function (e) {
        e.preventDefault();
        var ad = parseInt(jQuery(".ad").val());
        var ch = parseInt(jQuery(".ya").val());
        people = ad + ch;
        console.log(people);
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

        jQuery("#booking-input-inner").data("interval", maxpeople * 10).attr("data-interval", maxpeople * 10);

        // jQuery(".musicbox-time a.category").attr("data-tdiff", maxpeople * 10);
        // jQuery(".musicbox-time a.category").data("tdiff", maxpeople * 10);

        // jQuery(".musicarena-time a.category").attr("data-tdiff", maxpeople * 20);
        // jQuery(".musicarena-time a.category").data("tdiff", maxpeople * 20);

        jQuery(".bt-timediff").text(maxpeople * 10 + " Mins");
        jQuery(".bat-timediff").text(maxpeople * 20 + " Mins");

        jQuery(".choose_times .owl-carousel").data("needed", people).attr("data-needed", people);
        jQuery(".choose_times .owl-carousel").data("needed", Math.ceil(people / 6)).attr("data-needed", Math.ceil(people / 6));
        jQuery(".bowling-time .owl-carousel").data("needed", Math.ceil(people / 6)).attr("data-needed", Math.ceil(people / 6));
    });

    jQuery(".dp2_people input").on("input", function (e) {
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

    jQuery(".item-times").on("change", function (e) {
        e.preventDefault();
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

    //Triggers on Next Button on Search
    jQuery("#available_btn").on("click", function (e) {
        var dte = jQuery(".flatpickr-input").val();
        console.log(dte);
        var tme = jQuery("#item-times").val();
        tmeText = jQuery("#item-times").find(':selected').text()
        //console.log(tmeText);
        var ppl = jQuery("#dp2_people .val").text();
        adults = jQuery("input[name=adult]").val();
        childrens = jQuery("input[name=yng_adult]").val();

        if (dte != "" && ppl != "No. of People" && tme != "") {
            jQuery("section[id*='booking-step']").hide();
            jQuery("#booking-step-2").show();

            jQuery(".search-alert").hide();

            /*jQuery(".form-select").val();
            jQuery(".box-date span").text(jQuery(".flatpickr-input").val());
            jQuery(".box-people span").text(jQuery("#dp2_people .val").text());*/
  
            if (childrens > 0 && adults > 0 ) {
                jQuery("#softplay").removeClass("disable");
            } else {
                jQuery("#softplay").addClass("disable");
            }
            
            if (
                // Existing January Dates and Times
                (
                    (dte == '2025-01-12' || dte == '2025-01-17' || dte == '2025-01-18' || dte == '2025-01-26') &&
                    (tmeText == '17:00' || tmeText == '17:30' || tmeText == '18:00')
                ) ||
                (
                    (dte == '2025-01-19' || dte == '2025-01-24') &&
                    (tmeText == '18:00' || tmeText == '18:30' || tmeText == '19:00')
                ) ||
                // New February Dates and Times
                (
                    (dte == '2025-02-01' || dte == '2025-02-02') &&
                    (tmeText == '17:00' || tmeText == '17:30' || tmeText == '18:00')
                ) ||
                (
                    dte == '2025-02-03' &&
                    (tmeText == '14:00' || tmeText == '14:30' || tmeText == '15:00')
                ) ||
                (
                    (dte == '2025-02-07' || dte == '2025-02-08' || dte == '2025-02-09' ||
                     dte == '2025-02-15' || dte == '2025-02-16' || dte == '2025-02-23') &&
                    (tmeText == '17:00' || tmeText == '17:30' || tmeText == '18:00')
                )
            ) {
                jQuery("#roller_skating").removeClass('disable');
            } else {
              //  jQuery("#roller_skating").addClass('disable');
            }

        
            
            var allowedDates = ['2025-01-12','2025-01-17','2025-01-18', '2025-01-26'];
            var allowedDates2 = ['2025-01-19','2025-01-24'];

            jQuery(".skating-time a.btn-time").each(function (index) {
                
                thistm = parseInt(jQuery(this).attr("data-stime"));
                if (allowedDates.includes(dte) && thistm != 1700){
                    jQuery(this).addClass("unavailable");
                }
                if (allowedDates2.includes(dte) && thistm != 1800 ){
                    jQuery(this).addClass("unavailable");
                }
                
            });

            var timeDuration;
            jQuery(".bowling-time a.btn-time").each(function (index) {
                var eachtime = jQuery(this).find("span.unskew:first-child");
                thistm = jQuery(this).attr("time");
                timeDuration = parseInt(jQuery(this).data("tdiff")); //parseInt(maxpeople * 10);
                var endtime = addMinutes(thistm, timeDuration);
                var eachtimeTxt = eachtime.text();

                if (eachtimeTxt.length < 6) {
                    eachtime.append(" - " + endtime);
                }
                jQuery(this).attr("data-etime", endtime.replace(":", ""));
            });
        } else {
            jQuery(".search-alert").show();
        }
    });

    jQuery(".activities").on("click", function (e) {
        e.preventDefault();

        /*loc = jQuery(".form-select").val();
        dte = jQuery(".flatpickr-input").val();
        ppl = jQuery("#dp2_people .val").text();*/

        title = jQuery(this).attr("title");

        //jQuery(this).parents(".activities_").toggleClass("active");
        jQuery(this).toggleClass("selected");
        jQuery(this).find(".activities").toggleClass("selected");
        //jQuery(this).parent().toggleClass("selectedwrapper");
        jQuery(this).toggleClass("selectedwrapper");
        /*currentSelection = jQuery(".selected")
        .map(function () {
                return jQuery(this).attr("title");
            })
            .get();*/
        //console.log(currentSelection);
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

        if (currentSelection.indexOf("Bowling") >= 0) {
            jQuery(".bowling_hour_title").show();
            jQuery(".bowling_option_wrapper").show();
            document.querySelector("#bowling_options").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        } else {
            jQuery(".bowling_hour_title").hide();
            jQuery(".bowling_option_wrapper").hide();
        }

        var dte = jQuery(".flatpickr-input").val();
        var tme = jQuery("#item-times").val();  
        console.log(tme);
    
        var allowedDates = ["2024-10-04", "2024-10-11", "2024-10-18", "2024-10-25", 
            "2024-11-01", "2024-11-08", "2024-11-15", "2024-11-29", 
            "2024-12-06", "2024-12-13", "2024-12-20"];
            
        if (allowedDates.includes(dte) && tme >= 14 && tme <= 17) {
            if (currentSelection.indexOf("Climbing") >= 0) {
                jQuery(".climbing_age_title").show();
                jQuery(".climbing_option_wrapper").show();
                document.querySelector("#climbing_options").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            } else {
                jQuery(".climbing_age_title").hide();
                jQuery(".climbing_option_wrapper").hide();
            }
        }

        //console.log(currentSelection.length);
        if (currentSelection.length == 1) {
            jQuery("#upgrade_btn").attr("data-bs-target", "#popup-activities");
        } else {
            //#popup-food-drink
            jQuery("#upgrade_btn").attr("data-bs-target", "#popup-activities");
        }

        currentUpsellSelection = jQuery(".booking-upsell .activities.selected")
            .map(function () {
                return jQuery(this).attr("title");
            })
            .get();

        //next btn on bowling page popup
        /*if (currentSelection.length >= 1 ) {
            jQuery("#bowl_activity_btn").css("display", "inline-block");
      jQuery("#activity_btn").addClass('d-md-inline-block').show();
        } else {
            jQuery("#bowl_activity_btn").hide();
        }*/
    });

    jQuery("#bowling_options").on("change", function (e) {
        e.preventDefault();
        var hr = jQuery(this).val();
        if (hr == 1) {
            jQuery(".bowling-time .category").attr("pid", "101608486");
            if (sday == 1) {
                jQuery('.bowling-time .btn-time[time="20:00"]').addClass('disabled');    
            }
        }
        if (hr == 2) {
            jQuery(".bowling-time .category").attr("pid", "101608487");
            jQuery('.bowling-time .btn-time[time="20:00"]').addClass('disabled');
            if (sday == 1) {
                jQuery('.bowling-time .btn-time[time="19:00"]').addClass('disabled');    
            }
        }
        if (hr == 3) {
            jQuery(".bowling-time .category").attr("pid", "101608488");
            jQuery('.bowling-time .btn-time[time="19:00"]').addClass('disabled');
            jQuery('.bowling-time .btn-time[time="20:00"]').addClass('disabled');
            if (sday == 1) {
                jQuery('.bowling-time .btn-time[time="18:00"]').addClass('disabled');    
            }
        }
        if (hr == 4) {
            jQuery(".bowling-time .category").attr("pid", "101608489");
            jQuery('.bowling-time .btn-time[time="18:00"]').addClass('disabled');
            jQuery('.bowling-time .btn-time[time="19:00"]').addClass('disabled');
            jQuery('.bowling-time .btn-time[time="20:00"]').addClass('disabled');
            if (sday == 1) {
                jQuery('.bowling-time .btn-time[time="17:00"]').addClass('disabled');    
            }
        }
    });

    jQuery("#add_activities,#upgrade_btn").on("click", function (e) {
        e.preventDefault();
        jQuery("#popup-activities").click();
        if (currentSelection.length > 1) {
            jQuery("#continue_btn").click();
        } else {
            jQuery("#booking-step-2").show().addClass("booking-upsell");
            jQuery("#booking-step-3").hide();
            jQuery(".selectedwrapper").hide();
            jQuery(".activity_btn_no_add").show();
            //jQuery("#activity_btn").addClass('width-half').removeClass('d-md-inline-block').hide();
            //add class so that we can separate between normal next and upgrade next button click
            jQuery("#activity_btn").addClass("upgradenext");
            //when there is an upgrade, change the text rather than step 2.
            jQuery("#booking-step-2").find("h3>span").html("Would you like to add an extra game?");
        }
    });

    /*jQuery("#activity_btn_no_add").on("click", function (e) {
        e.preventDefault()
    jQuery("#continue_btn").click();
  });*/

    jQuery("#activity_btn").on("click", function (e) {
        e.preventDefault();
        people = parseInt(ppl);
        var dte = jQuery(".flatpickr-input").val();
        var tme = jQuery("#item-times").val(); 
        jQuery(".timegroup").hide();

        //if user doesnt select any activity in upgrade, redirect directly to booking journey
        if (jQuery(this).hasClass("upgradenext") && currentSelection.length == 1) {
            const myElement = document.getElementById("continue_btn");
            //myElement.addEventListener('click', e => console.log(e.detail));
            jQuery("#continue_btn").click();
            return false;
        }
        if (jQuery(".activities").hasClass("selected")) {
            jQuery("section[id*='booking-step']").hide();
            jQuery("#booking-step-3").show();
        } else {
            //alert('alert');
        }

        /*if (jQuery(this).is("#bowl_activity_btn") ) {
            jQuery(".upsell-activities").hide();
            jQuery(".upsell-timegroup").show();
        }*/
        //console.log(currentSelection);
        if (currentSelection.indexOf("Music Box") >= 0 || currentSelection.includes("Music Box")) {
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

        if (currentSelection.indexOf("Bowling") >= 0) {
            jQuery(".bowling-time").show();
            var timeDuration;
            jQuery(".bowling-time a.btn-time").each(function (index) {
                var eachtime = jQuery(this).find("span.unskew:first-child");
                thistm = jQuery(this).attr("time");
                timeDuration = parseInt(maxpeople * 20);
                var endtime = addMinutes(thistm, timeDuration);
                eachtime.append(" - " + endtime);
                jQuery(this).attr("data-etime", endtime.replace(":", ""));
            });
        }
        if (currentSelection.indexOf("Soft Play") >= 0) {
            jQuery(".softplay-time").show();
        }
        if (currentSelection.indexOf("Laser Tag") >= 0) {
            jQuery(".lasertag-time").show();
        }

        var allowedDates = ["2024-10-04", "2024-10-11", "2024-10-18", "2024-10-25", 
        "2024-11-01", "2024-11-08", "2024-11-15", "2024-11-29", 
        "2024-12-06", "2024-12-13", "2024-12-20"];

        if (currentSelection.indexOf("Climbing") >= 0) {
            jQuery(".climbing-time").show();
            if (allowedDates.includes(dte) && (tme == 14 || tme == 15 || tme == 16)) {
                //jQuery(".climbing-time .btn-regular").addClass("disabled-availability");
                document.querySelectorAll(".climbing-time .btn-regular").forEach(element => {
                    element.style.pointerEvents = 'none';
                    element.style.opacity = 0.4;
                });
                document.querySelectorAll(".climbing-time .btn-offer").forEach(element => {
                    element.style.display = "block";
                });
            } else {
                //jQuery(".climbing-time .btn-regular").removeClass("disabled-availability");
                document.querySelectorAll(".climbing-time .btn-regular").forEach(element => {
                    element.style.pointerEvents = 'auto';
                    element.style.opacity = 1;
                });
                document.querySelectorAll(".climbing-time .btn-offer").forEach(element => {
                    element.style.display = "none";
                });
            } 
        }
        if (currentSelection.indexOf("Gaming Zone") >= 0) {
            jQuery(".gaming-time").show();
        }
        if (currentSelection.indexOf("Roller Skating") >= 0) {
            jQuery(".skating-time").show();
        }

        /*jQuery('html, body').animate({
            scrollTop: parseInt(jQuery("#booking-time").offset().top-50)
        }, 500);*/

        jQuery("#booking-input-inner").zoneAvailability();
		//jQuery("#booking-input-inner").availability();

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

        if (jQuery("a.btn-time").hasClass("selected")) jQuery("#upgrade_btn").show();
        else jQuery("#upgrade_btn").show();
    });

    function disableOverlapping(currItem) {
        var se_time = [];
        jQuery(".btn-time.selected").each(function () {
            se_time.push({ start: jQuery(this).data("stime"), end: jQuery(this).data("etime") });
        });
        console.log(se_time);

        jQuery(".btn-time:not(.selected)").each(function () {
            var stTime = jQuery(this).data("stime");
            var enTime = jQuery(this).data("etime");

            // jQuery(this).removeClass("disabled");
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

    jQuery("#popup-activities .btn-time").on("click", function (e) {
        jQuery("#popup-activities .modal-footer #bowl_upgrade_booking_btn").show();
    });

    // Berlin-booking page
    // #booking_btn - > Food n drink popup: no thank you btn
    // #upgrade_booking_btn -> upgrade/upsell popup: Upgrade btn
    // #no_add_activities -> upgrade/upsell popup: no thank you btn

    // Berlin-bowling-booking page
    // #bowl_upgrade_booking_btn - > upgrade activity popup: upgrade btn
    jQuery("#booking_btn, #continue_btn").click(function (e) {
        e.preventDefault();
        var pids = "";
        var bpid = "";
        dte = jQuery(".flatpickr-input").val();
        var ad = parseInt(jQuery(".ad").val());
        var ch = parseInt(jQuery(".ya").val());
        people = ad + ch;

        zid = jQuery(".selected").not(".softplay-time .selected")
            .map(function () {
                return jQuery(this).attr("category");
            })
            .get();

        pid = jQuery(".timegroup:not(.bowling-time):not(.softplay-time) .selected")
            .map(function () {
                //return jQuery(this).attr("category");
                return "&selected_products[" + jQuery(this).attr("pid") + "]=" + people;
            })
            .get();

        bpid = jQuery(".bowling-time .selected")
            .map(function () {
                //return jQuery(this).attr("category");
                return "&selected_products[" + jQuery(this).attr("pid") + "]=" + Math.ceil(people / 6);
            })
            .get();

        //assign category and product for softplay for now
        if (currentSelection.indexOf("Soft Play") >= 0) {
            if (ch != 0) {
                szid = jQuery(".softplay-time").find(".btn-time.selected").attr("category") + "," + jQuery(".softplay-time").find(".btn-time.selected").data("childcategory");
                spid = "&selected_products[" + jQuery(".softplay-time").find(".btn-time.selected").attr("pid") + "]=" + ad + "&selected_products[" + jQuery(".softplay-time").find(".btn-time.selected").data("chilpid") + "]=" + ch;
            } else {
                szid = jQuery(".softplay-time").find(".btn-time.selected").attr("category");
                spid = "&selected_products[" + jQuery(".softplay-time").find(".btn-time.selected").attr("pid") + "]=" + Math.ceil(people / 6);
            }
            zid.push(szid);
            pid.push(spid);
        }

        zid = zid.join(",");

        pids = bpid + pid.join("");

        zntme = jQuery(".timegroup .selected")
            .map(function () {
                if (jQuery(this).attr("category") == 12713) {
                    return "&zone_times[3170]=" + jQuery(this).attr("time");
                }
                if (jQuery(this).attr("category") == 12714) {
                    return "&zone_times[3171]=" + jQuery(this).attr("time");
                }
                if (jQuery(this).attr("category") == 12715) {
                    return "&zone_times[3171]=" + jQuery(this).attr("time");
                }
                if (jQuery(this).attr("category") == 12716) {
                    return "&zone_times[3172]=" + jQuery(this).attr("time");
                }
                if (jQuery(this).attr("category") == 12717) {
                    return "&zone_times[3173]=" + jQuery(this).attr("time");
                }
                if (jQuery(this).attr("category") == 12718) {
                    return "&zone_times[3175]=" + jQuery(this).attr("time");
                }
                if (jQuery(this).attr("category") == 12719) {
                    return "&zone_times[3176]=" + jQuery(this).attr("time");
                }
            })
            .get();
        zntmes = zntme.join("");
        //console.log(zntmes);
        var tme = jQuery(".timegroup .selected").eq(0).attr("time");

        //var burl = "/book-now/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + pids + zntmes+"&people="+people;
        var burl = "/online-book/?date=" + dte + "&category_id=" + zid + "&start_time=" + tme + pids + zntmes + "&people=" + people + "&external_event_id=activity";
        console.log(burl);
        location.href = burl;

        //location.href = "/book-now/?date=2024-04-28&category_id[]=11808&selected_products[97658540]=1";
    });

    jQuery(".timegroup .owl-carousel").owlCarousel({
        loop: false,
        margin: 20,
        stagePadding: 0,
        dots: false,
        navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
        // navText: ["<img src='/img/svg/icon-caret-left.svg' alt='Prev'/>", "<img src='/img/svg/icon-caret-right.svg' alt='Next'/>"],
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

//jQuery("#inputDate").on("change", function (e) {  
document.getElementById('inputDate').addEventListener('change', function () {
    const inputValue = document.getElementById('inputDate').value;
    const [year, month, day] = inputValue.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    // Get current time in London
    const now = new Date();
    const options = {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formatter = new Intl.DateTimeFormat([], options);
    const parts = formatter.formatToParts(now);
    const hours = parseInt(parts.find(p => p.type === 'hour').value);
    const minutes = parseInt(parts.find(p => p.type === 'minute').value);
    const londonTime = new Date();
    londonTime.setHours(hours);
    londonTime.setMinutes(minutes);

    const today = londonTime;

    const timeSelect = document.getElementById('item-times');
    const timeOptions = timeSelect.querySelectorAll('.item-time');

    // Enable all time options initially
    timeOptions.forEach(option => {
        option.style.display = '';
        option.disabled = false;
    });

    // Enable all <a> tags initially
    const timeLinks = document.querySelectorAll('a.btn-time');
    timeLinks.forEach(link => {
        const parent = link.closest('.owl-item');
        link.style.pointerEvents = 'auto';
        link.style.opacity = 1;
        parent.classList.remove('offtime');
    })

    // If the selected date is today, disable past times
    if (selectedDate && selectedDate.toDateString() === today.toDateString()) {
        const currentTime = today.getHours() * 60 + today.getMinutes();

        // Disable past time options
        timeOptions.forEach(option => {
            const [hours, minutes] = option.textContent.split(':').map(Number);
            const optionTime = hours * 60 + minutes;
            if (optionTime < currentTime) {
                option.style.display = 'none';
                option.disabled = true;
            }
        });

        // Disable past <a> tags
        timeLinks.forEach(link => {
            const [hours, minutes] = link.getAttribute('time').split(':').map(Number);
            const linkTime = hours * 60 + minutes;
            if (linkTime < currentTime) {
                const parent = link.closest('.owl-item');
                parent.classList.add('offtime');
                link.style.pointerEvents = 'none';
            }
        });
    }
});