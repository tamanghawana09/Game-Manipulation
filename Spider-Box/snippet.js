"use strict";
(function(){
	//The main url
	var domain = 'https://service.booked.it/';
	var domainSubdomain = 'https://service.booked.it/';

	/**
	* docReady wrapper. Execute the code provided in funcname when DOM is loaded
	*/
	(function(funcName, baseObj) {
		// The public function name defaults to window.docReady
		// but you can pass in your own object and own function name and those will be used
		// if you want to put them in a different namespace
		funcName = funcName || "docReady";
		baseObj = baseObj || window;
		var readyList = [];
		var readyFired = false;
		var readyEventHandlersInstalled = false;

		// call this when the document is ready
		// this function protects itself against being called more than once
		function ready() {
			if (!readyFired) {
				// this must be set to true before we start calling callbacks
				readyFired = true;
				for (var i = 0; i < readyList.length; i++) {
					// if a callback here happens to add new ready handlers,
					// the docReady() function will see that it already fired
					// and will schedule the callback to run right after
					// this event loop finishes so all handlers will still execute
					// in order and no new ones will be added to the readyList
					// while we are processing the list
					readyList[i].fn.call(window, readyList[i].ctx);
				}
				// allow any closures held by these functions to free
				readyList = [];
			}
		}

		function readyStateChange() {
			if ( document.readyState === "complete" ) {
				ready();
			}
		}

		// This is the one public interface
		// docReady(fn, context);
		// the context argument is optional - if present, it will be passed
		// as an argument to the callback
		baseObj[funcName] = function(callback, context) {
			// if ready has already fired, then just schedule the callback
			// to fire asynchronously, but right away
			if (readyFired) {
				setTimeout(function() {callback(context);}, 1);
				return;
			} else {
				// add the function and context to the list
				readyList.push({fn: callback, ctx: context});
			}
			// if document already ready to go, schedule the ready function to run
			if (document.readyState === "complete") {
				setTimeout(ready, 1);
			} else if (!readyEventHandlersInstalled) {
				// otherwise if we don't have event handlers installed, install them
				if (document.addEventListener) {
					// first choice is DOMContentLoaded event
					document.addEventListener("DOMContentLoaded", ready, false);
					// backup is window load event
					window.addEventListener("load", ready, false);
				} else {
					// must be IE
					document.attachEvent("onreadystatechange", readyStateChange);
					window.attachEvent("onload", ready);
				}
				readyEventHandlersInstalled = true;
			}
		}
	})("docReady", window);

	var licklist = {
		domain : domain,
		domainSubdomain : domainSubdomain,
		/**
		 * return the domain url which will be used to load url or resources
		 * @return url
		 */
		getDomain: function() {
			var domain = this.domain;
			if (typeof subdomain != 'undefined') {
				subdomain = subdomain.replace(/[^a-z\.\-]/g, '');
				domain = this.domainSubdomain.replace('*', subdomain);
			}
			return domain;
		},
		/**
		 * Add styings in the header of the
		 * page related only to the licklist components
		 */
		styles: function(){
			var head = document.head || document.getElementsByTagName('head')[0];
			var style = document.createElement('link');
			style.type = "text/css";
			style.rel = "stylesheet";
			style.href = licklist.getDomain() + '/less/plugins/payment/snippet.css';
			head.appendChild(style);
		},
		/**
		 * Init the iframe to the given element and given url
		 * @param  {[type]} element [description]
		 * @param  {[type]} url     [description]
		 * @return {[type]}         [description]
		 */
		initIframe: function(url){
			var iframe, id;
			//var c = document.querySelectorAll(selector);
			//var element;
			//if(element.getAttribute('data-status') === null){
				id = 'll-'+(Math.ceil(Math.random()*10000000));
				iframe = document.createElement('iframe');
				iframe.src = url;
				iframe.name = id;
				iframe.className = 'll-iframe';
				iframe.id = id;
				iframe.setAttribute("allowpaymentrequest", "");
				/*element.appendChild(iframe);
				element.setAttribute('data-status', 'initialized');*/
			//} else {
				//document.body.appendChild(iframe);
			//}
			return iframe
		},
		/**
		 * Init the cover iframe which cover everything on the page
		 * @return {[type]} [description]
		 */
		popup: {
			init: function(){
				var self = this;
				//Add the mask
				var mask = document.createElement('div');
				mask.id = "ll-mask";
				mask.setAttribute('class', 'll-mask');
				mask.className = 'll-mask';
				mask.addEventListener("click", function(e){
					e.preventDefault();
					//self.close();
					return false;
				});
				document.body.appendChild(mask);

				//Add the dialog
				var dialog = document.createElement('div');
				dialog.id = "ll-dialog";
				dialog.className = "ll-dialog";

				//Add header to dialog
				var header = document.createElement('div');
				header.id = "ll-dialog-header";
				header.className = "ll-dialog-header";

				var popupTitle = document.createElement('span');
				popupTitle.id = "ll-dialog-title";
				popupTitle.innerHTML = "Book now";
				header.appendChild(popupTitle);

				//Close button in the header
				var closeButton = document.createElement('a');
				closeButton.id = 'll-close';
				closeButton.className = 'll-close';
				closeButton.href = '#';
				closeButton.innerHTML = '&times; Close';
				closeButton.addEventListener("click", function(e){
					e.preventDefault();
					self.close();
					return false;
				});
				header.appendChild(closeButton);

				dialog.appendChild(header);

				//Add dialog content
				var content = document.createElement('div');
				content.id = "ll-dialog-content";
				content.className = "ll-dialog-content";
				//looks like mobile
				if (window.innerWidth <= 767 || window.innerWidth < window.innerHeight) {
					dialog.style.height = (window.innerHeight - window.innerHeight * 15/100) + 'px';
					content.style.height = ((window.innerHeight - window.innerHeight * 15/100) - 60) + 'px';
				}
				dialog.appendChild(content);

				//Append dialog iframe
				var iframe = licklist.initIframe(licklist.getDomain() + '/blank.iframe.html');
				iframe.name = "ll-popup";
				iframe.id = "ll-popup";
				content.appendChild(iframe);
				document.body.appendChild(dialog);
			},
			open: function(){
				document.documentElement.setAttribute('ll-scrollable', false);
				document.body.setAttribute('ll-scrollable', false);
			},
			close: function(){
				document.documentElement.setAttribute('ll-scrollable', true);
				document.body.setAttribute('ll-scrollable', true);
				document.getElementById('ll-popup').src=licklist.getDomain() + '/blank.iframe.html';
			}
		},
		/**
		 * Init events iframe
		 */
		events: function(){
			var target, venue_id;
			var elementUrl;
			var url = licklist.getDomain()+'/iframe/payment/events';
			var c = document.querySelectorAll('.lles'); //(l)ick(l)ist-(e)vents-(s)nippet
			for(var i=0;i<c.length;i++){
				if (!c[i].hasAttribute('ll-initialized')) {
					c[i].setAttribute('ll-initialized', 'initialized');
					//Set venue_id parent
					if(c[i].getAttribute('venue-id') !== null || c[i].getAttribute('data-id') !== null){
						if(c[i].getAttribute('venue-id')){
							venue_id = c[i].getAttribute('venue-id');
						} else {
							venue_id = c[i].getAttribute('data-id');
						}
					}
					elementUrl = url+'/index/'+venue_id;
					//Check where to load the next step
					if(c[i].hasAttribute('target')){
						if(c[i].hasAttribute('target')){
							target = c[i].getAttribute('target');
							if(target == 'popup'){
								target = 'll-popup';
							}
							elementUrl += '?target='+target;
						}
					} else if(c[i].hasAttribute('data-parent')){
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_parent';
					} else {
						//elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_new';
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'iframed=1';
					}
					if (getQueryStringValue('lls')) {
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'lls=' + getQueryStringValue('lls');
					}
					c[i].innerHTML = '';
					c[i].appendChild(this.initIframe(elementUrl));
				}
			}
		},

		multiEvents: function(){
			var target, venue_id;
			var elementUrl;
			var selector;
			var type;
			var url = licklist.getDomain()+'/iframe/payment/bookings/event_selector';
			var c = document.querySelectorAll('.llmes'); //(l)ick(l)ist-(e)vents-(s)nippet
			for(var i=0;i<c.length;i++) {
				if (!c[i].hasAttribute('ll-initialized')) {
					c[i].setAttribute('ll-initialized', 'initialized');
					//Set venue_id parent
					if(c[i].getAttribute('venue-id') !== null || c[i].getAttribute('data-id') !== null){
						if(c[i].getAttribute('venue-id')){
							venue_id = c[i].getAttribute('venue-id');
						} else {
							venue_id = c[i].getAttribute('data-id');
						}
					}
					elementUrl = url+'/'+venue_id;
					//Check where to load the next step
					if(c[i].hasAttribute('target')){
						if(c[i].hasAttribute('target')){
							target = c[i].getAttribute('target');
							if(target == 'popup'){
								target = 'll-popup';
							}
							elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=' + target;
						}
					} else if(c[i].hasAttribute('data-parent')){
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_parent';
					} else {
						//elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_new';
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'iframed=1';
					}
					if (
							c[i].getAttribute('selector') !== null ||
							c[i].getAttribute('data-selector') !== null
					) {
						if(c[i].getAttribute('selector') !== null) {
							selector = c[i].getAttribute('selector');
						} else {
							selector = c[i].getAttribute('data-selector');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'selector=' + selector;
					}
					if(c[i].getAttribute('type') !== null || c[i].getAttribute('data-type') !== null){
						if(c[i].getAttribute('type')){
							type = c[i].getAttribute('type');
						} else {
							type = c[i].getAttribute('data-type');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'type=' + type;
					}
					if (
							c[i].getAttribute('event-id') !== null ||
							c[i].getAttribute('data-event-id') !== null
					) {
						if(c[i].getAttribute('event-id') !== null) {
							event = c[i].getAttribute('event-id');
						} else {
							event = c[i].getAttribute('data-event-id');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'event_id=' + event;
					}
					var date;
					if (
						c[i].getAttribute('date') !== null ||
						c[i].getAttribute('data-date') !== null
					) {
						if(c[i].getAttribute('date') !== null) {
							date = c[i].getAttribute('date');
						} else {
							date = c[i].getAttribute('data-date');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'date=' + date;
					}
					if(c[i].hasAttribute('data-people')){
						var people = c[i].getAttribute('data-people');
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'people=' + people;
					}
					c[i].innerHTML = '';
					c[i].appendChild(this.initIframe(elementUrl));
				}
			}
		},

		/**
		 * Init bookings iframe
		 */
		bookings: function(){
			var target; 
			var url = licklist.getDomain() + '/iframe/payment';
			var c = document.querySelectorAll('.llbs'); //(l)ick(l)ist-(b)ooking-(s)nippet
			var elementUrl;
			var category_id = null;
			var zone_id = null;
			var venue_id = null;
			var date = null;
			var product = null;
			var days = null;
			var step = null;
			for(var i=0;i<c.length;i++){
				if (!c[i].hasAttribute('ll-initialized')) {
					c[i].setAttribute('ll-initialized', 'initialized');
					//Set venue_id parent
					if(c[i].getAttribute('venue-id') !== null || c[i].getAttribute('data-id') !== null){
						if(c[i].getAttribute('venue-id')){
							venue_id = c[i].getAttribute('venue-id');
						} else {
							venue_id = c[i].getAttribute('data-id');
						}
					}
					//url = url+'/'+c[i].getAttribute('data-id')
					if (
						(
							c[i].getAttribute('event-id') !== null ||
							c[i].getAttribute('data-event-id') !== null
						) &&
						(
							c[i].getAttribute('date') !== null ||
							c[i].getAttribute('data-date') !== null
						)
					) {
						if(c[i].getAttribute('event-id') !== null) {
							event = c[i].getAttribute('event-id');
						} else {
							event = c[i].getAttribute('data-event-id');
						}
						if(c[i].getAttribute('date') !== null) {
							date = c[i].getAttribute('date');
						} else {
							date = c[i].getAttribute('data-date');
						}
						elementUrl = url + '/carts/view/' + venue_id + '/' + date + '/' + event +'?1';
					} else if (c[i].getAttribute('date') !== null || c[i].getAttribute('data-date') !== null) {
						if(c[i].getAttribute('date') !== null){
							date = c[i].getAttribute('date');
						} else {
							date = c[i].getAttribute('data-date');
						}
						elementUrl = url+'/carts/view/'+venue_id+'/'+date+'?1';
					} else if (c[i].getAttribute('product') !== null || c[i].getAttribute('data-product') !== null) {
						if(c[i].getAttribute('product') !== null){
							product = c[i].getAttribute('product');
						} else {
							product = c[i].getAttribute('data-product');
						}
						elementUrl = url+'/carts/product/'+venue_id+'/'+product+'?1';
					} else {
						elementUrl = url+'/bookings/form/'+venue_id+"?1";
					}
					//Add preselected category to the url
					if(c[i].getAttribute('category') !== null || c[i].getAttribute('data-category') !== null){
						if(c[i].getAttribute('category') !== null){
							category_id = c[i].getAttribute('category');
						} else {
							category_id = c[i].getAttribute('data-category');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'category_id='+ category_id;
					}
					//Add preselected zone_id to the url
					if(c[i].getAttribute('zone') !== null || c[i].getAttribute('data-zone') !== null){
						if(c[i].getAttribute('zone') !== null){
							zone_id = c[i].getAttribute('zone');
						} else {
							zone_id = c[i].getAttribute('data-zone');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'zone_id='+ zone_id;
					}
					//Add step
					if(c[i].getAttribute('step') !== null || c[i].getAttribute('data-step') !== null){
						if(c[i].getAttribute('step') !== null){
							step = c[i].getAttribute('step');
						} else {
							step = c[i].getAttribute('data-step');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'step=' + step;
					}

					//Add preselected category to the url
					if(c[i].getAttribute('exclusive-category') !== null){
						category_id = c[i].getAttribute('exclusive-category');
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'category_id='+ category_id + '&exclusive=1';
					}

					//Add days attribute as number of days for the event
					if(c[i].getAttribute('days') !== null || c[i].getAttribute('data-days') !== null){
						if(c[i].getAttribute('days') !== null){
							days = c[i].getAttribute('days');
						} else {
							days = c[i].getAttribute('data-days');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'days='+ days;
					}

					//Check where to load the next step
					if(c[i].hasAttribute('target')){
						if(c[i].hasAttribute('target')){
							target = c[i].getAttribute('target');
							if(target == 'popup'){
								target = 'll-popup';
							}
							elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target='+target;
						}
					} else if(c[i].hasAttribute('data-parent')){
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_parent';
					} else {
						//elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_new';
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'?iframed=1';
					}
					if (getQueryStringValue('lls')) {
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'lls=' + getQueryStringValue('lls');
					}
					//check if there are parameters var
					if (c[i].hasAttribute('parameters')) {
						if (c[i].getAttribute('parameters')) {
							elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'parameters=' + c[i].getAttribute('parameters');
						} else {
							elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'parameters=1';
						}
					}
					if(c[i].hasAttribute('data-people')){
						var people = c[i].getAttribute('data-people');
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'people=' + people;
					}
					c[i].innerHTML = '';
					c[i].appendChild(this.initIframe(elementUrl));
				}
			}
		},

		/**
		 * Init bookings iframe
		 */
		enquiries: function(){
			var target; 
			var url = licklist.getDomain() + '/iframe/payment';
			var c = document.querySelectorAll('.llenqs'); //(l)ick(l)ist-(enq)uiries-(s)nippet
			var elementUrl;
			var category_id = null;
			var venue_id = null;
			var date = null;
			var product = null;
			var days = null;
			for(var i=0;i<c.length;i++){
				if (!c[i].hasAttribute('ll-initialized')) {
					c[i].setAttribute('ll-initialized', 'initialized');
					//Set venue_id parent
					if(c[i].getAttribute('venue-id') !== null || c[i].getAttribute('data-id') !== null){
						if(c[i].getAttribute('venue-id')){
							venue_id = c[i].getAttribute('venue-id');
						} else {
							venue_id = c[i].getAttribute('data-id');
						}
					}
					//url = url+'/'+c[i].getAttribute('data-id')
					if (c[i].getAttribute('date') !== null || c[i].getAttribute('data-date') !== null) {
						if(c[i].getAttribute('date') !== null){
							date = c[i].getAttribute('date');
						} else {
							date = c[i].getAttribute('data-date');
						}
						elementUrl = url+'/bookings/index/'+venue_id+'?data[date]='+date;
					} else {
						elementUrl = url+'/bookings/form/'+venue_id+"?type=enquiry";
					}

					//Add preselected category to the url
					if(c[i].getAttribute('category') !== null || c[i].getAttribute('data-category') !== null){
						if(c[i].getAttribute('category') !== null){
							category_id = c[i].getAttribute('category');
						} else {
							category_id = c[i].getAttribute('data-category');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'category_id='+ category_id;
					}

					//Add preselected zone_id to the url
					if(c[i].getAttribute('zone') !== null || c[i].getAttribute('data-zone') !== null){
						if(c[i].getAttribute('zone_id') !== null){
							zone_id = c[i].getAttribute('zone_id');
						} else {
							zone_id = c[i].getAttribute('data-category');
						}
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'zone_id='+ zone_id;
					}

					//Add preselected category to the url
					if(c[i].getAttribute('exclusive-category') !== null){
						category_id = c[i].getAttribute('exclusive-category');
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?') + 'category_id='+ category_id + '&exclusive=1';
					}

					//Check where to load the next step
					if(c[i].hasAttribute('target')){
						if(c[i].hasAttribute('target')){
							target = c[i].getAttribute('target');
							if(target == 'popup'){
								target = 'll-popup';
							}
							elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target='+target;
						}
					} else if(c[i].hasAttribute('data-parent')){
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_parent';
					} else {
						//elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_new';
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'?iframed=1';
					}
					if (getQueryStringValue('lls')) {
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'lls=' + getQueryStringValue('lls');
					}
					c[i].innerHTML = '';
					c[i].appendChild(this.initIframe(elementUrl));
				}
			}
		},

		/**
		 * Init venue map iframe
		 */
		maps: function(){
			var target, date;
			var url = licklist.getDomain() + '/iframe/payment';
			var c = document.querySelectorAll('.llms'); //(l)ick(l)ist-(m)ap-(s)nippet
			var elementUrl;
			for(var i=0;i<c.length;i++){
				if (!c[i].hasAttribute('ll-initialized')) {
					c[i].setAttribute('ll-initialized', 'initialized');
					elementUrl = url+'/carts/map/'+c[i].getAttribute('data-id');
					if(c[i].getAttribute('date') !== null || c[i].getAttribute('data-date') !== null){
						if(c[i].getAttribute('date') !== null){
							date = c[i].getAttribute('date');
						} else {
							date = c[i].getAttribute('data-date');
						}
						elementUrl += '/'+date;
					}
					if(c[i].hasAttribute('target')){
						if(c[i].hasAttribute('target')){
							target = c[i].getAttribute('target');
							if(target == 'popup'){
								target = 'll-popup';
							}
							elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target='+target;
						}
					} else if(c[i].hasAttribute('data-parent')){
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_parent';
					} else {
						//elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_new';
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'?iframed=1';
					}
					if (getQueryStringValue('lls')) {
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'lls=' + getQueryStringValue('lls');
					}
					c[i].innerHTML = '';
					c[i].appendChild(this.initIframe(elementUrl));
				}
			}
		},

		venues: function(){
			var target;
			var elementUrl, venue_id, date;
			var url = licklist.getDomain()+'/iframe/venues/venue_list';
			var c = document.querySelectorAll('.llvl'); //(l)ick(l)ist-(e)vents-(s)nippet
			for(var i=0;i<c.length;i++){
				if (!c[i].hasAttribute('ll-initialized')) {
					c[i].setAttribute('ll-initialized', 'initialized');
					//Set venue_id parent
					if(c[i].getAttribute('venue-id') !== null || c[i].getAttribute('data-id') !== null){
						if(c[i].getAttribute('venue-id')){
							venue_id = c[i].getAttribute('venue-id');
						} else {
							venue_id = c[i].getAttribute('data-id');
						}
					}
					elementUrl = url + '?venues=' + venue_id;
					if (c[i].getAttribute('date') !== null || c[i].getAttribute('data-date') !== null) {
						if(c[i].getAttribute('date') !== null){
							date = c[i].getAttribute('date');
						} else {
							date = c[i].getAttribute('data-date');
						}
						elementUrl = elementUrl + '&date='+date;
					}
					//Check where to load the next step
					if(c[i].hasAttribute('target')){
						if(c[i].hasAttribute('target')){
							target = c[i].getAttribute('target');
							if(target == 'popup'){
								target = 'll-popup';
								elementUrl += '&target='+target;
							}
						}
					} else if(c[i].hasAttribute('data-parent')){
						elementUrl += '&target=_parent';
					} else {
						//elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'target=_new';
						elementUrl += (elementUrl.indexOf('?') != -1 ? '&' : '?')+'?iframed=1';
					}
					c[i].innerHTML = '';
					c[i].appendChild(this.initIframe(elementUrl));
				}
			}
		},

		buttons: function(){
			var target; 
			var url;
			var c = document.querySelectorAll('.llb'); //(l)ick(l)ist-(b)button
			var elementUrl;
			var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
			function click(e) {
				var element = (e.toElement) ? e.toElement : e.target;
				
				//find the closes element which has the llb class
				element = element.closest('.llb');

				var url;
				var title = element.getAttribute('title');
				
				if (
					typeof element.getAttribute('data-url') != 'undefined' &&
					element.getAttribute('data-url')
				) {
					url = element.getAttribute('data-url');
				} else if (typeof element.href != 'undefined' && element.href) {
					url = element.href;
				}
				if (window.innerWidth <= 767 || window.innerWidth < window.innerHeight) {
					if (element.tagName == 'BUTTON') {
						window.location = url;
					}
				} else {
					e.preventDefault();
					licklist.popup.open();
				}

				if (typeof element.getAttribute('title') && element.getAttribute('title')) {
					document.getElementById('ll-dialog-title').innerHTML=element.getAttribute('title');
				} else {
					document.getElementById('ll-dialog-title').innerHTML='BOOK NOW';
				}
				console.log(url);
				document.getElementById('ll-popup').src=url;
			}
			for(var i=0;i<c.length;i++){
				if (!c[i].hasAttribute('ll-initialized')) {
					c[i].setAttribute('ll-initialized', 'initialized');
					c[i].addEventListener('click', click);
				}
			}
		},

		/**
		 * Init the iframes
		 */
		init: function() {
			//this.initCover();
			var self = this;
			var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
			var messageEvent = ((eventMethod == "attachEvent") ? "onmessage" : "message");
			window[eventMethod](messageEvent, function (e) {
				var json;
				try {
					/* if (e.origin != licklist.getDomain()) {
						return false;
					} */
					if(typeof e.data.iframe === 'undefined'){
						json = eval('(' + e.data + ')');
					} else {
						json = e.data;
					}
					if(typeof json.iframe !== 'undefined'){
						if(typeof json.height !== 'undefined'){
							var el = document.getElementById(json.iframe);
							if (el) {
								el.style.height = json.height+'px';
								if (json.scroll) {
									var position = el.getBoundingClientRect();
									window.scroll(0, (position.top + window.scrollY - 15));
								}
							}
						} else if (typeof json.close !== 'undefined') { //popup close signal from the iframe
							self.popup.close();
						} else if (typeof json.redirect !== 'undefined') { //redirect parent iframe to another page
							window.location = json.redirect;
						}
						/*
						if(typeof json.background !== 'undefined'){
							document.getElementById(json.iframe).style.backgroundColor = json.background;
						}
						*/
						if(typeof json.open !== 'undefined'){
							self.popup.open();
							if (json.id) {
								window.location = '#ll-' + json.id;
							}
						}
						//push dataLayer
						if(typeof json.analytics !== 'undefined'){
							window.dataLayer = window.dataLayer || [];
							console.log('Analytics pushed');
							console.log(json.analytics);
							window.dataLayer.push(json.analytics);
						}
					}
				} catch (err) {
					console.log(err);
				}
			}, false);
		},
		/**
		 * Open existing url to track event
		 * @return {[type]} [description]
		 */
		openPopup: function() {
			var url = domain + '/popup';
			var hash;
			if (window.location.hash) {
				hash = window.location.hash;
				if (hash.match(/#ll\-event\-[0-9]+/)) {
					//self.popup.open(title);
					url += '/event/' + hash.split('-')[2];
					url += '?iframed=1';
					document.getElementById('ll-popup').src=url;
					licklist.popup.open('Event Details');
				} else if (hash.match(/#ll\-cart\.[0-9]+\.[0-9]{4}\-[0-9]{2}-[0-9]{2}.[0-9]+/)) {
					url += '/payment/carts/view/' + hash.split('.')[1];
					url += '/' + hash.split('.')[2];
					url += '/' + hash.split('.')[3];
					url += '?iframed=1';
					document.getElementById('ll-popup').src=url;
					licklist.popup.open('Booking Details');
				}
			}
 		}
	}
	docReady(function(){
		if(!document.documentElement.hasAttribute('ll-initialized')){
			//var body = document.body.innerHTML;
			//var wrapper = '<div class="ll-root-wrapper">' + body + '</div>';
			//document.body.innerHTML = wrapper;
			document.documentElement.setAttribute('ll-initialized', 'initialized');
			licklist.styles();
			licklist.popup.init();
			licklist.events();
			licklist.multiEvents();
			licklist.bookings();
			licklist.enquiries();
			licklist.maps();
			licklist.venues();
			licklist.buttons();
			//setInterval(function(){
				licklist.init();
			//}, 500);
			licklist.openPopup();
		}
		document.addEventListener("ll-reinit", function(){
			licklist.events();
			licklist.bookings();
			licklist.maps();
		}, false);
	});

	function getQueryStringValue (key) {
		return decodeURIComponent(
			window.location.search.replace(
				new RegExp(
					"^(?:.*[&\\?]" +
					encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
					"(?:\\=([^&]*))?)?.*$", "i"),
					"$1"
			)
		);
	}
})();
