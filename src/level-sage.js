const alienLink = document.querySelector('.alienLink');
const gameDiv = document.querySelector('.gameDiv');
const bugReportPopUp = document.querySelector('.bugReportPopUp');
const bugReportsLinkDiv = document.querySelector('.bugReportsLinkDiv');
const alienLinkDiv = document.querySelector('.alienLinkDiv');





// function for decode the message:
function binaryTranslator(str) {
    let translatedMessage = '';
    
    str.split(' ').forEach(binaryTranslator => {
      let numericCharacterRepresentation = parseInt(binaryTranslator, 2);
      let letter = String.fromCharCode(numericCharacterRepresentation);
      translatedMessage += letter;
    })
    return translatedMessage;
}


// Get binary message and decode it using 'binaryTranslator()' function:
function enteredMessage(event) {
  event.preventDefault();
  var binaryTextInput = document.getElementById('binaryTextInput').value;
  var decode = binaryTranslator(binaryTextInput);  
  document.getElementById('textBox1').innerHTML = decode;
}

var btnSubmit = document.getElementById('binaryTextInputSubmit');
btnSubmit.addEventListener('click', enteredMessage);






// alienLink.addEventListener("click", openPopUp);
window.onload = function () {
    character = document.querySelector('.character');


};

function openPopUpAlien() {
    gameDiv.style.display = "block";
    alienLinkDiv.style.display = "block";  
}

function closePopUpAlien() {
    // gameDiv.style.display = "block";
    // console.log("test");
}

function isCollapsedAlien(character, alienLinkDiv) {
    var object_1 = character.getBoundingClientRect(); 
    var object_2 = alienLinkDiv.getBoundingClientRect(); 

    if (
        object_1.left < object_2.left + object_2.width &&
        object_1.left + object_1.width > object_2.left &&
        object_1.top < object_2.top + object_2.height &&
        object_1.top + object_1.height > object_2.top
    ) {
        openPopUpAlien();
    } else {
        // closePopUpBugReports();
        console.log("nothing");

    }
}

// Check collision in the game loop for the alien pop up
const checkCollisionInGameLoopAlien = () => {
    isCollapsedAlien(character, alienLinkDiv);
    window.requestAnimationFrame(() => {
        checkCollisionInGameLoopAlien();
    });
};
checkCollisionInGameLoopAlien();











// Show the bug report popup
function openPopUpBugReports() {
    bugReportsLinkDiv.style.display = "block";  
    bugReportPopUp.style.display = "block";
}

// Hide the bug report popup
function closePopUpBugReports() {
    bugReportPopUp.style.display = "none"; 
}

function isCollapsed(character, bugReportsLinkDiv) {
    var object_1 = character.getBoundingClientRect();
    var object_2 = bugReportsLinkDiv.getBoundingClientRect();  

    if (
        object_1.left < object_2.left + object_2.width &&
        object_1.left + object_1.width > object_2.left &&
        object_1.top < object_2.top + object_2.height &&
        object_1.top + object_1.height > object_2.top
    ) {
        openPopUpBugReports();

    } else {
        closePopUpBugReports();

    }
}

// Check collision in the game loop for the bug reports pop up
const checkCollisionInGameLoopBugReports = () => {
    isCollapsed(character, bugReportsLinkDiv);
    window.requestAnimationFrame(() => {
        checkCollisionInGameLoopBugReports();
    });
};
checkCollisionInGameLoopBugReports();





