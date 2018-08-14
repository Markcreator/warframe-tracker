// Start update loop
update();

// UI refreshing behaviour
function update() {
	updateWorldState(function() {
		loopCountdownUpdate(30, update);
	});
}

// Update countdown function
function loopCountdownUpdate(seconds, callback, timesLeft) {
	if(typeof(timesLeft) == 'undefined') {
		timesLeft = seconds;
	}
	$("#counter").text(timesLeft != 0 ? ('Updating in: ' + timesLeft + 's') : "");
	
	if(timesLeft == 0) {
		callback();
		
	} else {
		setTimeout(function() { loopCountdownUpdate(seconds, callback, timesLeft-1); }, 1000);
	}		
}

function startTimer(targetDiv, epoch, removeOnEnd) {
	setInterval(function() {
		var distance = epoch - new Date().getTime();
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		targetDiv.text(days + "d " + hours + "h " + minutes + "m " + seconds + "s");

		if (distance < 0) {
			clearInterval(this);
			removeOnEnd.remove();
		}
	}, 1000);
}