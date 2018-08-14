for(var i = 0; i < tabs.length; i++) {
	var tab = tabs[i];
	
	$("#data").append(buildTab(tab));
}

// Function to render
function render() {
	currentAcolytes = {};
	$("#acolytes .content").empty();
	
	var acolyteList = worldState.PersistentEnemies;
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
			
			if(localStorage.sound && localStorage.sound > 0) {
				audio.play();
			}
			if(localStorage.notifications) {
				note('img/' + acoName + '.png', name.toUpperCase() + "'s location is now:\n" + location);
			}
		}
			
		var output = [];
		output.push('<div id="acolyte-' + name + '" class="card grey lighten-4 horizontal hoverable">');
		output.push('	<div class="card-image">');
		output.push('		<img src="img/' + acoName + '.png">');
		output.push('	</div>');
		output.push('	<div class="card-stacked">');
		output.push('		<div class="card-content flow-text">');
		output.push("			<b>" + name.toUpperCase() + "</b> <a class='right' target='_blank' href='http://warframe.wikia.com/wiki/" + name + "'>Wiki page</a>");
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
		
		$("#acolytes .content").append(output.join(""));
		
	} else {
		for(var x = 0; x < acolyteOrder.length; x++) {
			var name = acolyteOrder[x];
			
			if(currentAcolytes[name]) {
				$("#acolytes .content").append(currentAcolytes[name]);
			}
		}
	}
	
	// Load plugins
	loadPlugins();
	//Night mode
	if(localStorage.night) {
		loadNight();
	}
}
