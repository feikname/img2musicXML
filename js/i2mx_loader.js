/*
#
# i2mx_loader.js - v0.1-Alpha
# Apache v2 License
#
*/

i2mx.load = function() {
    // Show last modification date to user
    let lastModification = i2mx.Data.lastModification;
    let element = i2mx.Elements.lastModification();
    element.innerHTML = lastModification;

    // Load Elements
    i2mx.ImageManager.load();
    i2mx.PageManager.load();
}

window.addEventListener("load", i2mx.load);
