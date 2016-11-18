/*
#
# img2musicXML.js - v0.1-Alpha
# Apache v2 License
#
*/

// Create img2musicXML (abbreviated as i2mx) namespace
var i2mx = i2mx || { };

// Create JsCheckup class (@TODO: Move to inside namespace)
var JsCheckup = function() {
	this.divClassName = "i2mx-checkup";
	
	this.activate = function() {
		var divList = document.getElementsByClassName(this.divClassName);
		
		// @TODO: Implement multiple divs support
		divList[0].innerHTML = "No checlist for now, but img2musicXML loaded successfully!"; // @TODO: Multi-line
	}
	
}

var jsCheckup = new JsCheckup();

// @TODO: Check window.onload vs document.onload 
// @TODO: Use event listener instead of onload
document.onload = function() {
	jsCheckup.activate();
}
