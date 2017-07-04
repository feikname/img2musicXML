/*
#
# i2mx_image_manager.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.ImageManager = new (function() {
    this.files = [];
    this.activeFiles = 0;

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
        let id = parseInt(clickedButton.target.getAttribute("data-image-id"));

        i2mx.ImageManager.files[id] = null; // Delete image
        i2mx.ImageManager.activeFiles--;

        i2mx.ImageManager.render();
    }

    this.event.visualizeFile = function(clickedButton) {
        let id = parseInt(clickedButton.target.getAttribute("data-image-id"));

        let fileReader = new FileReader();
        fileReader.onload = function(e) {
            let dataUrl = e.target.result;

            let modal = new tingle.modal();
            modal.setContent("<img style=\"max-height: 100%; max-width: 100%\" src=\"" + dataUrl + "\"></img>");

            modal.open();
        }

        fileReader.readAsDataURL(i2mx.ImageManager.files[id]);
    }

    this.createImgHTML = function(img, id, ord) {
        let newString = (ord) + " - (id="+id+") " + img.name +
            " (<input type=\"submit\" data-image-id=\"" + id + "\" value=\"" +
            "Remove from list" + "\" class=\"" +
            "i2mx-img_mngr-remove-item-btn button-as-text\">)" +
            " (<input type=\"submit\" data-image-id=\"" + id + "\" value=\"" +
            "View" + "\" class=\"" +
            "i2mx-img_mngr-visualize-item-btn button-as-text\">)" + "<br>";

        return newString;
    }

    this.render = function() {
        let fileListEl = i2mx.Elements.imageList()
        let files = this.files;

        if(this.activeFiles == 0) {
            fileListEl.innerHTML = "Oops! There are no files here yet."
            return;
        }

        let newHTML = "";
        let ord = 0;
        for(id=0; id<files.length; id++) {
            if(i2mx.ImageManager.files[id] !== null) {
                let img = i2mx.ImageManager.files[id];
                newHTML += this.createImgHTML(img, id, ++ord)
            }
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
            this.activeFiles++;
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
