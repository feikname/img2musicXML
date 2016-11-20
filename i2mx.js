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
		var div = document.getElementsByClassName(this.divId);
		
		div.innerHTML = "No checklist for now, but img2musicXML loaded successfully!"; // @TODO: Multi-line
	}
}

var jsCheckup = new JsCheckup();

// @TODO: Use event listener instead of onload
window.onload = function() {
	jsCheckup.activate();
}
