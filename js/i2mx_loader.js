/*
#
# i2mx_loader.js - v0.1-Alpha
# Apache v2 License
#
*/

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
        i2mx.ImageManager.add(fileList[i]);
    }

    i2mx.ImageManager.render();

    input_el.value = ""; // Reset
}

window.addEventListener("load", i2mx.load);
