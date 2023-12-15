//canvas size
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = (width / 777.6) * 1090.8; 


    if (width <= 600) {
        canvas.setWidth(width * 0.99); 
        canvas.setHeight(height * 0.99);
    } else {
        canvas.setWidth(777.6);
        canvas.setHeight(1090.8);
    }

    canvas.renderAll();
});

function adjustCanvasSize() {
    var width = window.innerWidth;
    var height = (width / 777.6) * 1090.8; 

    if (width <= 600) {
        canvas.setWidth(width * 0.99);
        canvas.setHeight(height * 0.99);
    } else {
        canvas.setWidth(777.6);
        canvas.setHeight(1090.8);
    }

    var scaleFactor = width <= 600 ? width * 0.99 / 777.6 : 1;
    scaleCanvasObjects(scaleFactor);

    canvas.renderAll();
}


window.onload = adjustCanvasSize;



window.addEventListener('resize', adjustCanvasSize);


function addElementToCanvas(object) {
    // Save original!
    object.originalScaleX = object.scaleX;
    object.originalScaleY = object.scaleY;
    object.originalLeft = object.left;
    object.originalTop = object.top;

    canvas.add(object);
}


function scaleCanvasObjects(scaleFactor) {
    canvas.getObjects().forEach(function(object) {
        object.set({
            scaleX: object.scaleX * scaleFactor,
            scaleY: object.scaleY * scaleFactor,
            left: object.left * scaleFactor,
            top: object.top * scaleFactor
        });
        object.setCoords(); 
    });
}
