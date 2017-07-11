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
        pageDeleteBtn.classList.add("button-as-text");
        pageDeleteBtn.value = "Remove page";
        pageDeleteBtn.setAttribute("data-page-id", id);

        // Create "Assign image" button
        var assignImgBtn = document.createElement("input");
        assignImgBtn.type = "submit";
        //assignImgBtn.classList.add("i2mx-page_mngr-assign-image-to-item-btn");
        assignImgBtn.classList.add("button-as-text");
        assignImgBtn.value = "Assign image";
        //assignImgBtn.setAttribute("data-page-id", id);
        assignImgBtn.style.cursor = "not-allowed"; // Temporary
        assignImgBtn.disabled = true;              // Temporary

        // Create "Open in canvas" button
        var pageOpenBtn = document.createElement("input");
        pageOpenBtn.type = "submit";
        //pageOpenBtn.classList.add("i2mx-page_mngr-open-item-btn");
        pageOpenBtn.classList.add("button-as-text");
        pageOpenBtn.value = "Open in canvas";
        //pageOpenBtn.setAttribute("data-page-id", id);
        pageOpenBtn.style.cursor = "not-allowed"; // Temporary
        pageOpenBtn.disabled = true;              // Temporary

        var HTML = ord + " - (id="+id+") <b>This page has no assigned image!</b> (" +
            pageDeleteBtn.outerHTML + ") (" + assignImgBtn.outerHTML + ") (" +
            pageOpenBtn.outerHTML + ")<br>";

        return HTML;

    }

    this.event.deletePage = function(clickedButton) {
        var id = parseInt(clickedButton.target.getAttribute("data-page-id"));

        i2mx.PageManager.pages[id] = null;
        i2mx.PageManager.activePages--;

        i2mx.PageManager.render();
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

    }

    this.load = function() {
        i2mx.Elements.addNewPageBtn().addEventListener("click", this.event.addNewPage)
    };
});
