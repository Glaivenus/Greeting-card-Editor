function addLogoToCanvas() {

    var logoPath = '../img/logo1.png';

    fabric.Image.fromURL(logoPath, function (img) {
        img.set({
            scaleX: 0.08, 
            scaleY: 0.08,
            left: 100, 
            top: canvas.width / 4,
        });

        canvas.add(img);
        canvas.bringToFront(img);
    });
}

