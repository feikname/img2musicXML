/*
#
# i2mx_page_manager.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.PageManager = new (function() {
    this.pages = [];

    this.event = {};

    this.event.addNewPage = function() {
        let newPage = {}
        newPage.assignedImage = null;

        i2mx.PageManager.pages.push(newPage);

        i2mx.PageManager.render();
    }
    this.event.deletePage = function(clickedButton) {

    }

    this.render = function() {
        let pageCount = i2mx.Elements.pageCount();

        pageCount.innerHTML = i2mx.PageManager.pages.length;
    }

    this.load = function() {
        i2mx.Elements.addNewPageBtn().addEventListener("click", this.event.addNewPage)
    };
});
