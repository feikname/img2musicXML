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
	
	this.checkForId = function(id) {
		if(document.getElementById(id) !== null) {
			return true;
		}
		
		return false;
	}
	
	this.activate = function() {
		// @TODO: Use HTML generator
		// @TODO: Wait for this to be ready to load other components.
		
		// Initial values
		var div = document.getElementById(this.divId);
		var EOL = "<br>"
		var checkupText = "<pre>";
		
		// Do the testing
		checkupText += "Starting tests... " + EOL;
		
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			checkupText += "File and Blob APIs -> OK " + EOL;
		}
		
		var idList = ["i2mx-image-manager", "i2mx-img_man-file-input", 
			"i2mx-img_man-add-file-btn", "i2mx-img_man-file-list"];
			
		for(var i=0; i<idList.length; i++) {
			var id = idList[i];
			
			checkupText += "Checking if \"" + id + "\" exists... -> ";
			
			if(this.checkForId(id)) {
				checkupText += "OK";
			} else {
				checkupText += "- ERROR! -";
			}
			
			checkupText += EOL;
		}
		
		// Update DOM
		checkupText += "</pre>";
		div.innerHTML = checkupText;
	}
}

// Variables
var jsCheckup = new JsCheckup();

// @TODO: Use event listener instead of onload
window.onload = function() {
	jsCheckup.activate();
}
