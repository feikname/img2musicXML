/*
#
# i2mx_base.js - v0.1-Alpha
# Apache v2 License
#
*/

// Create img2musicXML (abbreviated as i2mx) namespace
var i2mx = {};

// Create i2mx "Data" class
i2mx.Data = new (function() {
    this.version_major = 0;
    this.version_minor = 0;
    this.version_patch = 0;

    this.lastModification = "2017-06-16"; // YYYY-MM-DD
});

// @TODO: Cache system?
// Create the i2mx "Elements" class
i2mx.Elements = new (function() {
    this.lastModification = function() {
        let id = "i2mx-ver_info-last-modification";
        return document.getElementById(id);
    };

    this.imageList = function() {
        let id = "i2mx-img_mngr-file-list";
        return document.getElementById(id);
    };

    this.addImageBtn = function() {
        let id = "i2mx-img_mngr-add-file-btn";
        return document.getElementById(id);
    };

    this.fileInput = function() {
        let id = "i2mx-img_mngr-file-input";
        return document.getElementById(id);
    };
});
