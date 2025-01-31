var allDatesAvailable = [];
allDatesAvailable.push({
    Date: "2022-12-23",
    Price: "peak",
});

var zid;
var dte;
var tme;
var currentSelection;
var datesDisabled;

/*jQuery('.btn-time').click(function() {
    zid = jQuery(this).attr("category");
});*/

jQuery("#booknow").hide();

jQuery(document).on("elementor/popup/show", () => {
    jQuery("#ids_times").hide();
    jQuery("#continue-booking").hide();

    currentSelection = jQuery(".activity.selected").attr("title");

    jQuery(".flatpickr-input").flatpickr({
        altInput: true,
        altFormat: "j F Y",
        //defaultDate: default_date,
        dateFormat: "Y-m-d",
        inline: true,
        position: "auto center",
        disable: [
            function(date) {
                // return true to disable
                day = date.getDay();

                if (currentSelection == 'Parties'){
                    //return (day === 0 );
                    return;
                } else if (currentSelection == 'Exclusive'){
                    return ( day === 1 || day === 2 || day === 3 || day === 4 || day === 5 );
                }
            }
        ],
        locale: {
            firstDayOfWeek: 1,
            // start week on Monday
        },
        minDate: "2025-02-17",
        maxDate: "2025-02-23",
        onChange: function (selectedDates, dateStr, instance) {
            d = new Date(selectedDates).toLocaleDateString();
            sday = selectedDates[0].getDay();
            dte = jQuery(".flatpickr-input").val();

            currentSelection = jQuery(".activity.selected").attr("title");
            jQuery(".choose_times").hide();
            jQuery(".softplay_times").hide();
            //jQuery(".btn-time,.play-time").hide();

            console.log(dte);

            if (currentSelection == "SoftPlay") {
                jQuery(".choose_times.softplay").show();
                if (dte == "2025-02-17") {
                    jQuery(".play-time.soft-allday").show();
                    jQuery(".btn-time.soft-monday").show();
                } else if (dte == "2025-02-18") {
                    jQuery(".play-time.soft-allday").show();
                    jQuery(".btn-time.soft-tuesday").show();
                } else if (dte == "2025-02-19") {
                    jQuery(".play-time.soft-allday").show();
                    jQuery(".btn-time.soft-wednday").show();
                } else if (dte == "2025-02-21") {
                    jQuery(".play-time.soft-allday").show();
                    jQuery(".btn-time.soft-friday").show();
                } else if (dte == "2025-02-22" || dte == "2025-02-23") {
                    jQuery(".play-time.soft-endday").show();
                } else {
                    jQuery(".play-time.soft-allday").show();
                }
            }
            if (currentSelection == "Parties") {
                jQuery(".choose_times.party").show();
                if (dte == "2025-02-22" || dte == "2025-02-23") {
                    //jQuery(".btn-time.party-allday").hide();
                    jQuery(".btn-time.party-satday").show();
                } else {
                    jQuery(".btn-time.party-allday").show();
                }
            }
            if (currentSelection == "Exclusive") {
                jQuery(".choose_times.exclusivehire").show();
                jQuery(".btn-time.exhire-weekend").show();
            }

            jQuery("#ids_times").show();
            jQuery("#calender").hide();

            jQuery(".choose_times").availability();
            jQuery(".choose_times").attr("data-date", dte);
        },
        onDayCreate: function (selectedDates, dateStr, instance, dayElem) {},
        onMonthChange: function (selectedDates, dateStr, instance) {},
    });

    jQuery(document).ready(function () {
        jQuery(".btn-time").on("click", function (e) {
            e.preventDefault();

            dte = jQuery(".flatpickr-input").val();
            //tme = jQuery(this).attr("time");
            //zid = jQuery(this).attr("category");
            //eid = jQuery(this).attr("eid");

            jQuery("a.btn-time").removeClass("selected");
            jQuery(this).addClass("selected");

            if (jQuery("a.btn-time").hasClass("selected")) {
                jQuery("#continue-booking").show();
            } else {
                jQuery("#continue-booking").hide();
            }
        });
        jQuery(".play-time").on("click", function (e) {
            e.preventDefault();

            jQuery("a.play-time").removeClass("selected");
            jQuery(this).addClass("selected");

            if (jQuery("a.play-time").hasClass("selected")) {
                jQuery(".choose_times").hide();
                jQuery(".softplay_times").show();
                jQuery(".softplay_times .btn-time").show();
                if (dte == "2025-02-22" || dte == "2025-02-23") {
                    jQuery(".btn-time.hide-weekend").hide();
                } 
            } else {
                jQuery(".choose_times").show();
            }
        });

        jQuery("#continue-booking").on("click", function (e) {
            e.preventDefault();
            dte = jQuery(".flatpickr-input").val();
            tme = jQuery(".btn-time.selected").attr("time");
            playeid = jQuery(".play-time.selected").attr("playeid");
            eid = jQuery(".btn-time.selected").attr("eid");
            zid = jQuery(".btn-time.selected")
                .map(function () {
                    return jQuery(this).attr("category");
                })
                .get();
            zid = zid.join("&category_id[]=");

            console.log(eid)

            jQuery(".ev-d").text("Please Wait ...");

            if (currentSelection == "SoftPlay" && playeid == "weekendplay") {
                location.href = "https:/bookedit.online/the-playbarn-book/?date=" + dte + "&start_time="+tme+"&category_id="+zid+"&external_event_id=weekendplay";
            } else if (currentSelection == "SoftPlay" && playeid == "weekdayplay") {
                location.href = "https:/bookedit.online/the-playbarn-book/?date=" + dte + "&start_time="+tme+"&category_id="+zid+"&external_event_id=weekdayplay";
            } else {
                location.href = "https:/bookedit.online/the-playbarn-book/?date=" + dte + "&start_time="+tme+"&category_id="+zid+"&external_event_id="+eid;
            }

        });
    });
}); //elem popup end

jQuery(document).ready(function () {
    jQuery("body").on("click", ".activity", function (e) {
        e.preventDefault();
        jQuery(".activity").removeClass("selected");
        jQuery(this).addClass("selected");
        /*if (jQuery(".activity").hasClass("selected")) 
        jQuery("#booknow").show();
        else jQuery("#booknow").hide();*/
    });
});