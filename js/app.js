
// Timers
for(var acolyte in acolytes) {
	var json = acolytes[acolyte];
	var name = json.name;
	var mods = json.mods;
	
	if(new Date().getTime() < json.arrival) {			
		var output = [];
		output.push('<div id="' + name + '-timer-card" class="card grey lighten-4 horizontal hoverable">');

		output.push('<div class="card-content flow-text">');
		output.push("	<b>" + name.toUpperCase() + '</b> arrives in: <span id="' + name + '-timer"></span>');
		output.push("			<a class='dropdown-button btn waves-effect waves-light grey darken-3 grey-text right' data-beloworigin='true' data-activates='dropdown-" + name + "'>Drops</a>");
		output.push("			<ul id='dropdown-" + name + "' class='dropdown-content'>");
		var x = 0;
		for(var x = 0; x < mods.length; x++) {
		output.push("				<li><a target='_blank' href='http://warframe.wikia.com/wiki/" + mods[x].split(" (")[0].replace(" ", "_") + "' class='grey lighten-4 grey-text text-darken-1'>" + mods[x] + "</a></li>");
		}
		output.push("			</ul");
		output.push('</div>');
	
		$("#timers").append(output.join(""));
		
		startTimer($("#" + name + "-timer"), json.arrival, $("#" + name + "-timer-card"));
	}
}

// Hidden Acolyte card builder
function hiddenAcolyte(name) {
	var output = [];
	output.push('<div id="acolyte-' + name + '" class="card grey lighten-4 horizontal hoverable">');

	output.push('<div class="card-content flow-text">');
	output.push("	<b>" + name.toUpperCase() + "</b>	<a id='show-" + name + "' name='" + name + "' class='pointer'>(Show)</a>");
	output.push('</div>');
	
	return output.join("");
}

// Function to render all Acolyte cards
function render() {
	$("#acolytes").empty();
	currentAcolytes = {};
	
	var acolyteList = worldState.PersistentEnemies;
	// Test data
	if(useTestData) {
		acolyteList = [{
			Icon: "/StrikerAcolyte.png",
			Discovered: false,
			Region: 4,
			HealthPercent: 0.123,
			LastDiscoveredLocation: "SolNode24"
		}];
	}
	for(var i = 0; i < acolyteList.length; i++) {
		var aco = acolyteList[i];
		
		var acoName = aco.Icon.split("/")[aco.Icon.split("/").length-1].split(".png")[0];
		var name = acolytes[acoName].name;
		var disc = aco.Discovered;
		var region = aco.Region;
		var health = aco.HealthPercent;
		var mods = acolytes[acoName].mods;
		var location = disc ? escapeHtml(nodes[aco.LastDiscoveredLocation].value + " [" + nodes[aco.LastDiscoveredLocation].type + "]") : ((region && regions[region] != "") ? "Signal detected on " + regions[region] : "Unknown");
		
		if(acolytes[acoName].disc != disc) {
			acolytes[acoName].disc = disc;
			
			if($("#sounds").hasClass("green")) {
				if(!localStorage["hide-" + name]) {
					audio.play();
				}
			}
			if($("#notifications").hasClass("green")) {
				if(!localStorage["hide-" + name]) {
					notifyAcolyte(acoName, name, disc, location);
				}
			}
		}
			
		var output = [];
		output.push('<div id="acolyte-' + name + '" class="card grey lighten-4 horizontal hoverable">');
		output.push('	<div class="card-image">');
		output.push('		<img src="img/' + acoName + '.png">');
		output.push('	</div>');
		output.push('	<div class="card-stacked">');
		output.push('		<div class="card-content flow-text">');
		output.push("			<b>" + name.toUpperCase() + "</b>	<a id='hide-" + name + "' name='" + name + "' class='pointer'>(Hide)</a>	<a class='right' target='_blank' href='http://warframe.wikia.com/wiki/" + name + "'>Wiki page</a>");
		output.push('			<div class="progress grey darken-2"> <div class="determinate health" style="width: ' + (health * 100) + '%"></div> </div>');
		output.push("			<span class='red-text'><b>Health:</b> " + (health * 100).toFixed(2) + "%</span>");
		output.push("			<br/>");
		output.push("			<b>Location:</b> " + location);
		output.push("			<br/>");
		output.push("			<a class='dropdown-button btn waves-effect waves-light grey darken-3 grey-text right' data-beloworigin='true' data-activates='dropdown-" + name + "'>Drops</a>");
		output.push("			<ul id='dropdown-" + name + "' class='dropdown-content'>");
		var x = 0;
		for(var x = 0; x < mods.length; x++) {
		output.push("				<li><a target='_blank' href='http://warframe.wikia.com/wiki/" + mods[x].split(" (")[0].replace(" ", "_") + "' class='grey lighten-4 grey-text text-darken-1'>" + mods[x] + "</a></li>");
		}
		output.push("			</ul");
		output.push('		</div>');
		output.push('	</div>');
		output.push('</div>');
		
		currentAcolytes[name] = output.join("");
	}
	
	if(acolyteList.length == 0) {
		var output = [];
		output.push('<div class="card grey lighten-4 hoverable">');
		output.push('	<div class="card-content flow-text green-text">');
		output.push('		The Acolyte event has ended. Thank you for playing!');
		output.push('	</div>');
		output.push('</div>');
		
		$("#acolytes").append(output.join(""));
		
	} else {
		function show() {
			var name = $(this).attr("name");
						
			delete localStorage["hide-" + name];
			render();
		}
		
		function hide() {
			var name = $(this).attr("name");
						
			localStorage["hide-" + name] = true;
			render();
		}
		
		for(var x = 0; x < acolyteOrder.length; x++) {
			var name = acolyteOrder[x];
			
			if(typeof(currentAcolytes[name]) != 'undefined') {
				if(!localStorage["hide-" + name]) {
					$("#acolytes").append(currentAcolytes[name]);
				
					$("#hide-" + name).click(hide);
					
				} else {
					$("#acolytes").append(hiddenAcolyte(name));
					
					$("#show-" + name).click(show);
				}
			}
		}
	}
	
	$('.dropdown-button').dropdown({
		constrainWidth: false
	});
	
	//Night mode
	if($("#night").hasClass("blue")) {
		$(".card, a").not(".btn, .brand-logo").addClass("darken-4").not("li a").addClass("grey-text");
		$("img").addClass("darkImg");
	}
}

// Notification behaviour
function notifyAcolyte(acoName, name, disc, location) {
	var title = "Acolyte Tracker";
	var options = {
		icon: 'img/' + acoName + '.png',
		body: name.toUpperCase() + "'s location is now:\n" + location
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
