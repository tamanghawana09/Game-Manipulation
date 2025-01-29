let currentSelection=[], totselbefUpgrade, people, maxpeople, kd, tppl, thistm, ss, selEtime, selStime, tme, title, loc, dte, ppl, zid, pid, pids;
let xmasPackage=false;

document.addEventListener('DOMContentLoaded', function(){
    const dropdownToggle=document.querySelectorAll(".dropdown-toggle"),
          btnGoBack=document.querySelector(".btn-goback"),
          dropdownMenuLinks=document.querySelectorAll(".dropdown-menu a"),
          noPeople=document.querySelector(".no_people"),
		  inputDate = document.getElementById('inputDate'),
          inputNumberAd=document.querySelector(".input-number.ad"),
          peopleDropdown=document.querySelector(".people-dropdown"),
		  continueToBookingButton = document.getElementById('membership');

    const venueLogic={
        aberdeen:function(selectedDates,dateStr,instance){console.log("Aberdeen selected date: "+dateStr);},
        altrincham:function(selectedDates,dateStr,instance){console.log("Altrincham selected date: "+dateStr);},
        leicester:function(selectedDates,dateStr,instance){
            console.log("Leicester selected date: "+dateStr);
            const date=selectedDates[0]; ss=selectedDates[0].getDay()+1;
            document.querySelectorAll('#item-times option').forEach(option=>option.style.display='block');
            document.querySelectorAll('.owl-item').forEach(item=>item.classList.remove('offtime'));
            if(ss>=2&&ss<=5){
                document.querySelectorAll(".timegroup a.btn-time").forEach(btn=>{
                    const sttime=parseInt(btn.getAttribute("data-stime"));
                    if(sttime<1500){btn.closest('.owl-item').classList.add('offtime');}
                });
            } else if(ss===1){
                document.querySelectorAll(".timegroup a.btn-time").forEach(btn=>{
                    const sttime=parseInt(btn.getAttribute("data-stime"));
                    if(sttime<100){btn.closest('.owl-item').classList.add('offtime');}
                });
            } else {
                document.querySelectorAll('.owl-item').forEach(item=>item.classList.remove('offtime'));
            }
            document.querySelector('.bowlandbowlagain-box').style.display='block';
            document.querySelector('.fbowling-box').style.display='block';
            if(ss>=2&&ss<=4){
                updateTimeAndPid(".bowling-time .btn-time small","£9.50/P<i class='ml-1 d-none'>P</i><i>erson</i>",".bowling-time a.category","101481635");
            } else if(ss===5){
                updateTimeAndPid(".bowling-time .btn-time small","£12.00/P<i class='ml-1 d-none'>P</i><i>erson</i>",".bowling-time a.category","101481636");
            } else if(ss===6){
                document.querySelector('.bowlandbowlagain-box').style.display='none';
                updateTimeAndPid(".bowling-time .btn-time small","£12.50/P<i class='ml-1 d-none'>P</i><i>erson</i>",".bowling-time a.category","101481637");
            } else if(ss===7){
                document.querySelector('.bowlandbowlagain-box').style.display='none';
                document.querySelector('.fbowling-box').style.display='none';
           } else {
                document.querySelector('.fbowling-box').style.display='none';
                updateTimeAndPid(".bowling-time .btn-time small","£10.00/P<i class='ml-1 d-none'>P</i><i>erson</i>",".bowling-time a.category","101481639");
           }
            const selDate=new Date(date).toLocaleDateString("en-GB");
            dte=document.querySelector(".flatpickr-input").value;
            document.querySelector("#booking-availability").dataset.date=dte;
            document.querySelector("#booking-availability").setAttribute("data-date",dte);
            
        }
    };


    // Prevent default action for dropdown toggle
    dropdownToggle.forEach(item=>item.addEventListener("click",function(e){e.preventDefault();}));

    // Go back button click handler
    if(btnGoBack){
        btnGoBack.addEventListener("click",function(e){
            e.preventDefault();
            document.querySelectorAll("div[id*='booking-step']").forEach(step=>step.style.display='none');
            document.querySelector("#booking-step-1").style.display='block';
        });
    }

    // Dropdown menu item click handler
    dropdownMenuLinks.forEach(item=>{
        item.addEventListener("click",function(e){
            e.preventDefault();
            this.closest(".dropdown").querySelector(".val").textContent=this.textContent;
            this.parentElement.querySelectorAll(".dropdown-item").forEach(sibling=>sibling.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Number of people change handler
    if(noPeople){
        noPeople.addEventListener("change",function(e){
            e.preventDefault();
            const val=this.value;
			people = val;
			maxpeople = people;
			if (people > 7) {
				maxpeople = 7;
			}
            //inputNumberAd.value=val;
            //peopleDropdown.click();
            if(val==="30"){window.location.href='/corporate-booking/';}
        });
    }
	// Check if the URL contains '/upsell or /membership'
    if (/\/(upsell|membership)/.test(window.location.pathname)) {
		// Attach the click event listener to the checkbox
		const availableStep1Button = document.getElementById('available-step-1');
		if (availableStep1Button  && !availableStep1Button.classList.contains('no-popup')) {
			availableStep1Button.addEventListener('click', function(event) {
				event.preventDefault(); // Prevent the default anchor click behavior
				showPopup('upsell'); // Show the popup
				//availableStep1Button.classList.add('no-popup'); 
			});
		}
		//const checkbox = document.getElementById('ten-pin-bowling');
		/*checkbox.addEventListener('click', function() {
			if (this.checked) {
				showPopup('upsell');
			}
		});*/
	}
	//Call the function on initial page load
	setupAvailableStepHandlers();
	if (continueToBookingButton) {
        continueToBookingButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor click behavior
            // Continue with the regular flow
			setupAvailableStepHandlers();			
        });
    }
});


jQuery(".item-times").on("change", function (e) {
    jQuery(".item-time").removeClass("selected-time");
    jQuery(this).toggleClass("selected-time");

    var thisTime = jQuery(".item-times option:selected").text();
    jQuery(".timegroup").each(function (index) {
        var tmeIndex = jQuery(this).find('.btn-time[time^="' + thisTime.slice(0,-3) + '"]').parent().index();
        jQuery(this).find(".owl-carousel").trigger("to.owl.carousel", tmeIndex);
    });
});

jQuery(document).ready(function($) {
    // Initialize Owl Carousel
	const $owlCarousel = jQuery(".timegroup .owl-carousel");
	if ($owlCarousel.length) {
		$owlCarousel.owlCarousel({
			loop:false,
			margin:20,
			stagePadding:0,
			dots:false,
			navText:[
				"<img src='https://roxy.bookedit.online/wp-content/themes/hello-theme-child/booked_it/images/icon-caret-left.svg' alt='Prev'/>",
				"<img src='https://roxy.bookedit.online/wp-content/themes/hello-theme-child/booked_it/images/icon-caret-right.svg' alt='Next'/>"
			],
			responsiveClass:true,
			responsive:{
				0:{items:3,nav:true,slideBy:"2"},
				600:{items:4,nav:false},
				1000:{items:5,nav:true,loop:false}
			}
		});
	} else {
        console.error("Owl Carousel element not found");
    }
});

//Initialize flatpickr
document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.href;
    const flatpickrInput = document.querySelector(".flatpickr-input");

    flatpickr(flatpickrInput, {
        altInput: true,
        altFormat: "d/m/Y",
        dateFormat: "Y-m-d",
        position: "auto center",
        locale: {
            firstDayOfWeek: 1 // start week on Monday
        },
        minDate: (url.indexOf('booking-christmas') >= 0) ? "2024-11-25" : "today",
        maxDate: (url.indexOf('booking-christmas') >= 0) ? "2024-12-24" : new Date().fp_incr(365),
        disableMobile: true,
        onChange: function(selectedDates, dateStr, instance) {
            const date = selectedDates[0];
			
            const ss = date.getDay() + 1;
            const dateFormatted = new Date(date).toLocaleDateString("en-GB");
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
			const day = String(date.getDate()).padStart(2, '0');
            
			dte = `${year}-${month}-${day}`;
			console.log(dte)
            document.querySelector('#item-times option').style.display = 'block';
            document.querySelectorAll('.owl-item').forEach(item => item.classList.remove('offtime'));

            const btnTimes = document.querySelectorAll(".timegroup a.btn-time");

            // Update prices and product IDs based on the selected day
			updatePricingAndPIDs(ss);

            // Update date attributes
            flatpickrInput.value = dateStr;
            const bookingInput = document.querySelector("#booking-availability");
            bookingInput.dataset.date = dateStr;
            bookingInput.setAttribute("data-date", dateStr);

            // Disable past times if needed
            disableTodayPastTime();

            // Call venue-specific logic if necessary
            const venue = "bowling"; // Replace with your logic to determine the venue
            //if (venueLogic[venue]) {
                //venueLogic[venue](selectedDates, dateStr, instance);
            //}
        }
    });



});

document.querySelectorAll('.btn-time').forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the parent .owl-carousel element
        const parentCarousel = this.closest('.owl-carousel');
        
        // Remove the 'selected' class from all .btn-time elements within the parent carousel
        parentCarousel.querySelectorAll('.btn-time').forEach(function(otherButton) {
            otherButton.classList.remove('selected');
        });

        // Add the 'selected' class to the clicked button
        this.classList.add('selected');
		disableOverlapping(this);
    });
});
document.getElementById('available-step-4').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor behavior

    let url = 'https://roxy.bookedit.online/book/?';
    const date = dte; // Example date, you can replace this with dynamic data if needed
    let selectedProducts = '';
    let zoneTimes = '';
	let productPpl=1;

    document.querySelectorAll('.btn-time.selected').forEach(function(selectedItem) {
        const category = selectedItem.getAttribute('category');
        const pid = selectedItem.getAttribute('pid');
        const time = selectedItem.getAttribute('time');
        const zoneId = selectedItem.closest('.owl-carousel').getAttribute('zone_id');
		const parentElement = selectedItem.closest('.timegroup');
		
		if (parentElement && parentElement.querySelector('h4') && parentElement.querySelector('h4').textContent.toLowerCase().includes('bowling')) {
			productPpl = people; 
		} else {
			productPpl=1
		}
        // Adding to URL parameters
        if (selectedProducts) {
            selectedProducts += `&selected_products[${pid}]=`+productPpl; 
        } else {
            selectedProducts = `selected_products[${pid}]=`+productPpl;
        }

        if (zoneTimes) {
            zoneTimes += `&zone_times[${zoneId}]=${time}`;
        } else {
            zoneTimes = `zone_times[${zoneId}]=${time}`;
        }
    });

    url += `date=${date}&${selectedProducts}&${zoneTimes}`;
    console.log(people)
	console.log(dte)
    // Redirect to the constructed URL
    window.location.href = url;
});

function setupAvailableStepHandlers() {
		//auto event triggered for each available-step except the last one
	document.querySelectorAll('[id^="available-step-"]').forEach(button => {
		button.addEventListener('click', function(event) {
			event.preventDefault(); // Prevent the default anchor click behavior
			
			const buttonId = this.id;
			const stepNumber = buttonId.split('-').pop(); // Extract the step number
			const currentStep = document.getElementById(`booking-step-${stepNumber}`);
			const nextStep = document.getElementById(`booking-step-${parseInt(stepNumber) + 1}`);
			const currentForm = document.getElementById(`step-${stepNumber}-form`);
			
			if (button.id !== 'available-step-4') {
				// Ensure the currentStep, nextStep, and currentForm elements exist
				if (!currentStep || !nextStep || !currentForm) {
					console.warn('One or more elements are missing:', { currentStep, nextStep, currentForm });
					return;
				}

				// Check if all fields in the current form are filled
				const allFieldsFilled = Array.from(currentForm.elements).every(input => input.value.trim() !== '');
				
				
				if (allFieldsFilled) {
					// Hide all steps
					document.querySelectorAll('[id^="booking-step-"]').forEach(step => {
						if (step && step.classList) {
							step.classList.add('d-none');
						}
					});
					
					// Show the next step
					if (nextStep && nextStep.classList) {
						nextStep.classList.remove('d-none');
					}
					if (button.id == 'available-step-3') {
						const checkedCheckboxes = Array.from(document.querySelectorAll('input[name="activities[]"]:checked'));
						// Iterate over each checked checkbox
						document.querySelectorAll('.timegroup').forEach(group => {
							group.style.display = 'none';
						});
						jQuery("#booking-availability").zoneAvailability();
						checkedCheckboxes.forEach(checkbox => {
							// Get the title attribute, convert to lowercase, replace spaces with dashes
							let title = checkbox.getAttribute('data-title').toLowerCase().replace(/\s+/g, '-');
							console.log(title)

							// Show only the time classes that start with the modified title
							document.querySelectorAll(`.timegroup.${title}-time`).forEach(group => {
								group.style.display = 'block';
								//group.classList.remove('d-none');
							});
						});
					} else if(button.id == 'available-step-2'){
						// Get values from the form fields
						console.log(dte)
						console.log(maxpeople)
						//inputDate.value;
						//const itemTimes = document.getElementById('item-times').value;
						updateBowling(".ten-pin-bowling-time",maxpeople,people)
						console.log(`Date: ${dte}, No. of People: ${maxpeople}`);
						
					} else{
					
					}
				} else {
					alert('Please fill in all fields before proceeding.');
				}
			}
		});
	});
}
// Helper function to update time and PID
function updateTimeAndPid(selectorSmall,newText,selectorCategory,newPid){
    document.querySelector(selectorSmall).innerHTML=newText;
    document.querySelector(selectorCategory).setAttribute("pid",newPid);
}

// Helper function to disable past time on the current day
function disableTodayPastTime(){
  const inputValue = document.getElementById('inputDate').value;
  const [year, month, day] = inputValue.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const now = new Date();
  const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false };
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
  const timeLinks = document.querySelectorAll('a.btn-time');
  if (selectedDate && selectedDate.toDateString() === today.toDateString()) {
      timeOptions.forEach(option => { option.style.display = ''; option.disabled = false; });
	 timeLinks.forEach(link => { link.style.pointerEvents = 'auto'; link.style.opacity = 1; link.closest('.owl-item').classList.remove('offtime'); });

	const currentTime = today.getHours() * 60 + today.getMinutes();
    timeOptions.forEach(option => {
      const [hours, minutes] = option.textContent.split(':').map(Number);
      const optionTime = hours * 60 + minutes;
      if (optionTime < currentTime) { option.style.display = 'none'; option.disabled = true; }
    });
    timeLinks.forEach(link => {
      const [hours, minutes] = link.getAttribute('time').split(':').map(Number);
      const linkTime = hours * 60 + minutes;
      if (linkTime < currentTime) { link.closest('.owl-item').classList.add('disabletime'); link.style.pointerEvents = 'none'; }
    });
  }
}

// Helper function to update prices and PIDs based on the selected day
function updatePricingAndPIDs(day) {
	const commonPricesWeekdays = {
    "ten-pin-bowling": "£10",
    "american-pool": "£18.00",
    "crazy-pool": "£8.00",
    "shuffleboard": "£20.00",
    "bank-shuffleboard": "£20.00",
    "ping-pong": "£16.00",
    "beer-pong": "£20.00",
	};

	const commonIdsWeekdays = {
		"ten-pin-bowling-id": "112086860",
		"american-pool-id": "112086861",
		"crazy-pool-id": "112086862",
		"shuffleboard-id": "112086863",
		"bank-shuffleboard-id": "112086864",
		"ping-pong-id": "112086865",
		"beer-pong-id": "112086865",
	};

	const commonPricesWeekend = {
		"ten-pin-bowling": "£12",
		"american-pool": "£20.00",
		"crazy-pool": "£10.00",
		"shuffleboard": "£22.00",
		"bank-shuffleboard": "£22.00",
		"ping-pong": "£18.00",
		"beer-pong": "£25.00",
	};

	const commonIdsWeekend = {
		"ten-pin-bowling-id": "112086867",
		"american-pool-id": "112086868",
		"crazy-pool-id": "112086869",
		"shuffleboard-id": "112086870",
		"bank-shuffleboard-id": "112086871",
		"ping-pong-id": "112086872",
		"beer-pong-id": "112086873",
	};

	const pricingMap = {
		2: { ...commonPricesWeekdays, ...commonIdsWeekdays },
		3: { ...commonPricesWeekdays, ...commonIdsWeekdays },
		4: { ...commonPricesWeekdays, ...commonIdsWeekdays },
		5: { ...commonPricesWeekdays, ...commonIdsWeekdays },
		6: { ...commonPricesWeekend, ...commonIdsWeekend },
		7: { ...commonPricesWeekend, ...commonIdsWeekend },
		1: { ...commonPricesWeekend, ...commonIdsWeekend },
	};

	const pricing = pricingMap[day];
	//console.log(pricing);
	if (pricing){
		for (let key in pricing) {
			if (key.endsWith('-id')) {
				// Extract the base name by removing '-id' from the key and adding '-time'
				const baseName = key.slice(0, -3) + '-time';				
				const categoryElements = document.querySelectorAll(`.${baseName} a.category`);
				if (categoryElements.length > 0) {
					// Set the ID attribute dynamically
					//categoryElement.setAttribute("pid", pricing[key]);
					categoryElements.forEach((categoryElement, index) => {
						// Set the ID attribute dynamically for each element
						categoryElement.setAttribute("pid", pricing[key]);
						//console.log(`PID set for ${baseName} [Element ${index}]: ${pricing[key]}`);
					});
				} else {
					console.error(`Element with class ${baseName} not found for key ${key}`);
				}
			} else {
				// Add '-time' to the key to form the correct class name
				const priceClass = `${key}-time`;
				
				const priceElements = document.querySelectorAll(`.${priceClass} .btn-time small`);
				if (priceElements.length > 0) {
					// Set the price dynamically
					//priceElement.innerHTML = pricing[key] + "/P<i class='d-block d-sm-none mobile-only'>P</i><i>erson</i>";
					priceElements.forEach((priceElement, index) => {
						// Set the ID attribute dynamically for each element
						priceElement.innerHTML = pricing[key] + "/P<i class='ml-1 d-none'>P</i><i>erson</i>";
					});
				} else {
					console.error(`Element with class ${priceClass} not found for key ${key}`);
				}
			}
		}
	}

}

//while selecting time, disable overlapping time on ther gamne's time
function disableOverlapping(currItem) {
    var selectedTimes = [];

    // Collect start and end times from selected items
    document.querySelectorAll(".btn-time.selected").forEach(function(item) {
        selectedTimes.push({ 
            start: item.getAttribute("data-stime"), 
            end: item.getAttribute("data-etime") 
        });
    });

    // Iterate over non-selected items and disable overlapping times
    document.querySelectorAll(".btn-time:not(.selected)").forEach(function(item) {
        var startTime = item.getAttribute("data-stime");
        var endTime = item.getAttribute("data-etime");

        item.classList.remove("disable-time");

        selectedTimes.forEach(function(time) {
            if (startTime == time.start ||
                (startTime > time.start && startTime < time.end) ||
                (endTime > time.start && endTime <= time.end) ||
                (startTime < time.start && endTime > time.end)) {
                item.classList.add("disable-time");
            }
        });
    });
}

//show popup for packages and membership
function showPopup(popupId) {
		var popup = document.getElementById(popupId);
		var closeBtn = popup.querySelectorAll(".close-btn,#membership");
		var body = document.body; // get the body element

		// Open the popup when the button is clicked
		popup.style.display = "block";
		body.classList.add("popup-open"); // add class to body
		
		// Close the popup when the close button is clicked
			closeBtn.forEach(item=>{
				item.addEventListener("click",function(e){
					e.preventDefault();
				   popup.style.display = "none";
					body.classList.remove("popup-open"); // remove class from body
				});
			});		
		
		// Close the popup when clicking outside the popup content
		window.addEventListener("click", function(event) {
			if (event.target == popup) {
				popup.style.display = "none";
				body.classList.remove("popup-open"); // remove class from body
			}
		});
}

function updateBowling(gameTwrapper,maxpeople,noPeople){
	// Iterate over each element with the class "btn-time" within elements with the class "bowling-time"
	console.log(gameTwrapper+" a.btn-time");
	document.querySelectorAll(gameTwrapper+" a.btn-time").forEach(function(element) {
		const eachtime = element.querySelector("span.time-duration:first-child");
		console.log(eachtime);
		const thistm = element.getAttribute("time");
		const timeDuration = parseInt(maxpeople * 10, 10);
		const endtime = addMinutes(thistm, timeDuration);
		const eachtimeTxt = eachtime.textContent;

		// If the time text length is less than 6, append the end time
		if (eachtimeTxt.length < 6) {
			eachtime.textContent += " - " + endtime;
		}

		// Set the data-etime attribute to the calculated end time
		element.setAttribute("data-etime", endtime.replace(":", ""));
		element.setAttribute("data-tdiff", maxpeople * 10);
		element.dataset.tdiff = maxpeople * 10;
	});
	document.querySelectorAll(gameTwrapper+" .owl-carousel").forEach(function(element) {
		const lengthValue = maxpeople * 10;
		const neededValue = Math.ceil(noPeople / 7);
		
		element.setAttribute("data-length", lengthValue);
		element.dataset.length = lengthValue;
		
		element.setAttribute("data-needed", neededValue);
		element.dataset.needed = neededValue;
	});
}
// Function to add minutes to a given time
function addMinutes(time, minsToAdd) {
    function D(J) {
        return (J < 10 ? "0" : "") + J;
    }

    const piece = time.split(":");
    const mins = parseInt(piece[0], 10) * 60 + parseInt(piece[1], 10) + parseInt(minsToAdd, 10);

    return D(Math.floor((mins % (24 * 60)) / 60)) + ":" + D(mins % 60);
}