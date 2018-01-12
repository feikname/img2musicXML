/*
#
# i2mx_loader.js - v0.1-Alpha
# Apache v2 License
#
*/

i2mx.load = function() {
    // Show last modification date to user
    i2mx.Elements.lastModification().innerHTML = i2mx.Data.lastModification

    // Load sections
    i2mx.PageManager.load()
    i2mx.DrawingCanvas.load()
}

window.addEventListener("load", i2mx.load)
