function updateTextInput(text) {
    localStorage.setItem('userInputText', text);   // save to localstorage
}


function getTextFromLocalStorage() {
    return localStorage.getItem('userInputText') || defaultText;
}



