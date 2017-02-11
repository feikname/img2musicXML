/*
#
# i2mx_image_manager.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.ImageManager = new (function() {
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
});
