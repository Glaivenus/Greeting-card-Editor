function changePage(offset) {
    currentPage += offset;
    updateBackgroundThumbnails();
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('mainMenuBtn').addEventListener('click', function() {
        var addMenu = document.getElementById('addMenu');
        addMenu.style.display = addMenu.style.display === 'none' ? 'block' : 'none';
    });



// popup for add text

document.getElementById('addTextBtn').addEventListener('click', function() {
    document.getElementById('addTextPopup').style.display = 'block';
});
// function closeAddTextPopup() {
//     document.getElementById('addTextPopup').style.display = 'none';
// }
});  

function addTextToCanvas() {
    var text = document.getElementById('textArea').value;
    var textColor = document.getElementById('textColor').value;
    var selectedFont = document.getElementById('fontSelector').value;

    if (text.trim() !== "") {
        var fabricText = new fabric.IText(text, {
            left: canvas.width / 2,
            top: canvas.height / 2.5,
            fontSize: 20,
            fill: textColor,
            fontFamily: selectedFont, 
            selectable: true
        });
        canvas.add(fabricText);
        canvas.bringToFront(fabricText);
        document.getElementById('addTextPopup').style.display = 'none';
        closeAddTextPopup();
    }

    
}


function closeAddTextPopup() {
    document.getElementById('addTextPopup').style.display = 'none';
}






function deleteSelectedObject() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
    }
}


function openModifyPopup() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text' || activeObject.type === 'textbox') {
        var modifyTextArea = document.getElementById('modifyTextArea');
        var modifyFontSelector = document.getElementById('modifyFontSelector');

        modifyTextArea.value = activeObject.text;
        modifyFontSelector.value = activeObject.fontFamily || 'Arial'; 
        document.getElementById('modifyPopup').style.display = 'block';
    }
}


function modifySelectedText() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text' || activeObject.type === 'textbox') {
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


// Bg upload
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadBackgroundImage').addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (event) {
                fabric.Image.fromURL(event.target.result, function (img) {
                    var imgRatio = img.width / img.height;
                    var canvasRatio = canvas.width / canvas.height;
                    var scale = canvasRatio >= imgRatio ? canvas.height / img.height : canvas.width / img.width;

                    img.set({
                        originX: 'left',
                        originY: 'top',
                        scaleX: scale,
                        scaleY: scale
                    });

                    
                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                });
            };

            reader.readAsDataURL(e.target.files[0]); 
        }
        canvas.clear();
        addDefaultText();
        addLogoToCanvas();
        closeBackgroundPopup();
        canvas.renderAll;

        setTimeout(function() {
            e.target.value = '';
        }, 100);
    });
});


// Default Text
function addDefaultText() {
    var textColor = '#000000'; 
    var selectedFont = 'Arial'; 
    var fabricText = new fabric.Textbox(defaultText, {
        left: canvas.width / 7.3,
        top: canvas.height / 2.6,
        fontSize: 22,
        fill: textColor,
        fontFamily: selectedFont, 
        selectable: true,
        wordWrap: true,
        splitByGrapheme: true,
        width: canvas.width * 0.8,
    });

    canvas.add(fabricText);
    canvas.bringToFront(fabricText);
}

//thank you
function addtkText() {
    var textColor = '#E0111A'; 
    var selectedFont = 'Ephesis'; 
    var fabricText = new fabric.IText('Thank you!', {
        left: canvas.width / 13,
        top: canvas.height / 1.5,
        fontSize: 170,
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

// change bg


function updateBackground(imageUrl) {  
    fabric.Image.fromURL(imageUrl, function (img) {
        // check img
        if (!img) {
            console.error('Failed to load image: ' + imageUrl);
            return;
        }

        var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        img.set({
            originX: 'left',
            originY: 'top',
            scaleX: scale,
            scaleY: scale
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top',
            scaleX: scale,
            scaleY: scale
        });
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


 


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('downloadBtn').addEventListener('click', function () {
        var canvasURL = canvas.toDataURL('image/png'); 
        var link = document.createElement('a'); 
        link.download = 'canvas.png';
        link.href = canvasURL; 
        link.click();
    });
});