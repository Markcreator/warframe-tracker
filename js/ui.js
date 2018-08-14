function buildTab(name) {
	var output = [];
	
	output.push('<ul id="' + name.toLowerCase() + '" class="collapsible horizontal hoverable">');
	output.push('<li>');
	output.push('<div class="collapsible-header grey lighten-4 flow-text"><b>' + name + '</b></div>');
	output.push('<div class="content collapsible-body"><center class="flow-text">Coming soon!</center></div>');
	output.push('</li>');
	output.push('</ul>');
	
	return output.join("");
}