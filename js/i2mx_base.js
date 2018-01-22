/*
#
# i2mx_base.js - v0.1-Alpha
# Apache v2 License
#
*/

// Create img2musicXML (abbreviated as i2mx) namespace
var i2mx = {}

// Create i2mx "Data" class
i2mx.Data = new (function() {
    this.version_major = 0
    this.version_minor = 0
    this.version_patch = 0

    this.lastModification = "2018-01-22" // YYYY-MM-DD
})

// @TODO: Cache system?
// Create the i2mx "Elements" class
i2mx.Elements = new (function() {
    // "About"
    this.lastModification = function() {
        var id = "i2mx-ver_info-last-modification"
        return document.getElementById(id)
    }

    // "Page Manager"
    this.pageList = function() {
        var id = "i2mx-page_mngr-page-list"
        return document.getElementById(id)
    }

    this.pageCount = function() {
        var id = "i2mx-page_mngr-page-count"
        return document.getElementById(id)
    }

    this.addNewPageBtn = function() {
        var id = "i2mx-page_mngr-add-new-page-btn"
        return document.getElementById(id)
    }

    this.imgInput = function() {
        var id = "i2mx-page_mngr-assign-image-to-item-input"
        return document.getElementById(id)
    }

    // "Canvas"
    this.drawingCanvas = function() {
        var id = "i2mx-canvas"
        return document.getElementById(id)
    }

    this.closeCurrentPageBtn = function() {
        var id = "i2mx-canvas-close-current-page-btn"
        return document.getElementById(id)
    }

    this.canvasImageSettings = function() {
      var id = "i2mx-canvas-image-settings"
      return document.getElementById(id)
    }
})

// https://stackoverflow.com/a/5306832/3109177
Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    //return this; // for testing purposes
};
