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
	
	this.checkEverything = function() {
		// @TODO: Use HTML generator
		
		// Check if i2mx can display the errors checking to the user
		if(!(this.checkForId(this.divId))) {
			document.documentElement.innerHTML = "i2mx fatal error."
			return false;
		}
		
		// Initial values
		var div = document.getElementById(this.divId);
		var EOL = "<br>"
		var checkupText = "<pre>";
		var errorsDetected=0;
		
		// Create the checkupText
		checkupText += "Starting tests... " + EOL;
		
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			checkupText += "File and Blob APIs -> OK " + EOL;
		}
		
		var idList = [
			"i2mx-image-manager", 
			"i2mx-img_man-file-input", 
			"i2mx-img_man-add-file-btn",
			"i2mx-img_man-file-list",
			"i2mx-ver_info-last-modification"
		];
			
		for(var i=0; i<idList.length; i++) {
			var id = idList[i];
			
			checkupText += "Checking if \"" + id + "\" exists... -> ";
			
			if(this.checkForId(id)) {
				checkupText += "OK";
			} else {
				errorsDetected++;
				checkupText += "ERROR!";
			}
			
			checkupText += EOL;
		}
		
		checkupText += EOL + errorsDetected + " errors detected" + EOL;
		
		if(errorsDetected>0) {
			checkupText += EOL + "img2musicXML loading ABORTED!" + EOL
		} else {
			checkupText += EOL + "img2musicXML will now load itself." + EOL
		}
		checkupText += "</pre>";
		
		// Update DOM
		div.innerHTML = checkupText;
		
		// Return value
		if(errorsDetected > 0) {
			return false;
		}
		
		return true;
	}
}

// Variables
var jsCheckup = new JsCheckup();

// Functions
function loadEverything() {
	// Show last modification date to user
	var lastModification = "2016-12-04";
	var el = document.getElementById("i2mx-ver_info-last-modification");
	el.innerHTML=lastModification;
}

// @TODO: Use event listener instead of onload
window.onload = function() {
	if(!jsCheckup.checkEverything()) {
		return;
	}
	
	loadEverything();
}
