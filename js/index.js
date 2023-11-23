function changePage(offset) {
    currentPage += offset;
    updateBackgroundThumbnails();
}

function addTextToCanvas() {
    var text = document.getElementById('textArea').value;
    if (!text.trim()) {
        text = defaultText;  // Use default text
    }

    var textColor = document.getElementById('textColor').value;

    var fabricText = new fabric.IText(text, {
        left: canvas.height / 12,
        top: canvas.height / 2.5,
        fontSize: 25,
        fill: textColor,
        selectable: true
    });

    canvas.add(fabricText);
    canvas.bringToFront(fabricText);
}



function deleteSelectedObject() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
    }
}


function openModifyPopup() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        var modifyTextArea = document.getElementById('modifyTextArea');
        var modifyTextColor = document.getElementById('modifyTextColor');
        var modifyFontFamily = document.getElementById('modifyFontFamily');

        modifyTextArea.value = activeObject.text;
        modifyTextColor.value = activeObject.fill;
        modifyFontFamily.value = activeObject.fontFamily;

        document.getElementById('modifyPopup').style.display = 'block';
    }
}

function modifySelectedText() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        var newText = document.getElementById('modifyTextArea').value;
        var newTextColor = document.getElementById('modifyTextColor').value;
        var newFontFamily = document.getElementById('modifyFontFamily').value;

        activeObject.set({
            text: newText,
            fill: newTextColor,
            fontFamily: newFontFamily
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

        // Default Text & Logo
        addTextToCanvas();
        addLogoToCanvas();

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