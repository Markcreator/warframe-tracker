// HTTPS upgrade
if(window.location.toString().startsWith("http://")) {
	window.location = "https://" + window.location.toString().split("http://")[1];
}

var data = {};

$(function() {
	console.log("JQuery loaded.");
	
	$.getScript("js/util.js", function() {
		console.log("Utils loaded.");
		
		$.getScript("js/ui.js", function() {
			console.log("UI loaded.");
			
			$.getScript("js/data.js", function() {
				console.log("Data loaded.");
				
				$.getScript("js/timer.js", function() {
				console.log("Timer loaded.");
				
					$.getScript("js/app.js", function() {
						console.log("App loaded.");
					});
				});
			});
		});
	});
});