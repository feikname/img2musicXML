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
        var id = parseInt(clickedButton.target.getAttribute("data-image-id"));

        i2mx.ImageManager.files[id] = null; // Delete image
        i2mx.ImageManager.activeFiles--;

        i2mx.ImageManager.render();
    }

    this.event.visualizeFile = function(clickedButton) {
        var id = parseInt(clickedButton.target.getAttribute("data-image-id"));

        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            document.getElementById("i2mx-img_mngr-current-image").src = e.target.result;
            document.getElementById("i2mx-img_mngr-visualize-image-div").style.display = "block";
        }

        fileReader.readAsDataURL(i2mx.ImageManager.files[id]);
    }

    this.event.hideImage = function(clickedButton) {
        var id = parseInt(clickedButton.target.getAttribute("data-image-id"));

        document.getElementById('i2mx-img_mngr-visualize-image-div').style.display = "none";
    }

    this.createImgHTML = function(img, id, ord) {
        // Create "Remove from list" button
        var imgDeleteBtn = document.createElement("input");
        imgDeleteBtn.type = "submit";
        imgDeleteBtn.classList.add("i2mx-img_mngr-remove-item-btn");
        imgDeleteBtn.classList.add("button-as-text");
        imgDeleteBtn.value = "Remove from list"
        imgDeleteBtn.setAttribute("data-image-id", id.toString());

        // Create "View" button
        var imgViewBtn = document.createElement("input");
        imgViewBtn.type = "submit";
        imgViewBtn.classList.add("i2mx-img_mngr-visualize-item-btn");
        imgViewBtn.classList.add("button-as-text");
        imgViewBtn.value = "View"
        imgViewBtn.setAttribute("data-image-id", id.toString());


        var newString = (ord) + " - (id="+id+") " + img.name + " (" +
            imgDeleteBtn.outerHTML + ") (" + imgViewBtn.outerHTML + ")<br>";

        return newString;
    }

    this.render = function() {
        var fileListEl = i2mx.Elements.imageList()
        var files = this.files;

        if(this.activeFiles == 0) {
            fileListEl.innerHTML = "Oops! There are no files here yet."
            return;
        }

        var newHTML = "";
        var ord = 0;
        for(id=0; id<files.length; id++) {
            if(i2mx.ImageManager.files[id] !== null) {
                var img = i2mx.ImageManager.files[id];
                newHTML += this.createImgHTML(img, id, ++ord)
            }
        }

        fileListEl.innerHTML = newHTML;

        var btns;

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

        // TODO: Use a "dialog" element if available
        window.alert(file.name + " is not an image file! (MIME type: " + file.type + ")");

        return false;
    }

    this.load = function() {
        i2mx.Elements.addImageBtn().addEventListener("click", this.event.addFiles)
        i2mx.Elements.hideImageBtn().addEventListener("click", this.event.hideImage)
    };
});
