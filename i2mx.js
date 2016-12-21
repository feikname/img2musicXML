/*
#
# i2mx.js - v0.1-Alpha
# Apache v2 License
#
*/

// Create img2musicXML (abbreviated as i2mx) namespace
var i2mx       = {};
i2mx.classes   = {};
i2mx.instances = {};
i2mx.functions = {};
i2mx.evt       = {};

i2mx.classes.JsCheckup = function() {
	this.divId = "i2mx-checkup";
	
	this.checkForId = function(id) {
		if(document.getElementById(id) !== null) {
			return true;
		}
		
		return false;
	}
	
	this.check = function() {
		// @TODO: Use HTML generator
		
		// Check if i2mx can display Javascript Checkup to the user
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

i2mx.classes.ImageManager = function() {
	this.fileListId = "i2mx-img_man-file-list";
	this.files = [];
	
	this.createImgHTML = function() {
	}
	
	this.render = function() {
		var files = this.files;
		var fileListEl = document.getElementById(this.fileListId);
		
		if(files.length == 0) {
			fileListEl.innerHTML = "Oops! There are no files here yet."
			return;
		}
		
		var newHTML = "";
		for(var i=0, img; img=files[i]; i++) {
			newHTML += (i+1) + " - " + img.name + "<br>"
		}
		
		fileListEl.innerHTML = newHTML;
	}
	
	this.add = function(file) {
		if(file.type.match('image.*')) {
			this.files.push(file);
			return;
		}
		
		window.alert("Warning: non-image file: " + file.name);
	}
}

// Instantiate classes
i2mx.instances.jsCheckup    = new i2mx.classes.JsCheckup();
i2mx.instances.imageManager = new i2mx.classes.ImageManager();

// Create functions
i2mx.load = function() {
	// Show last modification date to user
	var lastModification = "2016-12-21"; // YYYY-MM-DD (BRT)
	var el = document.getElementById("i2mx-ver_info-last-modification");
	el.innerHTML=lastModification;
	
	// Load i2mx image manager (img_man)
	var el = document.getElementById("i2mx-img_man-add-file-btn");
	el.onclick = i2mx.evt.addImage;
}

// Events
i2mx.evt.addImage = function() {
	var input_el = document.getElementById("i2mx-img_man-file-input");
	var fileList = input_el.files;
	
	for(var i=0; i<fileList.length; i++) {
		i2mx.instances.imageManager.add(fileList[i]);
	}	
	
	i2mx.instances.imageManager.render();
	
	input_el.value = ""; // Reset
}

// @TODO: Use event listener instead of onload
window.onload = function() {
	var jsCheckup = i2mx.instances.jsCheckup;

	if(!jsCheckup.check()) {
		return;
	}
	
	i2mx.load();
}
