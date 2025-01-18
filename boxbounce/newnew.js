var allDatesAvailable = [];
var ss;
allDatesAvailable.push({
    Date: "2023-8-8",
    Class: "aug08",
    Price: "peak"
});

jQuery(document).on("elementor/popup/show", () => {
    jQuery(".flatpickr-input").flatpickr({
        altInput: true,
        altFormat: "j F Y",
        //defaultDate: default_date,
        dateFormat: "Y-m-d",
        inline: true,
        position: "auto center",
        // disable: [
        //     function(date) {
        //         d = new Date(date).toLocaleDateString();
        //         console.log(d);
        //         // return true to disable
        //         return (d == "12/25/2023" || d == "12/26/2023" );
        //     }
        // ],
        locale: {
            firstDayOfWeek: 1,
            // start week on Monday
        },
        minDate: "today",
        maxDate: "2025-12-31",
        onChange: function (selectedDates, dateStr, instance) {

			ss = selectedDates[0].getDay();
			sd = selectedDates[0].getDate();
			sm = selectedDates[0].getMonth();
            var dt = jQuery(".flatpickr-input").val();
			dte = jQuery(".flatpickr-input").val();
            //ss = ss + 1;
            console.log(ss)
            
			if( ss==6 || ss==3){
				jQuery(".activities .col-md-6.jfjump").show();
			} else if(ss==5){
				jQuery(".activities .col-md-6.mbounce").show();
			} else if(ss==1){
				jQuery(".activities .col-md-6.calmer").show();
			} else if(ss==0 || ss==2){
				jQuery(".activities .col-md-6.ssession").show();
			} else {
				jQuery(".activities .col-md-6").show();
				jQuery(".activities .col-md-6.jfjump").hide();
				jQuery(".activities .col-md-6.mbounce").hide()
				jQuery(".activities .col-md-6.calmer").hide()
				jQuery(".activities .col-md-6.ssession").hide()
			}
			
            jQuery(".activities").show();
            jQuery(".slots").hide();
            //jQuery('.day'+ss).show();

            var dt = jQuery(".flatpickr-input").val();
            dte = jQuery(".flatpickr-input").val();

            jQuery("#cal-element").hide();
            //jQuery('.slot-date').show();
            if(dte === '2025-01-19'){
                jQuery(".slot-openjump .sb[data-t='16:30']").addClass('outofCapacity');
                jQuery(".slot-openjump .sb[data-t='17:00']").addClass('outofCapacity');
                jQuery(".slot-openjump .sb[data-t='17:30']").addClass('outofCapacity');
            }else{
                jQuery(".slot-openjump .sb[data-t='16:30']").removeClass('outofCapacity');
                jQuery(".slot-openjump .sb[data-t='17:00']").removeClass('outofCapacity');
                jQuery(".slot-openjump .sb[data-t='17:30']").removeClass('outofCapacity');
            }
        },
        onDayCreate: function (selectedDates, dateStr, instance, dayElem) {
            var date = dayElem.dateObj;
            var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            
            dayElem.className += '';
            // dayElem.innerHTML += '<span>Available</span>';
            for (var i = 0, len = allDatesAvailable.length; i < len; i++) {
                //  console.log(dateCreated);
                if (dateCreated == allDatesAvailable[i].Date) {
                    dayElem.className += ' ' + allDatesAvailable[i].Class;
                }
                
            }
        }
    });

    var cat;
    jQuery(".activities button.btn-softplay").click(function () {
        jQuery(".activities").hide();
        //jQuery('.slot-time > div').hide();
            if(ss==1 || ss==2){
                jQuery(".slot-softplay .sb[data-t='16:00']").hide();
                jQuery(".slot-softplay .sb[data-t='16:30']").hide();
                jQuery(".slot-softplay .sb[data-t='17:00']").hide();
            } else if(ss==3) {
                jQuery(".slot-softplay .sb[data-t='16:00']").hide();
                jQuery(".slot-softplay .sb[data-t='16:30']").hide();
            } else if(ss==5) {
                jQuery(".slot-softplay .sb[data-t='17:00']").hide();
            }
        jQuery(".slot-softplay").show();
        cat = jQuery(this).data("ct");
    });

    jQuery(".activities button.btn-openjump").click(function () {
        jQuery(".activities").hide();
        jQuery(".slot-openjump .sb").show(); // Show all times by default
    
        if (ss === 1 || ss === 2) { // Monday, Tuesday
            jQuery(".slot-openjump .sb[data-t='16:00']").hide();
            jQuery(".slot-openjump .sb[data-t='16:30']").hide();
            jQuery(".slot-openjump .sb[data-t='17:00']").hide();
            jQuery(".slot-openjump .sb[data-t='17:30']").show();
        } else if (ss === 3) { // Wednesday
            jQuery(".slot-openjump .sb[data-t='15:30']").hide();
            jQuery(".slot-openjump .sb[data-t='16:00']").hide();
            jQuery(".slot-openjump .sb[data-t='16:30']").show();
            jQuery(".slot-openjump .sb[data-t='17:00']").show();
            jQuery(".slot-openjump .sb[data-t='17:30']").show();
        } else if (ss === 5) { // Friday
            jQuery(".slot-openjump .sb[data-t='17:00']").hide();
            jQuery(".slot-openjump .sb[data-t='17:30']").hide();
        } else if (ss === 4) { // Thursday
            jQuery(".slot-openjump .sb[data-t='17:30']").hide();
        }
    
        // Specific Dates
        if (sm === 8 && sd === 22) { // September 22nd
            jQuery(".slot-time .sb[data-t='15:30']").hide();
            jQuery(".slot-time .sb[data-t='16:00']").hide();
            jQuery(".slot-time .sb[data-t='16:30']").hide();
        }
    
        if (sm === 9 && sd === 29) { // October 29th
            jQuery(".slot-openjump .sb[data-t='16:30']").hide();
            jQuery(".slot-openjump .sb[data-t='17:00']").hide();
            jQuery(".slot-openjump .sb[data-t='17:30']").hide();
        }
    
        if (dte === '2023-10-31') { // October 31st
            jQuery(".slot-openjump .sb[data-t='17:30']").hide();
        }
    
       
    
        jQuery(".slot-openjump").show();
        cat = jQuery(this).data("ct");
    });
    

    jQuery("span.aug08").click(function () {
        jQuery(".activities").hide();
        //jQuery('.slot-time > div').hide();
        jQuery(".slot-openjump .sb[data-t='12:00']").hide();
        
        jQuery(".slot-openjump").show();
        cat = jQuery(this).data("ct");
    });

    jQuery(".activities button.btn-toddler").click(function () {
        jQuery(".activities").hide();
        //jQuery('.slot-time > div').hide();
        if(ss==6){
            jQuery(".slot-toddler .sb[data-t='10:00']").hide();
        } else {
            jQuery(".slot-toddler .sb[data-t='09:00']").hide();
        } 
        jQuery(".slot-toddler").show();
        cat = jQuery(this).data("ct");
    });

    jQuery(".activities button.btn-jfjump").click(function () {
        jQuery(".activities").hide();
        //jQuery('.slot-time > div').hide();
            if(ss==6){
                jQuery(".slot-jfjump .sb[data-t='16:00']").hide();
            } else {
                jQuery(".slot-jfjump .sb[data-t='10:00']").hide();
            }
        jQuery(".slot-jfjump").show();
        cat = jQuery(this).data("ct");
    });

    jQuery(".activities button.btn-ssession").click(function () {
        jQuery(".activities").hide();
        //jQuery('.slot-time > div').hide();
            if(ss==0){
                jQuery(".slot-ssession .sb[data-t='16:30']").hide();
            } else {
                jQuery(".slot-ssession .sb[data-t='09:00']").hide();
            }
        jQuery(".slot-ssession").show();
        cat = jQuery(this).data("ct");
    });

    jQuery(".activities button.btn-mbounce").click(function () {
        jQuery(".activities").hide();
        jQuery(".slot-mbounce .sb").show(); // Show all times by default
    
        if (dte === '2023-09-29') { // Specific date
            jQuery(".slot-mbounce .sb[data-t='18:00']").show();
            jQuery(".slot-mbounce .sb[data-t='19:00']").show();
        } else {
            jQuery(".slot-mbounce .sb[data-t='18:00']").hide();
            jQuery(".slot-mbounce .sb[data-t='19:00']").hide();
        }
    
        // Hide 5:00pm megabounce session on Fridays
        if (ss === 5) {
            jQuery(".slot-mbounce .sb[data-t='17:00']").hide();
        }
    
        jQuery(".slot-mbounce").show();
        cat = jQuery(this).data("ct");
    });
    

    jQuery(".activities button.btn-calmer").click(function () {
        jQuery(".activities").hide();
        //jQuery('.slot-time > div').hide();
        jQuery(".slot-calmer").show();
        cat = jQuery(this).data("ct");
    });

    var zid;
    var eid;
    jQuery(".activities button").click(function () {
        zid = jQuery(this).attr("data-ct");
        eid = jQuery(this).attr("data-eid");

        jQuery(".activities button").removeClass("selected");
        jQuery(this).toggleClass("selected");
    });

    jQuery(".sb").click(function () {
        var dt = jQuery(".flatpickr-input").val();
        var tm = jQuery(this).data("t");

        zid = jQuery(".selected")
            .map(function () {
                return jQuery(this).attr("data-ct");
            })
            .get();
        zid = zid.join("&category_id[]=");

        jQuery(".ev-d").show();

        //location.href = "https://bookedit.online/airbox-book/?date="+dt+"&start_time="+tm+"&category_id[]="+cat;
        location.href = "https://bookedit.online/airbox-book/?date=" + dt + "&start_time=" + tm + "&category_id[]="+zid+"&external_event_id=" + eid;
    });
});