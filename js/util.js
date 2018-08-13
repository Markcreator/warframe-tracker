// Load tooltips
$('.tooltipped').tooltip();
$('.dropdown-button').dropdown({
	constrainWidth: false
});
	
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
	render();
});
setPlatform(platform);

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
	if($(this).hasClass("amber")) {
		$(this).removeClass("amber");
		$(this).addClass("blue darken-3");
		$("#nightIcon").text("brightness_3");
		localStorage.night = true;
		
		$("body, .nav-wrapper, .card, a, li").not(".btn, .brand-logo, footer li").addClass("darken-4").not("li a").addClass("grey-text");
		$("img").addClass("darkImg");
		
	} else {
		$(this).addClass("amber");
		$(this).removeClass("blue darken-3");
		$("#nightIcon").text("brightness_5");
		delete localStorage.night;
		
		$("body, .nav-wrapper, .card, a, li").not(".btn, .brand-logo, footer li").removeClass("darken-4").not("li a").removeClass("grey-text");
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
