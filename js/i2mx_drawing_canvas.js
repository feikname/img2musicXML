/*
#
# i2mx_drawing_canvas.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.DrawingCanvas = new (function() {
    this.ctx = null;

    this.event = {};

    this.render = function() {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('Open a page to see it here.', 150, 150);
    }

    this.load = function() {
        this.ctx = i2mx.Elements.drawingCanvas().getContext('2d');
        
        this.render();
    };
});
