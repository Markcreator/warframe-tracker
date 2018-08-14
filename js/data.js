// URLs
var worldStateURLs = {
	"pc": "http://content.warframe.com/dynamic/worldState.php",
	"ps4": "http://content.ps4.warframe.com/dynamic/worldState.php",
	"xbox": "http://content.xb1.warframe.com/dynamic/worldState.php"
};
var solNodeURL = "data/solNodes.json";

// Load
$.getJSON(solNodeURL, function(nodeJSON) {
	nodes = nodeJSON;
});

// Helpers
function updateWorldState(callback) {
	$("#loader").show();
	$("#counter").hide();
	
	if(!worldStateURLs[platform]) {
		$("#counter").text("That platform does not exist.");
		$("#loader").hide();
		$("#counter").show();
		return;
	}
	
	getHTTPJSON(worldStateURLs[platform], function(worldStateJSON) {
		worldState = worldStateJSON;

		render();
		
		$("#loader").hide();
		$("#counter").show();
		
		callback();
	});
}

function getHTTPJSON(url, callback) {
	$.getJSON('https://whateverorigin.herokuapp.com/get?url=' + encodeURIComponent(url) + '&callback=?', function(data) {
		callback(JSON.parse(data.contents));
	});
}

// Data
var worldState;
var nodes;

// Acolytes
var useTestData = false;
var currentAcolytes = {};
var acolytes = {
	"StrikerAcolyte": {
		"name": "Angst",
		disc: false,
		arrival: 0,
		"mods": [
			"Body Count (51.52%)",
			"Repeater Clip (22.22%)",
			"Spring-Loaded Chamber (22.22%)",
			"Pressurized Magazine (4.04%)"
		]
	},
	"HeavyAcolyte": {
		"name": "Malice",
		disc: false,
		arrival: 0,
		"mods": [
			"Focused Defense (51.52%)",
			"Guided Ordnance (22.22%)",
			"Targeting Subsystem (22.22%)",
			"Narrow Barrel (4.04%)"
		]
	},
	"RogueAcolyte": {
		"name": "Mania",
		disc: false,
		arrival: 1534010400 * 1000,
		"mods": [
			"Catalyzer Link (51.52%)",
			"Embedded Catalyzer (22.22%)",
			"Weeping Wounds (22.22%)",
			"Nano-Applicator (4.04%)"
		]
	},
	"AreaCasterAcolyte": {
		"name": "Misery",
		disc: false,
		arrival: 1533754698763,
		"mods": [
			"Focused Defense (25.38%)",
			"Body Count (8.57%)",
			"Catalyzer Link (8.57%)",
			"Hydraulic Crosshairs (8.57%)",
			"Shrapnel Shot (8.57%)",
			"Bladed Rounds (3.70%)",
			"Blood Rush (3.70%)",
			"Embedded Catalyzer (3.70%)",
			"Guided Ordnance (3.70%)",
			"Laser Sight (3.70%)",
			"Repeater Clip (3.70%)",
			"Sharpened Bullets (3.70%)",
			"Spring-Loaded Chamber (3.70%)",
			"Targeting Subsystem (3.70%)",
			"Weeping Wounds (3.70%)",
			"Argon Scope (0.67%)",
			"Maiming Strike (0.67%)",
			"Nano-Applicator (0.67%)",
			"Narrow Barrel (0.67%)",
			"Pressurized Magazine (0.67%)"
		]
	},
	"ControlAcolyte": {
		"name": "Torment",
		disc: false,
		arrival: 1533837600 * 1000,
		"mods": [
			"Hydraulic Crosshairs (51.52%)",
			"Blood Rush (22.22%)",
			"Laser Sight (22.22%)",
			"Argon Scope (4.04%)"
		]
	},
	"DuellistAcolyte": {
		"name": "Violence",
		disc: false,
		arrival: 1533924000 * 1000,
		"mods": [
			"Shrapnel Shot (51.52%)",
			"Bladed Rounds (22.22%)",
			"Sharpened Bullets (22.22%)",
			"Maiming Strike (4.04%)"
		]
	}
};
var acolyteOrder = [
	"Angst",
	"Malice",
	"Mania",
	"Misery",
	"Torment",
	"Violence"
];
var regions = [
	"",
	"",
	"",
	"Mars",
	"Jupiter",
	"Saturn",
	"",
	"Neptune",
	"Pluto",
	"Ceres",
	"Eris",
	"Sedna",
	"Europa",
	"",
	"",
	"Phobos",
	""
];