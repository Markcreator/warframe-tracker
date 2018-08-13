// HTTPS upgrade
if(window.location.toString().startsWith("http://")) {
	window.location = "https://" + window.location.toString().split("http://")[1];
}

$(function() {
	console.log("JQuery loaded.");
	
	$.getScript("js/util.js", function() {
		console.log("Utils loaded.");
		
		$.getScript("js/app.js", function() {
			console.log("App loaded.");
		});
	});
});