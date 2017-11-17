/*
#
# i2mx_drawing_canvas.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.DrawingCanvas = new (function() {
    this.ctx = null;
    this.currentPageId = null;
    this.currentImgObj = null;

    this.event = {};
    this.event.closeCurrentPage = function() {
       i2mx.DrawingCanvas.closeCurrentPage();
    }

    this.render = function() {
        var canvas_el = i2mx.Elements.drawingCanvas();

        this.ctx.clearRect(0, 0, canvas_el.width, canvas_el.height); // Clear canvas

        if(this.currentPageId == null) {
            canvas_el.style.width = "300px";
            canvas_el.style.height = "300px";
            canvas_el.width = 300;
            canvas_el.height = 300;

            this.ctx.font = '20px Arial';
            this.ctx.fillStyle = 'red';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('Open a page to see it here.', 150, 150);

            return;
        }


        var img_obj = i2mx.DrawingCanvas.currentImgObj;
        i2mx.DrawingCanvas.ctx.drawImage(img_obj, 0, 0, canvas_el.offsetWidth, canvas_el.offsetHeight);
    }

    this.closeCurrentPage = function() {
        i2mx.DrawingCanvas.currentPageId = null;
        i2mx.DrawingCanvas.currentImgObj = null;

        i2mx.DrawingCanvas.render();

        i2mx.Elements.closeCurrentPageBtn().style.display = "none";
    }

    this.openPage = function(page_id) {
        this.currentPageId = page_id;

        var img_id = i2mx.PageManager.pages[page_id].assignedImage;

        // Resize the canvas to match the image dimensions
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            var img_obj = new Image();
            img_obj.src = e.target.result;

            img_obj.onload = function() {
                i2mx.DrawingCanvas.currentImgObj = img_obj;

                var canvas_el = i2mx.Elements.drawingCanvas();

                canvas_el.width = img_obj.width;
                canvas_el.height = img_obj.height;

                if(img_obj.width > img_obj.height) {
                    canvas_el.style.width = img_obj.width + "px";
                    canvas_el.style.height = "auto";
                } else {
                    canvas_el.style.width = "auto";
                    canvas_el.style.height = img_obj.height + "px";
                }

                var offsetWidth = canvas_el.offsetWidth;
                var offsetHeight = canvas_el.offsetHeight;
                canvas_el.width = offsetWidth;
                canvas_el.height = offsetHeight;

                i2mx.DrawingCanvas.render();
           }
        }

        fileReader.readAsDataURL(i2mx.ImageManager.files[img_id]);

        i2mx.Elements.closeCurrentPageBtn().style.display = "block";
    }

    this.load = function() {
        this.ctx = i2mx.Elements.drawingCanvas().getContext('2d');

        i2mx.Elements.closeCurrentPageBtn().addEventListener("click", this.event.closeCurrentPage);

        this.render();
    }
});
