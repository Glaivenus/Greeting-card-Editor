function changePage(offset) {
    currentPage += offset;
    updateBackgroundThumbnails();
}

function addTextToCanvas() {
    var text = document.getElementById('textArea').value;
    var textColor = document.getElementById('textColor').value;
    var selectedFont = document.getElementById('fontSelector').value;

    if (text.trim() !== "") {
        var fabricText = new fabric.IText(text, {
            left: canvas.width / 5.8,
            top: canvas.height / 2.6,
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

        //Redrawing Text 
        activeObject.set("text", activeObject.text + " "); 
        activeObject.set("text", activeObject.text.trim()); 

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
    canvas.clear();
    updateBackground();

    addDefaultText();

    closeBackgroundPopup();
}

// Default Text
function addDefaultText() {
    var textColor = '#000000'; 
    var selectedFont = 'Arial'; 
    var fabricText = new fabric.IText(defaultText, {
        left: canvas.width / 5.8,
        top: canvas.height / 2.6,
        fontSize: 20,
        fill: textColor,
        fontFamily: selectedFont, 
        selectable: true
    });

    canvas.add(fabricText);
    canvas.bringToFront(fabricText);
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
        canvas.sendToBack(img); 
        
        addDefaultText(); 
        addLogoToCanvas()

        canvas.renderAll();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadImage').addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (event) {
                var imgObj = new Image();
                imgObj.src = event.target.result;
    
                imgObj.onload = function () {
    
                    var fabricImage = new fabric.Image(imgObj, {
                        left: 50,
                        top: 50,
                        angle: 0,
                        scaleX: 0.5,
                        scaleY: 0.5
                    });
                    canvas.add(fabricImage); 
                    canvas.renderAll();
                    canvas.bringToFront(fabricImage);
                };
            };
    
            reader.readAsDataURL(e.target.files[0]);
        }
    });
});




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