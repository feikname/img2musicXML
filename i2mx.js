/*
#
# i2mx.js - v0.1-Alpha
# Apache v2 License
#
*/

// Create img2musicXML (abbreviated as i2mx) namespace
var i2mx = i2mx || { };

// Create JsCheckup class (@TODO: Move to inside namespace)
var JsCheckup = function() {
	this.divId = "i2mx-checkup";
	
	this.activate = function() {
		// @TODO: Use HTML generator
		// @TODO: Wait for this to be ready to load other components.
		
		// Initial values
		var div = document.getElementById(this.divId);
		var EOL = "<br>"
		var checkupText = "<pre>";
		
		// Start testing
		checkupText += "Starting tests... " + EOL;
		
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			checkupText += "File and Blob APIs -> OK " + EOL;
		}
		
		// Update DOM
		checkupText += "</pre>";
		div.innerHTML = checkupText;
	}
}

var jsCheckup = new JsCheckup();

// @TODO: Use event listener instead of onload
window.onload = function() {
	jsCheckup.activate();
}
