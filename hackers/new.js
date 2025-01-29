jQuery(".btn-time").on("click", function (e) {
    e.preventDefault();
    var stm = jQuery(".btn-time.selected").attr("time");
    thistm = jQuery(this).attr("time");
    selEtime = jQuery(this).data("etime");
    selStime = jQuery(this).data("stime");
    //var selDtime = jQuery(this).data("tdiff");
    var currItem = jQuery(this);

    if (!currItem.hasClass("selected")) {
        var peopleValue = parseFloat(jQuery(this).find('.form-control').val());
        if (peopleValue <= 0) {
            alert("Please select number of people");
            e.preventDefault();
            return false;
        }
        var adultValue = parseFloat(jQuery(this).find('.option_select input[name="adult"]').val());
    if (adultValue <= 0) {
        alert("Please select a value greater than 0");
        e.preventDefault();
        return false;
    }
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

if (jQuery(this).hasClass("selected") && jQuery(this).find('.form-control').length > 0) {
    var peopleValue = parseFloat(jQuery(this).find('.form-control').val());
    if (peopleValue <= 0) {
        alert("Please select number of people");
        e.preventDefault();
        return false;
    }
}
if (jQuery(this).hasClass("selected") && jQuery(this).find('.option_select input[type="number"]').length > 0) {
    var adultValue = parseFloat(jQuery(this).find('.option_select input[name="adult"]').val());
    if (adultValue <= 0) {
        alert("Please select a value greater than 0");
        e.preventDefault();
        return false;
    }
}