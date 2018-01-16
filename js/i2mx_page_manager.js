/*
#
# i2mx_page_manager.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.PageManager = new (function() {
    this.pages = []
    this.activePages = 0

    this.event = {}
    this.event.addNewPage = function() {
        var newPage = {}
        newPage.assignedImage = null

        i2mx.PageManager.pages.push(newPage)
        i2mx.PageManager.activePages++

        i2mx.PageManager.render()
    }

    this.event.deletePage = function() {
        var page_id = parseInt(this.getAttribute("data-page-id"))

        i2mx.PageManager.pages[page_id] = null
        i2mx.PageManager.activePages--

        i2mx.PageManager.render()
    }

    this.event.assignImageToPage = function(e) {
        if(e.type == "click") {
            //   Get the page id from the clicked label and apply it to the file
            // input so we can know to which page add the image
            var page_id = parseInt(e.explicitOriginalTarget.parentElement.getAttribute("data-page-id"))
            this.setAttribute("data-page-id", page_id)

            return
        }

        var page_id = this.getAttribute("data-page-id")

        var file = this.files[0]
        if(file.type.match('image.*')) {
            i2mx.PageManager.pages[page_id].assignedImage = file
            i2mx.PageManager.render()

            // If the currently opened page contained the image, close it.
            // TODO: Change this to redraw canvas with the newly added image
            if(i2mx.DrawingCanvas.currentPageId == page_id) {
                i2mx.DrawingCanvas.closeCurrentPage()
            }

            return
        }

        alert("You tried to use a non-image file!")
    }

    this.event.deassignImageFromPage = function() {
        var page_id = parseInt(this.getAttribute("data-page-id"))

        i2mx.PageManager.pages[page_id].assignedImage = null

        // If the currently opened page contained the image, close it.
        // TODO: Change this to redraw canvas without the image
        if(i2mx.DrawingCanvas.currentPageId == page_id) {
            i2mx.DrawingCanvas.closeCurrentPage()
        }

        i2mx.PageManager.render()
    }

    this.event.openPageInCanvas = function() {
         var page_id = parseInt(this.getAttribute("data-page-id"))
         i2mx.DrawingCanvas.openPage(page_id)
    }

    this.createPageHTML = function(id, ord) {
        // Create "Remove page" button
        var pageDeleteBtn = document.createElement("input")
        pageDeleteBtn.type = "button"
        pageDeleteBtn.classList.add("i2mx-page_mngr-remove-item-btn")
        pageDeleteBtn.classList.add("button-as-anchor")
        pageDeleteBtn.classList.add("red-btn")
        pageDeleteBtn.value = "Remove page"
        pageDeleteBtn.setAttribute("data-page-id", id)

        // Create "Assign image" button
        var assignImgBtn = document.createElement("label")
        assignImgBtn.classList.add("button-as-anchor")
        assignImgBtn.classList.add("blue-btn")
        assignImgBtn.setAttribute("for", "i2mx-page_mngr-assign-image-to-item-input")
        assignImgBtn.setAttribute("data-page-id", id)
        assignImgBtn.innerText = "Assign an image"

        // Create "Deassign image" button
        var deassignImgBtn = document.createElement("input")
        deassignImgBtn.type = "button"
        deassignImgBtn.classList.add("i2mx-page_mngr-deassign-image-btn")
        deassignImgBtn.classList.add("button-as-anchor")
        deassignImgBtn.classList.add("red-btn")
        deassignImgBtn.value = "Deassign image"
        deassignImgBtn.setAttribute("data-page-id", id)

        // Create "Open in canvas" button
        var pageOpenBtn = document.createElement("input")
        pageOpenBtn.type = "button"
        pageOpenBtn.classList.add("i2mx-page_mngr-open-item-btn")
        pageOpenBtn.classList.add("button-as-anchor")
        pageOpenBtn.classList.add("blue-btn")
        pageOpenBtn.value = "Open in canvas"
        pageOpenBtn.setAttribute("data-page-id", id)

        var img = this.pages[id].assignedImage
        if(img == null) {
            var HTML = ord + " - (id="+id+") <b>Assign an image to this page to open it in the canvas!</b> (" +
                pageDeleteBtn.outerHTML + ") (" + assignImgBtn.outerHTML + ")<br>"
        } else {
            var HTML = ord + " - (id="+id+") <pre class=i2mx-page_mngr-file-name>" + img.name + "</pre>  (" +
                pageDeleteBtn.outerHTML + ") (" + deassignImgBtn.outerHTML + ") (" +
                pageOpenBtn.outerHTML + ")<br>"
        }

        return HTML
    }

    this.render = function() {
        var pageCount = i2mx.Elements.pageCount()

        pageCount.innerHTML = i2mx.PageManager.activePages

        if(i2mx.PageManager.activePages == 0) {
            i2mx.Elements.pageList().innerHTML = "Oops! There are no pages here yet."
            return
        }

        var newHTML = ""
        var ord = 0
        for(var id=0; id<i2mx.PageManager.pages.length; id++) {
            if(i2mx.PageManager.pages[id] !== null) {
                newHTML += this.createPageHTML(id, ++ord)
            }
        }

        i2mx.Elements.pageList().innerHTML = newHTML

        var btns

        btns = document.getElementsByClassName("i2mx-page_mngr-remove-item-btn")
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.deletePage)
        }

        btns = document.getElementsByClassName("i2mx-page_mngr-deassign-image-btn")
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.deassignImageFromPage)
        }

        btns = document.getElementsByClassName("i2mx-page_mngr-open-item-btn")
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.openPageInCanvas)
        }
    }

    this.load = function() {
        i2mx.Elements.addNewPageBtn().addEventListener("click", this.event.addNewPage)
        i2mx.Elements.imgInput().addEventListener("click", this.event.assignImageToPage)
        i2mx.Elements.imgInput().addEventListener("change", this.event.assignImageToPage)
    }
})
