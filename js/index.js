var canvas = new fabric.Canvas('pic1');
    canvas.setHeight(1090.8);
    canvas.setWidth(777.6);


    var backgrounds = ["img/1.png", "img/2.png", "img/3.png"];
    var currentBackground = 0;
    var thumbnailsPerPage = 4;
    var currentPage = 0;

    updateBackgroundThumbnails();

    function updateBackgroundThumbnails() {
        var thumbnailContainer = document.getElementById('thumbnailContainer');
        thumbnailContainer.innerHTML = "";

        var startIndex = currentPage * thumbnailsPerPage;
        var endIndex = startIndex + thumbnailsPerPage;

        for (var i = startIndex; i < endIndex && i < backgrounds.length; i++) {
            var thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            var img = document.createElement('img');
            img.src = backgrounds[i];
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', changeBackground.bind(null, i));
            thumbnailContainer.appendChild(thumbnail);
        }

    }



    function changePage(offset) {
        currentPage += offset;
        updateBackgroundThumbnails();
    }

    function addTextToCanvas() {  
        var text = document.getElementById('textArea').value;
        if (text.trim() !== "") {
            var textColor = document.getElementById('textColor').value;

            var fabricText = new fabric.IText(text, {
                left: canvas.width / 2,
                top: canvas.height / 2,
                fontSize: 20,
                fill: textColor, 
                selectable: true
            });
            canvas.add(fabricText);
            canvas.bringToFront(fabricText);
        }
    }

    function deleteSelectedText() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            canvas.remove(activeObject);   
        }
    }

    function openModifyPopup() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            var modifyTextArea = document.getElementById('modifyTextArea');
            var modifyTextColor = document.getElementById('modifyTextColor');

            modifyTextArea.value = activeObject.text;
            modifyTextColor.value = activeObject.fill;

            document.getElementById('modifyPopup').style.display = 'block';
        }
    }

    function modifySelectedText() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            var newText = document.getElementById('modifyTextArea').value;
            var newTextColor = document.getElementById('modifyTextColor').value;

            activeObject.set({
                text: newText,
                fill: newTextColor
            });

            canvas.renderAll();
            document.getElementById('modifyPopup').style.display = 'none';
        }
    }

    function showBackgroundPopup() {
        document.getElementById('backgroundPopup').style.display = 'block';
    }

    function closeBackgroundPopup() {
        document.getElementById('backgroundPopup').style.display = 'none';
    }

    function changeBackground(index) {
        currentBackground = index;
        updateBackground();
        closeBackgroundPopup();
    }

    function closeBackgroundPopup() {
    document.getElementById('backgroundPopup').style.display = 'none';
    }

    function updateBackground() {
        var selectedBackground = backgrounds[currentBackground];

        fabric.Image.fromURL(selectedBackground, function (img) {
            var scaleX = canvas.width / img.width;
            var scaleY = canvas.height / img.height;
            var scale = Math.max(scaleX, scaleY);

            img.set({
                scaleX: scale,
                scaleY: scale,
                left: 0,
                top: 0,
                selectable: false
            });

            canvas.clear();
            canvas.add(img);
            canvas.renderAll();
        });
    }

    document.getElementById('downloadBtn').addEventListener('click', downloadCanvas, false);

    function downloadCanvas() {
        var link = document.createElement('a');
        link.href = canvas.toDataURL({
            format: 'png',
            quality: 0.8
        });
        link.download = 'canvas.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
