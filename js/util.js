// Load plugins
function loadPlugins() {
	$('.tooltipped').tooltip();
	$('.dropdown-button').dropdown({
		constrainWidth: false
	});
	$('.collapsible').collapsible();
}

// Register service worker for PWA support
if("serviceWorker" in navigator) {
	navigator.serviceWorker.register("js/service-worker.js").then(function(registration){
		window.serviceWorker = registration;
	}).catch(function(error) {
		console.warn("Service worker registration failed", error);
	});
}

// Get which platform
function setPlatform(plat) {
	localStorage.platform = plat.toLowerCase();
	$("#" + plat.toLowerCase()).addClass("indigo-text");
	$("#platform").text(plat.toUpperCase());
	platform = plat.toLowerCase();
	window.location.hash = plat.toLowerCase();
}

var platform;
try {
	platform = window.location.hash.substr(1).toLowerCase();
} catch(err) {
}
if(!platform) {
	platform = localStorage.platform || "pc";
}
$(".platform").click(function() {
	setPlatform($(this).text());
	updateWorldState();
});
setPlatform(platform);

// Audio feedback
var audio = new Audio('sound/sound.mp3');
audio.volume = localStorage.sound || 0;
function loadSoundButton(volume) {
	$("#sound").val(audio.volume * 100);
}
$("#sound").change(function() {
	localStorage.sound = parseInt($("#sound").val()) / 100;
	
	audio.volume = localStorage.sound || 0;
	if(audio.volume != 0) {
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	}
});
loadSoundButton(localStorage.sound);

// Night mode
$("#night").click(function() {
	if(!localStorage.night) {	
		loadNight();
	} else {
		loadDay();
	}
});
function loadNight() {
	$("#night").removeClass("amber");
	$("#night").addClass("blue darken-3");
	$("#nightIcon").text("brightness_3");
	localStorage.night = true;
		
	$("body, .nav-wrapper, .card, a, li, .collapsible-header").not(".btn, .brand-logo, footer li").addClass("darken-4").not("li a").addClass("grey-text");
	$("img").addClass("darkImg");
}
function loadDay() {
	$("#night").addClass("amber");
	$("#night").removeClass("blue darken-3");
	$("#nightIcon").text("brightness_5");
	delete localStorage.night;
		
	$("body, .nav-wrapper, .card, a, li, .collapsible-header").not(".btn, .brand-logo, footer li").removeClass("darken-4").not("li a").removeClass("grey-text");
	$("img").removeClass("darkImg");
}
if(localStorage.night) {	
	loadNight();
}

// Notifications
if (!("Notification" in window)) {
	$("#notifications").remove();
} else {
	$("#notifications").click(function() {
		if(!localStorage.notifications) {
			Notification.requestPermission().then(function(result) {
				if(result === "granted") {
					$("#notifications").removeClass("red");
					$("#notifications").addClass("green");
					localStorage.notifications = true;
				}
			});

		} else {
			$(this).addClass("red");
			$(this).removeClass("green");
			delete localStorage.notifications;
		}
	});
	if(localStorage.notifications) {
		$("#notifications").click();
	}
}

// Notification behaviour
function note(icon, body) {
	var title = "Warframe Tracker";
	var options = {
		icon: icon,
		body: body
	};
	
	if (!("Notification" in window)) {
		return;
	
	} else if (Notification.permission === "granted") {
		var notification = new Notification(title, options);
	
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			if (permission === "granted") {
				var notification = new Notification(title, options);
			}
		});
	}
	// Else no notifications
}

// Helpers

function escapeHtml(unsafe) {
	return unsafe
		 .replace(/&/g, "&amp;")
		 .replace(/</g, "&lt;")
		 .replace(/>/g, "&gt;")
		 .replace(/"/g, "&quot;")
		 .replace(/'/g, "&#039;");
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function getId(a) { return a._id.$oid; }
function getTime(a) { return new Date(parseInt(a.$date.$numberLong)); }
