let currentSelection=[], totselbefUpgrade, noPeople, people, kidsno, maxpeople, kd, tppl, thistm, ss, sday, selectedActTime, daytype, holidaytype, selEtime, selStime, tme, title, loc, dte, ppl, zid, pid, pids;



let xmasPackage=false;



document.addEventListener('DOMContentLoaded', function(){



    const dropdownToggle=document.querySelectorAll(".dropdown-toggle"),

          btnGoBack=document.querySelector(".btn-goback"),

          btnGoBackstep3=document.querySelector(".btn-goback-step3"),

          dropdownMenuLinks=document.querySelectorAll(".dropdown-menu a"),

		  inputDate = document.getElementById('inputDate'),

          inputNumberAd=document.querySelector(".input-number.ad"),

          peopleDropdown=document.querySelector(".people-dropdown");

          peopleDropdownbtn=document.querySelector(".dp_people button");





    // Prevent default action for dropdown toggle



    dropdownToggle.forEach(item=>item.addEventListener("click",function(e){e.preventDefault();}));



    // Go back button click handler



    if(btnGoBack){



        btnGoBack.addEventListener("click",function(e){

            e.preventDefault();

            document.querySelectorAll("div[id*='booking-step']").forEach(step=>step.style.display='none');

                document.querySelector("#booking-step-2").style.display='block';

                document.querySelector("#booking-step-2").classList.remove("d-none");

        });



    }



    if(btnGoBackstep3){



        btnGoBackstep3.addEventListener("click",function(e){

            e.preventDefault();

            document.querySelectorAll("div[id*='booking-step']").forEach(step=>step.style.display='none');

                console.log(this.classList);

                document.querySelector("#booking-step-3").style.display='block';

                document.querySelector("#booking-step-3").classList.remove("d-none");

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



    peopleDropdownbtn.addEventListener("click",function(e){

        e.preventDefault();

        

        const adult = parseInt(document.querySelector(".ad").value);

        const kids = parseInt(document.querySelector(".kd").value);

        const dca = parseInt(document.querySelector(".dca").value);



        people = adult+kids+dca;

        maxpeople = people;

        

        // Validation: Ensure at least 1 adult is selected

        if (people < 1) {

            alert("At least 1 person is required.");

            return; // Stop further execution if validation fails

        }

        

        let label = '';

        label = (people == 1)? " Person":" People";

        const val = people + label;



        this.closest(".dropdown").querySelector(".val").textContent= val;



        if (people >= 30) {

            window.location.href='/corporate-booking/';

        }



    });





	// Check if the URL contains '/upsell or /membership'

    if (/\/(upsell|membership)/.test(window.location.pathname)) {

		// Attach the click event listener to the checkbox

		const checkbox = document.getElementById('ten-pin-bowling');



		checkbox.addEventListener('click', function() {

			if (this.checked) {

				showPopup('upsell');

			}

		});

	}



	if (/\/(home|index|)/.test(window.location.pathname)) {

      // Attach the click event listener to the button

      const button = document.getElementById('available-step-4'); // replace with your button's ID

      const checkbox = document.getElementById('tables');



      /*button.addEventListener('click', function() {

        showPopup('upsell');

      });*/



      checkbox.addEventListener('click', function() {

		if (this.checked) {

			showPopup('table_upsell');

		}

      });



    }



    const bowlingCheckbox = document.getElementById('bowling');

    const bowlingFamilyCheckbox = document.getElementById('bowling_family');



    bowlingCheckbox.addEventListener('click', function() {

        if (this.checked) {

            bowlingFamilyCheckbox.disabled = true;

            document.querySelector('label[for="bowling_family"]').classList.add('disable-box');

			document.querySelector('.familydeal-box').classList.add('disable-box');

        } else {

            bowlingFamilyCheckbox.disabled = false;

             document.querySelector('label[for="bowling_family"]').classList.remove('disable-box');

			 document.querySelector('.familydeal-box').classList.remove('disable-box');

        }



    });



    bowlingFamilyCheckbox.addEventListener('click', function() {



        if (this.checked) {

            bowlingCheckbox.disabled = true;

            document.querySelector('label[for="bowling"]').classList.add('disable-box');

			document.querySelector('.bowling-box').classList.add('disable-box');

        } else {

            bowlingCheckbox.disabled = false;

            document.querySelector('label[for="bowling"]').classList.remove('disable-box');

			document.querySelector('.bowling-box').classList.remove('disable-box');

        }



    });



});



//Auto event triggered for each available-step except the last one



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

			

            const excludedNames = ['button1', 'button2', 'bowling', 'bowling_family', 'darts','pool', 'shuffleboard'];

            const filteredcurrentForm = Array.from(currentForm.elements).filter(element => !excludedNames.includes(element.name));

            

            // Get the value of the .people-toggle button & .item-times select

            const peopleToggleValue = document.querySelector('.people-toggle .val').innerText.trim();

            const itemTimesValue = document.querySelector('.item-times').value.trim();

            

            //console.log('filtered'+filteredcurrentForm);

			// Check if all fields in the current form are filled



			//const allFieldsFilled = Array.from(filteredcurrentForm).every(input => input.value.trim() !== '');

			const allFieldsFilled = Array.from(filteredcurrentForm).every(input => input.value.trim() !== '') &&

                        peopleToggleValue !== 'NO. OF PEOPLE' &&

                        itemTimesValue !== 'Select Time';





            const step2FieldsFilled = Array.from(document.querySelectorAll('input[name="activities[]"]:checked')).every(input => {

                const select = input.closest('.game-panel').querySelector('select');

                return select ? select.value : true; // Return true if select is not found

            });

			



			if (allFieldsFilled && step2FieldsFilled ) { 

				// Hide all steps

				document.querySelectorAll('[id^="booking-step-"]').forEach(step => {

					if (step && step.classList) {

						step.classList.add('d-none');

					}

				});



				// Show the next step

				if (nextStep && nextStep.classList) {

					nextStep.classList.remove('d-none');

					nextStep.style.display='block';

				}



				if (button.id == 'available-step-3') {



					const checkedCheckboxes = Array.from(document.querySelectorAll('input[name="activities[]"]:checked'));



					// Iterate over each checked checkbox

					document.querySelectorAll('.timegroup').forEach(group => {

						group.style.display = 'none';

					});




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


                    
					jQuery("#booking-availability").zoneAvailability();



				} else if(button.id == 'available-step-2'){



					// Get values from the form fields

                    const adult = parseInt(document.querySelector(".ad").value);

                    const kids = parseInt(document.querySelector(".kd").value);



                    if(adult == 2 && kids == 2 ){

                        document.querySelector('.familydeal-box').classList.add('family-four');

                    } else if(adult == 4 && kids == 4 ){

                        document.querySelector('.familydeal-box').classList.add('family-eight');

                    } else {

                        document.querySelector('.familydeal-box').style.display = 'none';

                    }

                    

                    // Check for specific dates

                    const specificDates = ['2025-01-01', '2025-04-18', '2025-04-21', '2025-05-05', '2025-05-26', '2025-08-25', '2025-12-25', '2025-12-26'];

                    // Check for Saturdays & Friday

                    if ((sday === 7 || specificDates.includes(dte)) || (sday === 6 && selectedActTime >= 1800)) {

                        setBowlPrices('£8.00', '£5.50', '£22.50');

                    }


                   
					console.log(`Date: ${dte}, No. of People: ${maxpeople}`);



				} else {



				}



			} else {



				alert('Please fill in all fields before proceeding.');



			}



		}



    });



});



jQuery(".item-times").on("change", function (event) {



    event.preventDefault(); // Prevent the default anchor click behavior



    jQuery(".item-time").removeClass("selected-time");

    jQuery(this).toggleClass("selected-time");

    

    selectedActTime = this.value;



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

				"<img src='https://larryslanes.bookedit.online/wp-content/themes/hello-theme-child/booked_it/images/icon-caret-left.svg' alt='Prev'/>",

				"<img src='https://larryslanes.bookedit.online/wp-content/themes/hello-theme-child/booked_it/images/icon-caret-right.svg' alt='Next'/>"

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

            sday = date.getDay() + 1;



            const dateFormatted = new Date(date).toLocaleDateString("en-GB");



            const year = date.getFullYear();

            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1

            const day = String(date.getDate()).padStart(2, '0');



            dte = `${year}-${month}-${day}`;



            daytype = (sday === 1 || sday === 7) ? 'weekend' : 'weekday';



            console.log('date: '+sday);



            const holDates = ['2025-01-01', '2025-04-18', '2025-04-21', '2025-05-05', '2025-05-26', '2025-08-25', '2025-12-25', '2025-12-26'];



            holidaytype = ( holDates.includes(dte) ) ? 'holidays' : 'usualdays';



            console.log('holidaytype '+holidaytype);



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



function setBowlPrices(adlPrice, chlPrice, fmlPrice) {

    const bowlAdlPriceElement = document.querySelector('.bowlAdlPrice');

    const bowlChlPriceElement = document.querySelector('.bowlChlPrice');

    const bowlFmlPriceElement = document.querySelector('.bowlFmlPrice');

    

    bowlAdlPriceElement.textContent = adlPrice;

    bowlChlPriceElement.textContent = chlPrice;

    bowlFmlPriceElement.textContent = fmlPrice;

}



document.addEventListener('DOMContentLoaded', function() {

    

    const specificDates = ['2024-12-24', '2024-12-26', '2024-12-31', '2025-01-01'];
  

    // Get the select element

    const bowlingSelect = document.querySelector('select[name="bowling"]');





    // Add an event listener to the select element

    bowlingSelect.addEventListener('change', function() {



        // Get the selected value

        const selectedValue = bowlingSelect.value;
        
        const adultInput = document.querySelector('.input-number.ad');
        const kidInput = document.querySelector('.input-number.kd');
        const inputDate = dte;

        const btnTime = document.querySelectorAll('.bowling-time .btn-time');



        // Update the pid attribute based on the selected value



        if (selectedValue === '1') {

            

            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);

                

                // Peak IDs

                if ( holidaytype == 'holidays' || sday === 7 ) {

                    btn.setAttribute('pid', '118687037'); // adult id

                    btn.setAttribute('cid', '118687182'); // child id

                } else if( sday === 6 ) {

                    // Check if stime is equal to or greater than 1800

                    if (stime >= 1800) {

                        btn.setAttribute('pid', '118687037'); // adult id

                        btn.setAttribute('cid', '118687182'); // child id

                    }

                } else {

                    btn.setAttribute('pid', '118686796'); // adult id

                    btn.setAttribute('cid', '118687182'); // child id

                }

                

                btn.setAttribute('dcaid', '121597514'); // Default dcaid 

            });



            updateBowling(".bowling-time",maxpeople,people,10)



        } else if (selectedValue === '2') {



            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);

                

                // Peak IDs

                if ( holidaytype == 'holidays' || sday === 7 ) {

                    btn.setAttribute('pid', '118688024'); // adult id

                    btn.setAttribute('cid', '118688026'); // child id

                } else if( sday === 6 ) {

                    // Check if stime is equal to or greater than 1800

                    if (stime >= 1800) {

                        btn.setAttribute('pid', '118688024'); // adult id

                        btn.setAttribute('cid', '118688026'); // child id

                    }

                } else {

                    btn.setAttribute('pid', '118688023'); // adult id

                    btn.setAttribute('cid', '118688025'); // child id

                }

                

                btn.setAttribute('dcaid', '121597630'); // Default dcaid 

            });

            

            //20min pe person

            updateBowling(".bowling-time",maxpeople,people,20)



        } else {



            btnTime.forEach(btn => {

                btn.setAttribute('pid', '118686796'); // Default adult id

                btn.setAttribute('cid', '118687182'); // Default child

                btn.setAttribute('dcaid', '121597514'); // Default dcaid

            });



        }
                
       
                if (selectedValue === '1' && adultInput) {

                    btnTime.forEach(btn =>{

                        const inputDate = document.getElementById('inputDate').value;

                        console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
                
                        // Check if the input date is in 'YYYY-MM-DD' format
                        if (inputDate.includes('-')) {

                            console.log('Date already in correct format');

                            const formattedDate = inputDate; 

                                    console.log('Formatted inputDate:', formattedDate);

                            
                                    // Now compare with febPeakDate
                                    const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                                    

                                    if (febPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118687037'); 
                                            btn.setAttribute('cid', '118687182');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                                    if (aprilPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118687182');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                    
                                    if (aprilSecondPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118687182');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                    
                                    if (mayPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118687182');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                    
                                    if (julyPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118687182');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                        } else {
                                const [day, month, year] = inputDate.split('/');

                                const formattedDate = `${year}-${month}-${day}`;

                                console.log('Formatted inputDate:', formattedDate);
                        
                                // Compare with febPeakDate
                                const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                                

                                if (febPeakDate.includes(formattedDate) && adultInput) {

                                    console.log('Peak date match!2');

                                    btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118687182');

                                } else {

                                    console.log('No peak date match.');
                                }


                                const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                                if (aprilPeakDate.includes(formattedDate) && adultInput) {

                                    console.log('Peak date match!2');

                                    btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118687182');

                                } else {

                                    console.log('No peak date match.');
                                }

                                const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                    
                                if (aprilSecondPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                        
                                    btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118687182');
                                        
                                } else {

                                    console.log('No peak date match.');
                                }
                                
                                const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                    
                                if (mayPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                        
                                    btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118687182');
                                        
                                } else {

                                    console.log('No peak date match.');
                                }

                                const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                    
                                if (julyPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                        
                                    btn.setAttribute('pid', '118687037'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118687182');
                                        
                                } else {

                                    console.log('No peak date match.');
                                }

                        }
                    });
                    
                }


                if (selectedValue === '2' && adultInput) {

                    btnTime.forEach(btn =>{

                        const inputDate = document.getElementById('inputDate').value;

                        console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
                
                        // Check if the input date is in 'YYYY-MM-DD' format
                        if (inputDate.includes('-')) {

                            console.log('Date already in correct format');

                            const formattedDate = inputDate; 

                                    console.log('Formatted inputDate:', formattedDate);

                            
                                    // Now compare with febPeakDate
                                    const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                                    

                                    if (febPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118688026');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                                    if (aprilPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118688026');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                    
                                    if (aprilSecondPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118688026');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                    
                                    if (mayPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118688026');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                                    const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                    
                                    if (julyPeakDate.includes(formattedDate)) {

                                        console.log('Peak date match!1');
                                        
                                            btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                            btn.setAttribute('cid', '118688026');
                                        
                                    } else {

                                        console.log('No peak date match.');
                                    }

                        } else {
                                const [day, month, year] = inputDate.split('/');

                                const formattedDate = `${year}-${month}-${day}`;

                                console.log('Formatted inputDate:', formattedDate);
                        
                                // Compare with febPeakDate
                                const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                                

                                if (febPeakDate.includes(formattedDate) && adultInput) {

                                    console.log('Peak date match!2');

                                    btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118688026');

                                } else {

                                    console.log('No peak date match.');
                                }


                                const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                                if (aprilPeakDate.includes(formattedDate) && adultInput) {

                                    console.log('Peak date match!2');

                                    btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118688026');

                                } else {

                                    console.log('No peak date match.');
                                }

                                const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                    
                                if (aprilSecondPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                        
                                    btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118688026');
                                        
                                } else {

                                    console.log('No peak date match.');
                                }
                                
                                const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                    
                                if (mayPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                        
                                    btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118688026');
                                        
                                } else {

                                    console.log('No peak date match.');
                                }

                                const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                    
                                if (julyPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                        
                                    btn.setAttribute('pid', '118688024'); // Adult ID set to 118687037 for peak dates
                                    btn.setAttribute('cid', '118688026');
                                        
                                } else {

                                    console.log('No peak date match.');
                                }

                        }
                    });
                    
                }
                
            });
        


        document.querySelector(".bowling-time .owl-carousel").setAttribute("data-needed", Math.ceil(maxpeople / 7) );



    });



    // Get the select element

    const bowlingfamSelect = document.querySelector('select[name="bowling_family"]');



    // Add an event listener to the select element

    bowlingfamSelect.addEventListener('change', function() {



        // Get the selected value



        const selectedValue = bowlingfamSelect.value;

        const btnTime = document.querySelectorAll('.bowlingfamily-time .btn-time');

        const dealType = ( document.querySelector('.familydeal-box').classList.contains('family-four') )? 'family-four' : 'family-eight';



        if(dealType =='family-four'){



            // Update the pid attribute based on the selected value



            if (selectedValue === '1') {



                btnTime.forEach(btn => {

                    const stime = parseInt(btn.getAttribute('data-stime'), 10);

                    

                    // Peak IDs

                    if ( holidaytype == 'holidays' || sday === 7 ) {

                        btn.setAttribute('pid', '35754926'); // family id

                    } else if( sday === 6 ) {

                        // Check if stime is equal to or greater than 1800

                        if (stime >= 1800) {

                            btn.setAttribute('pid', '35754926'); // family id

                        }

                    } else {

                        btn.setAttribute('pid', '35754924'); // family id

                    }

                });



			updateDart('.bowlingfamily-time',40)



            } else if (selectedValue === '2') {



                btnTime.forEach(btn => {

                    const stime = parseInt(btn.getAttribute('data-stime'), 10);

                    

                    // Peak IDs

                    if ( holidaytype == 'holidays' || sday === 7 ) {

                        btn.setAttribute('pid', '54599082'); // family id

                    } else if( sday === 6 ) {

                        // Check if stime is equal to or greater than 1800

                        if (stime >= 1800) {

                            btn.setAttribute('pid', '54599082'); // family id

                        }else{
                            btn.setAttribute('pid', '35754925'); // family id    
                        }

                    } else {

                        btn.setAttribute('pid', '35754925'); // family id

                    }

                });



				updateDart('.bowlingfamily-time',90)



            } else {



                btnTime.forEach(btn => {

                    btn.setAttribute('pid', '35754924'); // Default adult id

                });



            }



        } else {

            // Family Eight 

            // Update the pid attribute based on the selected value 

            if (selectedValue === '1') {



                updateDart('.bowlingfamily-time',80)



				if( daytype == 'weekday'){

                    btnTime.forEach(btn => {

                        btn.setAttribute('pid', '90524071'); // family id

                    });

				} else {



                    btnTime.forEach(btn => {

                        btn.setAttribute('pid', '90523706'); // family id

                    });



                }



            } else if (selectedValue === '2') {



                updateDart('.bowlingfamily-time',180)



				if( daytype == 'weekday'){

                    btnTime.forEach(btn => {

                        btn.setAttribute('pid', '90523341'); // family id

                    });

				} else {

                    btnTime.forEach(btn => {

                        btn.setAttribute('pid', '90522976'); // family id

                    });

                }



            } else {



                btnTime.forEach(btn => {

                    btn.setAttribute('pid', '90523706'); // Default ID

                });



            }



        }

        if(dealType =='family-four'){
            if (selectedValue === '1') {

                btnTime.forEach(btn =>{

                    const inputDate = document.getElementById('inputDate').value;

                    console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
            
                    // Check if the input date is in 'YYYY-MM-DD' format
                    if (inputDate.includes('-')) {

                        console.log('Date already in correct format');

                        const formattedDate = inputDate; 

                                console.log('Formatted inputDate:', formattedDate);

                        
                                // Now compare with febPeakDate
                                const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                                

                                if (febPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                                if (aprilPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                
                                if (aprilSecondPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                
                                if (mayPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                
                                if (julyPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                    } else {
                            const [day, month, year] = inputDate.split('/');

                            const formattedDate = `${year}-${month}-${day}`;

                            console.log('Formatted inputDate:', formattedDate);
                    
                            // Compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate) && adultInput) {

                                console.log('Peak date match!2');

                                    btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates

                            } else {

                                console.log('No peak date match.');
                            }


                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate) && adultInput) {

                                console.log('Peak date match!2');

                                    btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates

                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                    
                                    btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                            } else {

                                console.log('No peak date match.');
                            }
                            
                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                    
                                    btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                    
                                    btn.setAttribute('pid', '35754926'); // Adult ID set to 118687037 for peak dates
                                    
                            } else {

                                console.log('No peak date match.');
                            }

                    }
                });
                
            }
        }

        if(dealType =='family-four'){
            if (selectedValue === '2') {

                btnTime.forEach(btn =>{

                    const inputDate = document.getElementById('inputDate').value;

                    console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
            
                    // Check if the input date is in 'YYYY-MM-DD' format
                    if (inputDate.includes('-')) {

                        console.log('Date already in correct format');

                        const formattedDate = inputDate; 

                                console.log('Formatted inputDate:', formattedDate);

                        
                                // Now compare with febPeakDate
                                const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                                

                                if (febPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                                if (aprilPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                
                                if (aprilSecondPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                
                                if (mayPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                                const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                
                                if (julyPeakDate.includes(formattedDate)) {

                                    console.log('Peak date match!1');
                                    
                                        btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                                } else {

                                    console.log('No peak date match.');
                                }

                    } else {
                            const [day, month, year] = inputDate.split('/');

                            const formattedDate = `${year}-${month}-${day}`;

                            console.log('Formatted inputDate:', formattedDate);
                    
                            // Compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate) && adultInput) {

                                console.log('Peak date match!2');

                                    btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates

                            } else {

                                console.log('No peak date match.');
                            }


                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate) && adultInput) {

                                console.log('Peak date match!2');

                                    btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates

                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                                
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                    
                                    btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                            } else {

                                console.log('No peak date match.');
                            }
                            
                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                                
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                    
                                    btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                                
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                    
                                    btn.setAttribute('pid', '54599082'); // Adult ID set to 118687037 for peak dates
                                    
                            } else {

                                console.log('No peak date match.');
                            }

                    }
                });
                
            }
        }



        document.querySelector(".bowlingfamily-time .owl-carousel").setAttribute("data-needed", Math.ceil(maxpeople / 7) );



    });





    // Get the select element

    const dartsSelect = document.querySelector('select[name="darts"]');





    // Add an event listener to the select element

    dartsSelect.addEventListener('change', function() {



        // Get the selected value

        const selectedValue = dartsSelect.value;

        const btnTime = document.querySelectorAll('.darts-time .btn-time');



        // Update the pid attribute based on the selected value

        if (selectedValue === '1') {



            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);

                btn.setAttribute('dcaid', '122181172'); // Default dcaid                     

                // Peak IDs

                if ( holidaytype == 'holidays' || sday === 7 ) {

                    btn.setAttribute('pid', '118688034');

                } else if( sday === 6 ) {

                    // Check if stime is equal to or greater than 1800

                    if (stime >= 1800) {

                        btn.setAttribute('pid', '118688034');

                    }

                } else {

                    btn.setAttribute('pid', '118688033');

                }

            });



			updateDart('.darts-time',30)





        } else if (selectedValue === '2') {



            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);
                    
                btn.setAttribute('dcaid', '122184736'); // Default dcaid         

                // Peak IDs

                if ( holidaytype == 'holidays' || sday === 7 ) {

                    btn.setAttribute('pid', '118688037');

                } else if( sday === 6 ) {

                    // Check if stime is equal to or greater than 1800

                    if (stime >= 1800) {

                        btn.setAttribute('pid', '118688037');

                    }

                } else {

                    btn.setAttribute('pid', '118688036');

                }

            });



			updateDart('.darts-time',60)



        } else {



            btnTime.forEach(btn => {

                btn.setAttribute('pid', '118688033'); // Default ID

            });



        }


        if (selectedValue === '1') {

            btnTime.forEach(btn =>{

                const inputDate = document.getElementById('inputDate').value;

                console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
        
                // Check if the input date is in 'YYYY-MM-DD' format
                if (inputDate.includes('-')) {

                    console.log('Date already in correct format');

                    const formattedDate = inputDate; 

                            console.log('Formatted inputDate:', formattedDate);

                    
                            // Now compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                } else {
                        const [day, month, year] = inputDate.split('/');

                        const formattedDate = `${year}-${month}-${day}`;

                        console.log('Formatted inputDate:', formattedDate);
                
                        // Compare with febPeakDate
                        const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                        

                        if (febPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                                btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates

                        } else {

                            console.log('No peak date match.');
                        }


                        const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                        if (aprilPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                                btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates

                        } else {

                            console.log('No peak date match.');
                        }

                        const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                        if (aprilSecondPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                        } else {

                            console.log('No peak date match.');
                        }
                        
                        const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                        if (mayPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                        } else {

                            console.log('No peak date match.');
                        }

                        const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                        if (julyPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688034'); // Adult ID set to 118687037 for peak dates
                                
                        } else {

                            console.log('No peak date match.');
                        }

                }
            });
            
        }

        if (selectedValue === '2') {

            btnTime.forEach(btn =>{

                const inputDate = document.getElementById('inputDate').value;

                console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
        
                // Check if the input date is in 'YYYY-MM-DD' format
                if (inputDate.includes('-')) {

                    console.log('Date already in correct format');

                    const formattedDate = inputDate; 

                            console.log('Formatted inputDate:', formattedDate);

                    
                            // Now compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                } else {
                        const [day, month, year] = inputDate.split('/');

                        const formattedDate = `${year}-${month}-${day}`;

                        console.log('Formatted inputDate:', formattedDate);
                
                        // Compare with febPeakDate
                        const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                        

                        if (febPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                                btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates

                        } else {

                            console.log('No peak date match.');
                        }


                        const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                        if (aprilPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                                btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates

                        } else {

                            console.log('No peak date match.');
                        }

                        const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                        if (aprilSecondPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                        } else {

                            console.log('No peak date match.');
                        }
                        
                        const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                        if (mayPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                        } else {

                            console.log('No peak date match.');
                        }

                        const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                        if (julyPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688037'); // Adult ID set to 118687037 for peak dates
                                
                        } else {

                            console.log('No peak date match.');
                        }

                }
            });
            
        }



        document.querySelector(".darts-time .owl-carousel").setAttribute("data-needed", Math.ceil(maxpeople / 6) );



    });





    // Get the select element

    const poolSelect = document.querySelector('select[name="pool"]');



    // Add an event listener to the select element

    poolSelect.addEventListener('change', function() {


        // Get the selected value
        const selectedValue = poolSelect.value;

        const btnTime = document.querySelectorAll('.pool-tables-time .btn-time');


        // Update the pid attribute based on the selected value
        if (selectedValue === '1') {

            console.log('pool 1');
            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);

                if ( holidaytype == 'holidays' || sday === 7 ) {
                    // Peak IDs (bank holidays + Saturday - allday 10am-9:30am)
                        btn.setAttribute('pid', '122151080');

                } else if( sday === 6 && stime >= 1800) {
                    // Peak IDs (Friday - 6pm-9:30pm)
                        btn.setAttribute('pid', '122151080');

                } else { 
                    //offpeak
                        btn.setAttribute('pid', '118688027');
                }

            });

			updateDart('.pool-tables-time',30)



        } else if (selectedValue === '2') {
            
            console.log('pool 2');
            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);

                if ( holidaytype == 'holidays' || sday === 7 ) {
                    // Peak IDs (bank holidays + Saturday - allday 10am-9:30am)
                        btn.setAttribute('pid', '122152923');

                } else if( sday === 6 && stime >= 1800) {
                    // Peak IDs (Friday - 6pm-9:30pm)
                        btn.setAttribute('pid', '122152923');

                } else { 
                    //offpeak
                        btn.setAttribute('pid', '118688028');
                }
            
            });

			updateDart('.pool-tables-time',60)



        } else {

            console.log('pool 3');


            btnTime.forEach(btn => {

                btn.setAttribute('pid', '118688027'); // Default ID

            });



        }

        if (selectedValue === '1') {

            btnTime.forEach(btn =>{

                const inputDate = document.getElementById('inputDate').value;

                console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
        
                // Check if the input date is in 'YYYY-MM-DD' format
                if (inputDate.includes('-')) {

                    console.log('Date already in correct format');

                    const formattedDate = inputDate; 

                            console.log('Formatted inputDate:', formattedDate);

                    
                            // Now compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                } else {
                        const [day, month, year] = inputDate.split('/');

                        const formattedDate = `${year}-${month}-${day}`;

                        console.log('Formatted inputDate:', formattedDate);
                
                        // Compare with febPeakDate
                        const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                        

                        if (febPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }


                        const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                        if (aprilPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }

                        const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                        if (aprilSecondPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }
                        
                        const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                        if (mayPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                        const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                        if (julyPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '122151080'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                }
            });
            
        }

        if (selectedValue === '2') {

            btnTime.forEach(btn =>{

                const inputDate = document.getElementById('inputDate').value;

                console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
        
                // Check if the input date is in 'YYYY-MM-DD' format
                if (inputDate.includes('-')) {

                    console.log('Date already in correct format');

                    const formattedDate = inputDate; 

                            console.log('Formatted inputDate:', formattedDate);

                    
                            // Now compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                } else {
                        const [day, month, year] = inputDate.split('/');

                        const formattedDate = `${year}-${month}-${day}`;

                        console.log('Formatted inputDate:', formattedDate);
                
                        // Compare with febPeakDate
                        const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                        

                        if (febPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }


                        const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                        if (aprilPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }

                        const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                        if (aprilSecondPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }
                        
                        const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                        if (mayPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                        const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                        if (julyPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '122152923'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                }
            });
            
        }



        document.querySelector(".pool-tables-time .owl-carousel").setAttribute("data-needed", Math.ceil(maxpeople / 6) );



    });



    // Get the select element

    const shuffleboardSelect = document.querySelector('select[name="shuffleboard"]');



    // Add an event listener to the select element

    shuffleboardSelect.addEventListener('change', function() {



        // Get the selected value

        const selectedValue = shuffleboardSelect.value;

        const btnTime = document.querySelectorAll('.shuffleboard-time .btn-time');



        // Update the pid attribute based on the selected value


        if (selectedValue === '1') {

        console.log('shuffle dur1='+ selectedValue);


            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);

                    

                // Peak IDs

                if ( holidaytype == 'holidays' || sday === 7 ) {

                    btn.setAttribute('pid', '118688030');

                } else if( sday === 6 ) {

                    // Check if stime is equal to or greater than 1800

                    if (stime >= 1800) {
                        btn.setAttribute('pid', '118688030');
                    }else{
                        btn.setAttribute('pid', '118688029');
                    }

                } else {

                    btn.setAttribute('pid', '118688029');

                }

            });



			updateDart('.shuffleboard-time',30)



        } else if (selectedValue === '2') {


            btnTime.forEach(btn => {

                const stime = parseInt(btn.getAttribute('data-stime'), 10);

                    
                // Peak IDs
                if ( holidaytype == 'holidays' || sday === 7 ) {

                    btn.setAttribute('pid', '118688032');

                } else if( sday === 6 ) {

                    // Check if stime is equal to or greater than 1800

                    if (stime >= 1800) {
                        btn.setAttribute('pid', '118688032');
                    }else{
                        btn.setAttribute('pid', '118688031');
                    }

                } else {

                    btn.setAttribute('pid', '118688031');

                }

            });



			updateDart('.shuffleboard-time',60)



        } else {



            btnTime.forEach(btn => {

                btn.setAttribute('pid', '118688029'); // Default ID

            });

        }



        if (selectedValue === '1') {

            btnTime.forEach(btn =>{

                const inputDate = document.getElementById('inputDate').value;

                console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
        
                // Check if the input date is in 'YYYY-MM-DD' format
                if (inputDate.includes('-')) {

                    console.log('Date already in correct format');

                    const formattedDate = inputDate; 

                            console.log('Formatted inputDate:', formattedDate);

                    
                            // Now compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                } else {
                        const [day, month, year] = inputDate.split('/');

                        const formattedDate = `${year}-${month}-${day}`;

                        console.log('Formatted inputDate:', formattedDate);
                
                        // Compare with febPeakDate
                        const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                        

                        if (febPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }


                        const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                        if (aprilPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }

                        const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                        if (aprilSecondPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }
                        
                        const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                        if (mayPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                        const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                        if (julyPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688030'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                }
            });
            
        }


        if (selectedValue === '2') {

            btnTime.forEach(btn =>{

                const inputDate = document.getElementById('inputDate').value;

                console.log('Original inputDate:', inputDate); // Logs: '2025-02-24'
        
                // Check if the input date is in 'YYYY-MM-DD' format
                if (inputDate.includes('-')) {

                    console.log('Date already in correct format');

                    const formattedDate = inputDate; 

                            console.log('Formatted inputDate:', formattedDate);

                    
                            // Now compare with febPeakDate
                            const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                            

                            if (febPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                    btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                            if (aprilPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                            if (aprilSecondPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                            if (mayPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                            const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                            if (julyPeakDate.includes(formattedDate)) {

                                console.log('Peak date match!1');
                                
                                btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                                
                            } else {

                                console.log('No peak date match.');
                            }

                } else {
                        const [day, month, year] = inputDate.split('/');

                        const formattedDate = `${year}-${month}-${day}`;

                        console.log('Formatted inputDate:', formattedDate);
                
                        // Compare with febPeakDate
                        const febPeakDate = ['2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28'];
                        

                        if (febPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }


                        const aprilPeakDate = ['2025-04-14','2025-04-15','2025-04-16','2025-04-17','2025-04-18'];

                        if (aprilPeakDate.includes(formattedDate) && adultInput) {

                            console.log('Peak date match!2');

                            btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                

                        } else {

                            console.log('No peak date match.');
                        }

                        const aprilSecondPeakDate = ['2025-04-21','2025-04-22','2025-04-23','2025-04-24','2025-04-25'];
                            
                        if (aprilSecondPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }
                        
                        const mayPeakDate = ['2025-05-05','2025-05-26','2025-05-27','2025-05-28','2025-05-29','2025-05-30'];
                            
                        if (mayPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                        const julyPeakDate = ['2025-07-22','2025-07-23','2025-07-24','2025-07-25','2025-07-26','2025-07-27','2025-07-28','2025-07-29','2025-07-30','2025-07-31'];
                            
                        if (julyPeakDate.includes(formattedDate)) {

                            console.log('Peak date match!1');
                                
                            btn.setAttribute('pid', '118688032'); // Adult ID set to 118687037 for peak dates
                                
                                
                        } else {

                            console.log('No peak date match.');
                        }

                }
            });
            
        }



        document.querySelector(".shuffleboard-time .owl-carousel").setAttribute("data-needed", Math.ceil(maxpeople / 8) );



    });



    const yesButton = document.querySelector('#table_yes'); // Replace with actual selector for Yes button

    const noButton = document.querySelector('#table_no');   // Replace with actual selector for No button



    yesButton.addEventListener('click', function() {

        this.classList.add('clicked');

    });



    noButton.addEventListener('click', function() {

        this.classList.add('clicked');

    });





document.addEventListener('DOMContentLoaded', function () {
    
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



        const elements = document.querySelectorAll('.timegroup');

    

        // Filter the elements to find visible ones

        const visibleElements = Array.from(elements).filter(element => {

            const style = getComputedStyle(element);

            return style.display !== 'none';

        });



        if(document.querySelectorAll('.btn-time.selected').length == visibleElements.length){

            document.querySelector('#available-step-4').classList.remove('disabled');

        } else {

            document.querySelector('#available-step-4').classList.add('disabled');

        }



    });



});



//document.getElementById('upsell-drinks').addEventListener('click', function(e) {



document.getElementById('available-step-4').addEventListener('click', function(e) {

    

    e.preventDefault(); // Prevent the default anchor behavior



    let url = 'https://larryslanes.bookedit.online/book/?';

    const date = dte; // Example date, you can replace this with dynamic data if needed



    let selectedProducts = '';

    let zoneTimes = '';

    let productPpl=1;

    

    const noAdults=document.querySelector(".ad").value;

	const noKids=document.querySelector(".kd").value;

	const noDca=document.querySelector(".dca").value;



    productPpl = parseInt(noAdults) + parseInt(noKids) + parseInt(noDca);

    totalPpl = productPpl;



	// Get the quantity of each game panel

    const cansPackageQuantity = document.querySelector('.cans-package-box input[name="quant[1]"]').value;

    const bottleProseccoQuantity = document.querySelector('.bottle-prosecco-box input[name="quant[1]"]').value;



    if (cansPackageQuantity > 0 || bottleProseccoQuantity > 0) {

        // Add the selected products to the URL parameters

        if (cansPackageQuantity > 0) {

            const cansPackageId = '113952690'; // Replace with the actual product ID

            if (selectedProducts) {

                selectedProducts += `&selected_products[${cansPackageId}]=${cansPackageQuantity}`;

            } else {

                selectedProducts = `selected_products[${cansPackageId}]=${cansPackageQuantity}`;

            }

        }

        if (bottleProseccoQuantity > 0) {

            const bottleProseccoId = '113952740'; // Replace with the actual product ID

            if (selectedProducts) {

                selectedProducts += `&selected_products[${bottleProseccoId}]=${bottleProseccoQuantity}`;

            } else {

                selectedProducts = `selected_products[${bottleProseccoId}]=${bottleProseccoQuantity}`;

            }

        }

    }



    // Check which button was clicked for Yes/No

    const yesButtonClicked = document.querySelector('#table_yes'); // Replace with actual selector for Yes button

    const noButtonClicked = document.querySelector('#table_no');   // Replace with actual selector for No button



    if (yesButtonClicked && yesButtonClicked.classList.contains('clicked') ) {

        const yesProductId = '54125081';

        //selectedProducts += selectedProducts ? `&selected_products[43814400]=1&selected_products[${yesProductId}]=1` : `selected_products[${yesProductId}]=1`;

        selectedProducts += `&selected_products[43814400]=${productPpl}&selected_products[${yesProductId}]=${productPpl}`;



    } else if (noButtonClicked && noButtonClicked.classList.contains('clicked') ) {

        const noProductId = '54125195';

        //selectedProducts += selectedProducts ? `&selected_products[43814400]=1&selected_products[${noProductId}]=1` : `selected_products[${noProductId}]=1`;

        selectedProducts += `&selected_products[43814400]=${productPpl}&selected_products[${noProductId}]=${productPpl}`;

    }



    document.querySelectorAll('.btn-time.selected').forEach(function(selectedItem) {
       

        const category = selectedItem.getAttribute('category');

        const pid = selectedItem.getAttribute('pid');

        const cid = selectedItem.getAttribute('cid');

        const dcaid = selectedItem.getAttribute('dcaid');

        const time = selectedItem.getAttribute('time');

        const bwlTime = selectedItem.getAttribute('data-stime');

        const zoneId = selectedItem.closest('.owl-carousel').getAttribute('zone_id');

        const parentElement = selectedItem.closest('.timegroup');



		const activityName = (parentElement)?parentElement.querySelector('h4').textContent.toLowerCase():'';

		// Check for specific dates

        const specificDates = ['2025-01-01', '2025-04-18', '2025-04-21', '2025-05-05', '2025-05-26', '2025-08-25', '2025-12-25', '2025-12-26'];
        



		// if (activityName.includes('bowling') ) {
        if (activityName == 'bowling' ) {

		    productPpl = parseInt(noAdults) + parseInt(noDca);

            productPpl=productPpl;

            

            console.log("adl+dca"+productPpl)

            

            // productPpl = Math.ceil(productPpl / 7);

            

            if ( (sday >= 2 && sday <= 6) && bwlTime >= 1000 && bwlTime <= 1800 && !specificDates.includes(dte) ) {

                if(noAdults > 0){ selectedProducts += `&selected_products[${pid}]=`+noAdults; }

                if(noDca > 0){ selectedProducts += `&selected_products[${dcaid}]=`+noDca; } // concession 

            } else {

                if(noAdults > 0){ selectedProducts += `&selected_products[${pid}]=`+productPpl; }

            }

            

            if(noKids > 0){ selectedProducts += `&selected_products[${cid}]=`+noKids; }



		}

		if (activityName.includes('bowling family deal') ) {

            productPpl=productPpl;

            // productPpl = Math.ceil(productPpl / 7);

            selectedProducts += `&selected_products[${pid}]=`+productPpl;



		}

		if (activityName.includes('shuffleboard')) {

			productPpl=Math.ceil(totalPpl / 8);

			selectedProducts += `&selected_products[${pid}]=`+productPpl; 

		} 

		

		if (activityName.includes('pool') ) {

			productPpl=Math.ceil(productPpl / 6);

			selectedProducts += `&selected_products[${pid}]=`+productPpl; 

		}

		if (activityName.includes('darts')) {

			//productPpl=Math.ceil(productPpl / 6);

			productPpl=productPpl;

			selectedProducts += `&selected_products[${pid}]=`+productPpl;

            if ( (sday >= 2 && sday <= 6) && bwlTime >= 1000 && bwlTime <= 1800 && !specificDates.includes(dte) ) {

                if(noDca > 0){ selectedProducts += `&selected_products[${dcaid}]=`+noDca; } // concession 

            } 

		}



		/*if (selectedProducts) {

            selectedProducts += `&selected_products[${pid}]=`+productPpl; 

        } else {

            selectedProducts = `selected_products[${pid}]=`+productPpl;

        }*/



        //if(cid){ selectedProducts += `&selected_products[${cid}]=`+noKids; }



        if (zoneTimes) {

            zoneTimes += `&zone_times[${zoneId}]=${time}`;

        } else {

            zoneTimes = `zone_times[${zoneId}]=${time}`;

        }




    });


    //url += `date=${date}&${selectedProducts}&${zoneTimes}`;

    url += `date=${date}${selectedProducts}&${zoneTimes}`;



    // Redirect to the constructed URL

    window.location.href = url+'&people=' + totalPpl +'&external_event_id=Larry';

});



// Get all sections

const sections = document.querySelectorAll('.input-number-group');

const wrapper = document.querySelector('.dropdown-ppl');



// Function to update total count and validate



function updateTotal() {

  const adultCount = parseInt(document.querySelector('input[name="adult"]').value) || 0;

  const kidsCount = parseInt(document.querySelector('input[name="kids"]').value) || 0;

  const totalCount = adultCount + kidsCount;



  // Check if total exceeds 30

  if (totalCount > 30) {

    alert("The total number of adults and kids cannot exceed 30.");

    return true; // Indicate that the total is invalid



  }



  return false; // Indicate that the total is valid



}



// Loop through each section

sections.forEach((section) => {

  // Get the input field and buttons for this section

  const decrementButton = section.querySelector('.input-number-decrement');

  const incrementButton = section.querySelector('.input-number-increment');

  const inputField = section.querySelector('.input-number');



  // Add event listeners to the buttons



  decrementButton.addEventListener('click', (event) => {

    event.stopPropagation();

    const currentValue = parseInt(inputField.value);

    const minValue = parseInt(inputField.getAttribute('min'));



    if (currentValue > minValue) {

      inputField.value = currentValue - 1;

      if (updateTotal()) {

        inputField.value = currentValue; // Revert if total is invalid

      }



    }



    // Add class to the wrapper

    wrapper.classList.add('open');



  });



  incrementButton.addEventListener('click', (event) => {

    event.stopPropagation();



    const currentValue = parseInt(inputField.value);

    const maxValue = parseInt(inputField.getAttribute('max'));



    if (currentValue < maxValue) {

      inputField.value = currentValue + 1;

      if (updateTotal()) {

        inputField.value = currentValue; // Revert if total is invalid



      }



    }



    // Add class to the wrapper

    wrapper.classList.add('open');      



  });



});



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



	 //timeLinks.forEach(link => { link.style.pointerEvents = 'auto'; link.style.opacity = 1; link.closest('.owl-item').classList.remove('offtime'); });

	 timeLinks.forEach(link => { link.closest('.owl-item').classList.remove('offtime'); });



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

        "ten-pin-bowling": "£7",

        "xshuffleboard": "£15.00",

	};



	const commonIdsWeekdays = {

		"ten-pin-bowling-id": "118686796",

		"xshuffleboard-id": "112086863",

	};



	const commonPricesWeekend = {

		"ten-pin-bowling": "£8",

		"xshuffleboard": "£20.00",

	};



	const commonIdsWeekend = {

		"ten-pin-bowling-id": "118687037",

		"xshuffleboard-id": "118688030",

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



// Show popup for packages and membership

function showPopup(popupId) {

		var popup = document.getElementById(popupId);

		var closeBtn = popup.querySelector(".close-btn");

		var yesnoBtns = popup.querySelectorAll(".yesno-btn");

		var body = document.body; // get the body element



		// Open the popup when the button is clicked

		popup.style.display = "block";

		body.classList.add("popup-open"); // add class to body



		// Close the popup when the close button is clicked

		closeBtn.addEventListener("click", function() {

			popup.style.display = "none";

			body.classList.remove("popup-open"); // remove class from body



		});



		// Close the popup when any yesno button is clicked

        yesnoBtns.forEach(function(btn) {

            btn.addEventListener("click", function(event) {

                event.preventDefault();

                popup.style.display = "none";

                body.classList.remove("popup-open");

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



function updateBowling(gameTwrapper,maxpeople,noPeople,perperson){



	// Iterate over each element with the class "btn-time" within elements with the class "bowling-time"

	console.log(gameTwrapper+" a.btn-time");



	document.querySelectorAll(gameTwrapper+" a.btn-time").forEach(function(element) {



		const eachtime = element.querySelector("span.time-duration:first-child");

		//console.log(eachtime);

		const thistm = element.getAttribute("time");

		const timeDuration = parseInt(maxpeople * perperson, 10);

		const endtime = addMinutes(thistm, timeDuration);

		const eachtimeTxt = eachtime.textContent;



		// If the time text length is less than 7, append the end time

		if (eachtimeTxt.length < 7) {

			eachtime.textContent += " - " + endtime;

		}



		// Set the data-etime attribute to the calculated end time

		element.setAttribute("data-etime", endtime.replace(":", ""));

		element.setAttribute("data-tdiff", maxpeople * perperson);

		element.dataset.tdiff = maxpeople * perperson;



	});



	document.querySelectorAll(gameTwrapper+" .owl-carousel").forEach(function(element) {



		const lengthValue = maxpeople * perperson;

		const neededValue = Math.ceil(noPeople / 7);



		element.setAttribute("data-length", lengthValue);

		element.dataset.length = lengthValue;

		element.setAttribute("data-needed", neededValue);

		element.dataset.needed = neededValue;



	});



}



function updateDart(gameTwrapper,timeDuration){



	// Iterate over each element with the class "btn-time" within elements with the class "bowling-time"

	console.log(gameTwrapper+" a.btn-time");



	document.querySelectorAll(gameTwrapper+" a.btn-time").forEach(function(element) {



		const eachtime = element.querySelector("span.time-duration:first-child");

		//console.log(eachtime);

		const thistm = element.getAttribute("time");

		const endtime = addMinutes(thistm, timeDuration);

		const eachtimeTxt = eachtime.textContent;



		// If the time text length is less than 6, append the end time

		if (eachtimeTxt.includes('-')) { 

		// Replace the existing end time 

			eachtime.textContent = eachtimeTxt.split('-')[0].trim() + " - " + endtime;

		} else if (eachtimeTxt.length < 6) {

			eachtime.textContent += " - " + endtime;



		}



		// Set the data-etime attribute to the calculated end time

		element.setAttribute("data-etime", endtime.replace(":", ""));

		element.setAttribute("data-tdiff", timeDuration);

		//element.dataset.tdiff = maxpeople * 10;



	});



	document.querySelectorAll(gameTwrapper+" .owl-carousel").forEach(function(element) {



		const lengthValue = timeDuration;

		const neededValue = 1;//Math.ceil(noPeople / 7);



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
