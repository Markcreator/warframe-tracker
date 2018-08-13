// Load tooltips
$('.tooltipped').tooltip();

// Register service worker for PWA support
if("serviceWorker" in navigator) {
	navigator.serviceWorker.register("js/service-worker.js").then(function(registration){
		window.serviceWorker = registration;
	}).catch(function(error) {
		console.warn("Service worker registration failed", error);
	});
}

// Get which platform
var url_string = window.location.href;
var url = new URL(url_string);
var platform;
try {
	platform = url.searchParams.get("platform");
} catch(err) {
}
if(platform == null) {
	platform = "pc";
}
$("#" + platform).addClass("indigo-text");

// URLs
var worldStateURLs = {
	"pc": "http://content.warframe.com/dynamic/worldState.php",
	"ps4": "http://content.ps4.warframe.com/dynamic/worldState.php",
	"xbox": "http://content.xb1.warframe.com/dynamic/worldState.php"
};
var worldStateURL = worldStateURLs[platform];
var solNodeURL = "https://raw.githubusercontent.com/WFCD/warframe-worldstate-data/master/data/solNodes.json";

// Audio feedback
var audio = new Audio('sound/sound.mp3');
audio.volume = localStorage.sound || 0;
function loadSoundButton(volume) {
	if(!volume) {
		$("#sounds").addClass("red");
		$("#sounds").removeClass("green");
		$("#soundsIcon").text("volume_off");
	
	} else if(volume == 0.33) {
		$("#sounds").addClass("green");
		$("#sounds").removeClass("red");
		$("#soundsIcon").text("volume_down");
		
	} else {
		$("#sounds").addClass("green");
		$("#sounds").removeClass("red");
		$("#soundsIcon").text("volume_up");
	}
}
$("#sounds").click(function() {
	if(!localStorage.sound) {
		localStorage.sound = 0.33;
	} else if(localStorage.sound == 0.33) {
		localStorage.sound = 1.0;
	} else {
		delete localStorage.sound;
	}
	
	loadSoundButton(localStorage.sound);
	
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
	if($(this).hasClass("amber")) {
		$(this).removeClass("amber");
		$(this).addClass("blue darken-3");
		$("#nightIcon").text("brightness_3");
		localStorage.night = true;
		
		$("body, .nav-wrapper, .card, a").not(".btn, .brand-logo").addClass("darken-4").not("li a").addClass("grey-text");
		$("img").addClass("darkImg");
		
	} else {
		$(this).addClass("amber");
		$(this).removeClass("blue darken-3");
		$("#nightIcon").text("brightness_5");
		delete localStorage.night;
		
		$("body, .nav-wrapper, .card, a").not(".btn, .brand-logo").removeClass("darken-4").not("li a").removeClass("grey-text");
		$("img").removeClass("darkImg");
	}
});
if(localStorage.night) {
	$("#night").click();
}

// Notifications
$("#notifications").click(function() {
	if($(this).hasClass("red")) {
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
