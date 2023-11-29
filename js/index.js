function changePage(offset) {
    currentPage += offset;
    updateBackgroundThumbnails();
}

function addTextToCanvas() {
    var text = document.getElementById('textArea').value;
    if (text.trim() !== "") {
        var textColor = document.getElementById('textColor').value;
        var selectedFont = document.getElementById('fontSelector').value; 
        var fabricText = new fabric.IText(text, {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontSize: 20,
            fill: textColor,
            fontFamily: selectedFont,
            selectable: true
        });
        canvas.add(fabricText);
        canvas.bringToFront(fabricText);
    }
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
        var modifyFontSelector = document.getElementById('modifyFontSelector');

        modifyTextArea.value = activeObject.text;
        modifyFontSelector.value = activeObject.fontFamily || 'Arial'; 
        document.getElementById('modifyPopup').style.display = 'block';
    }
}


function modifySelectedText() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        var newText = document.getElementById('modifyTextArea').value;
        var newTextColor = document.getElementById('modifyTextColor').value;
        var newFont = document.getElementById('modifyFontSelector').value;

        activeObject.set({
            text: newText,
            fill: newTextColor,
            fontFamily: newFont
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