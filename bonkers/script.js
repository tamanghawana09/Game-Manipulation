jQuery(document).ready(function () {

    var ad,ya;
    var tppl,ss,tme,tme2,catid;
    
    jQuery(".dropdown-toggle").on("click", function (e) {
        e.preventDefault();
    });

    jQuery(".dropdown-menu a").on("click tap", function (e) {
        e.preventDefault();
        jQuery(this).siblings(".dropdown-item").removeClass("active");
        jQuery(this).addClass("active");

        var val = jQuery(this).text();

        jQuery(this).closest(".dropdown").find(".val").text(val);
        jQuery("#main-title h3").text("Book Now");
    });

    // triggers when clicking done on time dropdown
    jQuery(".dp2_people div").on("click", function (e) {
        e.preventDefault();
        ad = parseInt(jQuery(".ad").val());
        //ya = parseInt(jQuery(".ya").val());
        //tppl = ad + ya + kd;
        let tppl = ad;
        var label;
        if(tppl == 1){
            label = ' Person';
        } else {
            label = ' People';
        }
        
        var val = tppl + label;
        jQuery(this).closest(".dropdown").find(".val").text(val);
        
    });
    
    jQuery(".dp2_people input").on("input", function (e) {
        e.preventDefault();
        ad = parseInt(jQuery(".ad").val());
        //ya = parseInt(jQuery(".ya").val());
        ya = 0;
        
        let tppl = ad;
        var label;
        if(tppl == 1){
            label = ' Person';
        } else {
            label = ' People';
        }
        
        var val = tppl + label;
        jQuery(this).closest(".dropdown").find(".val").text(val);
        
    });
    
    // trigger input on clicking sbg icon
    jQuery(".flatpickr-date svg").on("click", function (e) {
        e.preventDefault();
        jQuery(".flatpickr-input").click();
    });

    //triggers on book now btn on search
    jQuery("#check_available").on("click", function (e) {
        var loc = jQuery("#dp2_loc .val").text();
        var dte = jQuery(".booking-date").val();
        var tme = jQuery("#dp2_time .val").text();
        var ppl = jQuery("#dp2_people .val").text();
        var pg = jQuery(".dm2_time .active").attr("page");
        var pg = 1;

        ad = parseInt(jQuery(".ad").val());
        //ya = parseInt(jQuery(".ya").val());
        tppl = ad;

        /* if (loc != "" && loc != "Select Location" && dte != "" && tme != "" && tme != "Time" && tppl != "") { */
        
        if (loc != "" && loc != "Select Location" && dte != "" && tppl != "") {
            jQuery("section[id*='step']").hide();
            jQuery(".search-alert").hide();

            jQuery(".box-loc span").text(jQuery("#dp2_loc .val").text());
            jQuery(".box-date span").text(jQuery.datepicker.formatDate("dd/mm/yy", new Date(jQuery(".booking-date").val())));
            //jQuery(".box-time span").text(jQuery("#dp2_time .val").text());
            jQuery(".box-people span").text(jQuery("#dp2_people .val").text());
            
            var venue_id = jQuery('#dp2_loc').data('venue_id');
            jQuery(".ct-time-slide").attr('data-venue_id',venue_id);
            jQuery(".ct-time-slide").attr('data-date',dte);
            jQuery(".ct-time-slide").attr('data-people',tppl);
        
            jQuery(".box-col-time a").removeClass("active");
            // jQuery("a[data-time='" + tme + "']").addClass("active");
            jQuery(".ct-page").hide();
            
            // jQuery("a[data-time='" + tme + "']").parents('.ct-page').show();
            jQuery(".page-" + pg).show();
            jQuery(".ct-time-slide").data("p", pg);
            if(pg==1){
                jQuery('.box-col-time-pre').addClass("disable");
                jQuery('.box-col-time-nxt').removeClass("disable");
            }

            jQuery("#main-title").hide();
            jQuery("#step3-choosetime").find('.ct-time-slide').data('date', jQuery(".booking-date").val());
            jQuery("#step3-choosetime").find('.ct-time-slide').availability();
            jQuery("#step3-choosetime").show();
            
            console.log('people:'+jQuery(".ct-time-slide").data('people'));
            
            if(tppl > 16){
                jQuery("#btn-enquire").show();
                jQuery(".book_holes").hide();
            } else {
                jQuery("#btn-enquire").hide();
                jQuery(".book_holes").show();
            }
            
            jQuery(".pizza-time").hide();

        } else {
            jQuery(".search-alert").show();
        }
        
        const elements = document.querySelectorAll('[data-time]');

        if( dte == '2024-11-01' ){
            
            elements.forEach((element) => {
              const time = element.getAttribute('data-time');
              if (time >= "11:00" && time <= "15:00") {
                element.classList.remove('disabled-availability');
                element.classList.add('enable-availability');
              }
            });

        }
    });

    // time box, on time selection
    jQuery(".ticket-time .box-col-time a").on("click", function (e) {
        jQuery(".box-col-time a").removeClass("active");
        jQuery(this).addClass("active");
        tme = jQuery(this).data('time');
        //jQuery(".box-time span").text(tme);
        catid = jQuery(this).attr('category');
        
        //jQuery(".pizza-time").show();
        //jQuery(".ticket-time").hide();
        //jQuery("#choose-title h3").text("Choose Pizza Time");
        jQuery(".book_holes").show();
		
        jQuery('html, body').animate({
            scrollTop: jQuery(".book_holes").offset().top - 300
        }, 2000);

    });
    
    jQuery(".pizza-time .box-col-time a").on("click", function (e) {
        jQuery(".box-col-time a").removeClass("active");
        jQuery(this).addClass("active");
        tme2 = jQuery(this).data('time');
        //jQuery(".box-time span").text(tme);
        catid = catid + ',' + jQuery(this).attr('category');
        
        jQuery(".book_holes").show();

    });

    // book holes btn after time selection
    jQuery(".book_holes a").on("click", function (e) {
        e.preventDefault();
        var dt = jQuery(".booking-date").val();
        
        if(tme){
            jQuery('.time-alert').hide();
            location.href = 'https://bookedit.online/bonkers-minigolf-book/?date='+dt+'&category_id='+catid+'&people='+tppl+'&start_time='+tme;  
        } else {
            jQuery('.time-alert').show();
        }
    });

    jQuery(".btn-backto").on("click", function (e) {
        jQuery("section[id*='step']").hide();
        if (jQuery(this).hasClass("totime")) {
            jQuery("#step3-choosetime").show();
        } else {
            jQuery("#step2_datentime").show();
        }
    });

    jQuery(".input-number-increment").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        jQuery(".dropdown-pp").addClass("open");
        var $input = jQuery(this).parents(".input-number-group").find(".input-number");
        var val = parseInt($input.val(), 10);
        if( val < 16){
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
    
    jQuery(".ct-arrow").click(function () {
        var ct = jQuery(this).siblings(".ct-page").length;
        var p = parseInt(jQuery(this).parents(".ct-time-slide").data("p"));
  
        jQuery(this).parents(".ct-time-slide").find(".ct-arrow").removeClass("disable");
        if (jQuery(this).hasClass("box-col-time-pre")) {
            if (p > 1) {
                var q = p - 1;
                jQuery(this).parents(".ct-time-slide").data("p", q);
                jQuery(this).siblings(".ct-page").hide();
                jQuery(this).siblings(".page-" + q).show();
            }
        } else {
            if (p < ct) {
                var q = p + 1
                jQuery(this).parents(".ct-time-slide").data("p", q);
                jQuery(this).siblings(".ct-page").hide();
                jQuery(this).siblings(".page-" + q).show();
            }
        }
        if(q==1){
            jQuery(this).siblings('.box-col-time-pre').addClass("disable");
        } else if(q==ct){
            jQuery(this).siblings('.box-col-time-nxt').addClass("disable");
        } else {
        }

    });

});

jQuery(".flatpickr-input").flatpickr({
    altInput: true,
    altFormat: "Y-m-d",
    //defaultDate: default_date,
    //inline: true,
    dateFormat: "Y-m-d",
    position: "auto center",
    locale: {
        firstDayOfWeek: 1, // start week on Monday
    },
    disable: [
        function(date) {
            d = new Date(date).toLocaleDateString();
			//console.log(d)
			if( d ==="12/25/2024" || d ==="25/12/2024" ){
				return true;
			} else if( new Date(date) >= new Date('2025/02/17') && new Date(date) <= new Date('2025/02/23') && (date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 4) ){
				return false;
            } else if( new Date(date) >= new Date('2025/04/07') && new Date(date) <= new Date('2025/04/27') || new Date(date) >= new Date('2025/05/26') && new Date(date) <= new Date('2025/06/01') || new Date(date) >= new Date('2025/07/14') && new Date(date) <= new Date('2025/09/03') ){
				return false;
            } else if( new Date(date) >= new Date('2024/12/23') && new Date(date) <= new Date('2024/12/31') || new Date(date) >= new Date('2025/01/02') && new Date(date) <= new Date('2025/01/05') ){
                return false;
            }else if(d === "05/05/2025" || d === "5/5/2025"){
                return false;
            } else {
                return (date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 4);
            }
        },
    ],
    minDate: "today",
    maxDate: "2025-09-03",
    disableMobile: "true",
    onChange: function (selectedDates, dateStr, instance) {
        sday = selectedDates[0].getDay();
        sday = sday + 1;
        date = selectedDates[0];
        var selDate = new Date(date).toLocaleDateString('en-GB');

        dt = jQuery(".booking-date").val();
        jQuery('.dm2_time a').show();
        jQuery('.box-col-time a').removeClass('disable-time');
        console.log(sday);
        
        jQuery(".pizza-time .category").removeClass('disable-time');
        if( new Date(date) > new Date('2025-02-17') && new Date(date) > new Date('2025-02-23') ){

            jQuery(".pizza-time .category[data-time=10:00]").addClass('disable-time');
            jQuery(".pizza-time .category[data-time=10:20]").addClass('disable-time');
            jQuery(".pizza-time .category[data-time=10:40]").addClass('disable-time');

            if (sday == 6 || sday == 7){
            	jQuery(".pizza-time .category[data-time=22:00]").addClass('disable-time');
            } else {
				jQuery(".pizza-time .category[data-time=20:00]").addClass('disable-time');
				jQuery(".pizza-time .category[data-time=20:20]").addClass('disable-time');
				jQuery(".pizza-time .category[data-time=20:40]").addClass('disable-time');
				jQuery(".pizza-time .category[data-time=21:00]").addClass('disable-time');
				jQuery(".pizza-time .category[data-time=21:20]").addClass('disable-time');
				jQuery(".pizza-time .category[data-time=21:40]").addClass('disable-time');
            }
            
        }else if(selDate === "05/05/2025" || selDate === "5/5/2025"){
            // Enable only the time range 11:00 AM - 7:40 PM
            jQuery(".pizza-time .category").removeClass('disable-time'); // Enable all
            jQuery(".pizza-time .category[data-time='10:00']").addClass('disable-time');  // Disable earlier slots
            jQuery(".pizza-time .category[data-time='10:20']").addClass('disable-time');
            jQuery(".pizza-time .category[data-time='10:40']").addClass('disable-time');
            jQuery(".pizza-time .category[data-time='19:40']").show();  // Ensure 7:40 PM is shown
            jQuery(".pizza-time .category[data-time='20:00']").addClass('disable-time');  // Disable any slots after 7:40 PM
        } else if( new Date(date) > new Date('2025-04-07') && new Date(date) > new Date('2025-04-27') ){
            
        } else {
            if (sday == 6){       
            } else if(sday == 7){
            } else if(sday == 1){  
            }
        }

    }
});

jQuery( document ).on( 'elementor/popup/show', () => {
    
    var loc = jQuery("#dp2_loc .val").text();
    var dte = jQuery(".booking-date").val();
    var tme = tme = jQuery('a.category.active').data('time');
    
    var ad = parseInt(jQuery(".ad").val());
    //var ya = parseInt(jQuery(".ya").val());
    tppl = ad;
    
    jQuery(".fguests").val(tppl);
    jQuery(".fdate").val(dte);
    jQuery(".ftime").val(tme);
    jQuery(".flocation").val(loc);
    
});