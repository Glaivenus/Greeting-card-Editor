document.addEventListener('DOMContentLoaded', function () {
let startX, startY, startDist;
    canvas.on('touchstart', function(e) {
        if (e.touches && e.touches.length === 2) {
            startX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            startY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            startDist = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
                                Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
        }
    });

    canvas.on('touchmove', function(e) {
        if (e.touches && e.touches.length === 2) {
            var currentX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            var currentY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            var currentDist = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
                                        Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
            var scale = currentDist / startDist;

            var zoom = canvas.getZoom();
            zoom *= scale;
            canvas.setZoom(zoom);


            startX = currentX;
            startY = currentY;
            startDist = currentDist;
        }
    });

    canvas.on('touchend', function(e) {
        startX = startY = startDist = undefined;
    });
});