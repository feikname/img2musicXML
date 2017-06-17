/*
#
# i2mx_image_manager.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.ImageManager = new (function() {
    this.files = [];

    this.event = {};
    this.event.addFiles = function() {
        var files = i2mx.Elements.fileInput().files;

        for(var i=0; i<files.length; i++) {
            i2mx.ImageManager.add(files[i]);
        }

        i2mx.ImageManager.render();

        i2mx.Elements.fileInput().value = ""; // Reset
    }

    this.event.removeFile = function(clickedButton) {
        let id = clickedButton.target.getAttribute("data-id");
        id = parseInt(id);

        i2mx.ImageManager.files.splice(id, 1); // Delete image from the array

        i2mx.ImageManager.render();
    }

    this.event.visualizeFile = function(clickedButton) {
        let id = clickedButton.target.getAttribute("data-id");
        id = parseInt(id);

        let fileReader = new FileReader();
        fileReader.onload = function(e) {
            let dataUrl = e.target.result;

            let modal = new tingle.modal();
            modal.setContent("<img style=\"max-height: 100%; max-width: 100%\" src=\"" + dataUrl + "\"></img>");

            modal.open();
        }

        fileReader.readAsDataURL(i2mx.ImageManager.files[id]);
    }

    this.createImgHTML = function(img, id) {
        let newString = (id+1) + " - " + img.name +
            " (<input type=\"submit\" data-id=\"" + id + "\" value=\"" +
            "Remove from list" + "\" class=\"" +
            "i2mx-img_mngr-remove-item-btn button-as-text\">)" +
            " (<input type=\"submit\" data-id=\"" + id + "\" value=\"" +
            "View" + "\" class=\"" +
            "i2mx-img_mngr-visualize-item-btn button-as-text\">)" + "<br>";

        return newString;
    }

    this.render = function() {
        let fileListEl = i2mx.Elements.imageList()
        let files = this.files;

        if(files.length == 0) {
            fileListEl.innerHTML = "Oops! There are no files here yet."
            return;
        }

        let newHTML = "";
        for(var id=0, img; img=files[id]; id++) {
            newHTML += this.createImgHTML(img, id)
        }

        fileListEl.innerHTML = newHTML;

        let btns;

        btns = document.getElementsByClassName("i2mx-img_mngr-remove-item-btn");
        for(var id=0, btn; btn=btns[id]; id++) {
            btn.addEventListener("click", this.event.removeFile);
        }

        btns = document.getElementsByClassName("i2mx-img_mngr-visualize-item-btn");
        for(var id=0, btn; btn=btns[id]; id++) {
            btn.addEventListener("click", this.event.visualizeFile);
        }
    }

    this.add = function(file) {
        if(file.type.match('image.*')) {
            this.files.push(file);
            return true;
        }

        console.log(file.name + " is not an image file!" + " (" +
            file.type + ")");

        return false;
    }

    this.load = function() {
        i2mx.Elements.addImageBtn().addEventListener("click", this.event.addFiles)
    };
});
