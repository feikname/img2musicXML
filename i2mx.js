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
i2mx.evt       = {};

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
i2mx.instances.imageManager = new i2mx.classes.ImageManager();

// Create functions
i2mx.load = function() {
    // Show last modification date to user
    var lastModification = "2017-02-11"; // YYYY-MM-DD (BRT)
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

window.addEventListener("load", i2mx.load);
