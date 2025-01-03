if ( currentSelection.indexOf("Music Quiz") >= 0  ) {
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