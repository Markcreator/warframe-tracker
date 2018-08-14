function buildTab(name) {
	var output = [];
	
	output.push('<ul id="' + name + '" class="collapsible horizontal hoverable">');
	output.push('<li>');
	output.push('<div class="collapsible-header grey lighten-4 flow-text"><b>' + name + '</b></div>');
	output.push('<div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>');
	output.push('</li>');
	output.push('</ul>');
	
	return output.join("");
}