/*
#
# i2mx_page_manager.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.PageManager = new (function() {
    this.pages = [];
    this.activePages = 0;

    this.event = {};

    this.event.addNewPage = function() {
        var newPage = {}
        newPage.assignedImage = null;

        i2mx.PageManager.pages.push(newPage);
        i2mx.PageManager.activePages++;

        i2mx.PageManager.render();
    }

    this.createPageHTML = function(id, ord) {
        // Create "Remove page" button
        var pageDeleteBtn = document.createElement("input");
        pageDeleteBtn.type = "submit";
        pageDeleteBtn.classList.add("i2mx-page_mngr-remove-item-btn");
        pageDeleteBtn.classList.add("red-btn");
        pageDeleteBtn.classList.add("button-as-text");
        pageDeleteBtn.value = "Remove page";
        pageDeleteBtn.setAttribute("data-page-id", id);

        // Create "Assign image" button
        var assignImgBtn = document.createElement("input");
        assignImgBtn.type = "submit";
        assignImgBtn.classList.add("i2mx-page_mngr-assign-image-to-item-btn");
        assignImgBtn.classList.add("blue-btn");
        assignImgBtn.classList.add("button-as-text");
        assignImgBtn.value = "Assign image";
        assignImgBtn.setAttribute("data-page-id", id);

        // Create "Deassign image" button
        var deassignImgBtn = document.createElement("input");
        deassignImgBtn.type = "submit";
        deassignImgBtn.classList.add("i2mx-page_mngr-deassign-image-btn");
        deassignImgBtn.classList.add("red-btn");
        deassignImgBtn.classList.add("button-as-text");
        deassignImgBtn.value = "Deassign image";
        deassignImgBtn.setAttribute("data-page-id", id);

        // Create "Open in canvas" button
        var pageOpenBtn = document.createElement("input");
        pageOpenBtn.type = "submit";
        pageOpenBtn.classList.add("i2mx-page_mngr-open-item-btn");
        pageOpenBtn.classList.add("blue-btn");
        pageOpenBtn.classList.add("button-as-text");
        pageOpenBtn.value = "Open in canvas";
        pageOpenBtn.setAttribute("data-page-id", id);

        var img_id = this.pages[id].assignedImage;
        if(img_id == null) {
            var HTML = ord + " - (id="+id+") <b>Assign an image to this page to open it in the canvas!</b> (" +
                pageDeleteBtn.outerHTML + ") (" + assignImgBtn.outerHTML + ")<br>";
        } else {
            var HTML = ord + " - (id="+id+") Assigned to image of id <b>"+img_id+".</b> (" +
                pageDeleteBtn.outerHTML + ") (" + deassignImgBtn.outerHTML + ") (" +
                pageOpenBtn.outerHTML + ")<br>";
        }

        return HTML;
    }

    this.event.deletePage = function(clickedButton) {
        var id = parseInt(clickedButton.target.getAttribute("data-page-id"));

        i2mx.PageManager.pages[id] = null;
        i2mx.PageManager.activePages--;

        i2mx.PageManager.render();
    }

    this.event.assignImageToPage = function(clickedButton) {
        var id = parseInt(clickedButton.target.getAttribute("data-page-id"));

        img_id = prompt("Please enter the desired image id", "");

        // No input
        if(img_id === null || img_id === "") {
            return;
        }

        // Invalid ID (NaN)
        img_id = parseInt(img_id);
        if(isNaN(img_id)) {
            alert("Invalid ID! Please check again. (NaN)");
            return;
        }

        // Invalid ID (image with selected ID does not exist)
        if(!window.i2mx.ImageManager.has(img_id)) {
            alert("Invalid ID! Please check again. (NEI)");
            return;
        }

        i2mx.PageManager.pages[id].assignedImage = img_id;
        i2mx.PageManager.render();
    }

    this.event.deassignImageFromPage = function(clickedButton) {
        var page_id = parseInt(clickedButton.target.getAttribute("data-page-id"));

        i2mx.PageManager.pages[page_id].assignedImage = null;

        i2mx.PageManager.render();
    }

    this.event.openPageInCanvas = function(clickedButton) {
         var page_id = parseInt(clickedButton.target.getAttribute("data-page-id"));
         i2mx.DrawingCanvas.openPage(page_id);
    }

    this.hasImageAssignedInPages = function(img_id) {
        var pagesThatContainTheImage = [];

        if(i2mx.PageManager.activeFiles == 0) {
            return pagesThatContainTheImage;
        }

        for(var id=0; id<i2mx.PageManager.pages.length; id++) {
            if(i2mx.PageManager.pages[id] !== undefined
            && i2mx.PageManager.pages[id].assignedImage == img_id) {
                pagesThatContainTheImage.push(id);
            }
        }

        return pagesThatContainTheImage;
    }

    this.render = function() {
        var pageCount = i2mx.Elements.pageCount();

        pageCount.innerHTML = i2mx.PageManager.activePages;

        if(i2mx.PageManager.activePages == 0) {
            i2mx.Elements.pageList().innerHTML = "Oops! There are no pages here yet.";
            return;
        }

        var newHTML = "";
        var ord = 0;
        for(var id=0; id<i2mx.PageManager.pages.length; id++) {
            if(i2mx.PageManager.pages[id] !== null) {
                newHTML += this.createPageHTML(id, ++ord);
            }
        }

        i2mx.Elements.pageList().innerHTML = newHTML;

        var btns;

        btns = document.getElementsByClassName("i2mx-page_mngr-remove-item-btn");
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.deletePage)
        }

        btns = document.getElementsByClassName("i2mx-page_mngr-assign-image-to-item-btn");
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.assignImageToPage)
        }

        btns = document.getElementsByClassName("i2mx-page_mngr-deassign-image-btn");
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.deassignImageFromPage)
        }

        btns = document.getElementsByClassName("i2mx-page_mngr-open-item-btn");
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.openPageInCanvas)
        }
    }

    this.load = function() {
        i2mx.Elements.addNewPageBtn().addEventListener("click", this.event.addNewPage)
    }
});
