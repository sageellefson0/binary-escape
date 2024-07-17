const alienLink = document.querySelector('.alienLink');
const decoderDiv = document.querySelector('.decoderDiv');
const bugReportPopUp = document.querySelector('.bugReportPopUp');
const bugReportsLinkDiv = document.querySelector('.bugReportsLinkDiv');
const bugReportsLink = document.querySelector('.bugReportsLink');
const alienLinkDiv = document.querySelector('.alienLinkDiv');
character = document.querySelector('.character');

let isDecoderOpen = false;



// Decodes the binary message. 
function binaryTranslator(str) {
    let translatedMessage = '';
    
    str.split(' ').forEach(binaryTranslator => {
      let numericCharacterRepresentation = parseInt(binaryTranslator, 2);
      let letter = String.fromCharCode(numericCharacterRepresentation);
      translatedMessage += letter;
    })
    return translatedMessage;
}


const decodedLetters = [];

// Get binary message and decode it using 'binaryTranslator()'
function enteredMessage(event) {
    event.preventDefault();
    var binaryTextInput = document.getElementById('binaryTextInput').value;

    // Check if the input is empty
    if (!binaryTextInput.trim()) {
        alert("Please enter something into the decoder.");
        return;
    }

    var decode = binaryTranslator(binaryTextInput);
    decodedLetters.push(decode);
    document.getElementById('decoderTextBox').innerHTML = decodedLetters.join(' ');
}

var closeDecoderDiv = document.getElementById('closeDecoderDiv');
closeDecoderDiv.addEventListener('click', closePopUpDecoder);

function flickerText() {
    // Change the text to "TOP SECRET"
    bugReportsLink.textContent = "TOP SECRET";

    // After 3 seconds, change it back to "Bug Reports"
    setTimeout(() => {
        bugReportsLink.textContent = "Bug Reports";
    }, 1000);
}

// Opens the decoder div by setting display to block.
function openPopUpDecoder() {
    decoderDiv.style.display = "block";
    bugReportsLink.style.color = "purple";
    flickerText();
    console.log("Decoder div opened");
}

// Closes the decoder div by setting display to none.
function closePopUpDecoder() {
    decoderDiv.style.display = "none";
    console.log("Decoder div closed");
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
        if (!isDecoderOpen) {
            openPopUpDecoder();
            isDecoderOpen = true;
        }
    } else {
        if (isDecoderOpen) {
            // closePopUpDecoder();
            isDecoderOpen = false;
        }
    }
}


const checkCollisionInGameLoopAlien = () => {
    isCollapsedAlien(character, alienLinkDiv);
    window.requestAnimationFrame(() => {
        checkCollisionInGameLoopAlien();
    });
};
checkCollisionInGameLoopAlien();


function clearDecoderTextBox(){
    document.getElementById('decoderTextBox').innerHTML = "";
    decodedLetters.length = 0;

}

var btnSubmit = document.getElementById('binaryTextInputSubmit');
btnSubmit.addEventListener('click', enteredMessage);

var binaryTextInputClear = document.getElementById('binaryTextInputClear');
binaryTextInputClear.addEventListener('click', clearDecoderTextBox);


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



let searchButton = document.getElementById('searchButton');
let wikiSearchInput = document.getElementById('wikiSearchInput');
let alienQuizDiv = document.getElementById('alienQuizDiv');
let wikiContainer = document.getElementById('wikiContainer');


function alienQuizPage() {
    wikiContainer.style.display = "none";
    alienQuizDiv.style.display = "block"; 

    // Change the background color to black
    setTimeout(() => {
        alienQuizDiv.style.backgroundColor = "#1B1B1B"; 
    }, 0); 

    // Fade in the alienImg after the background color transition (assuming 10 seconds for the background)
    setTimeout(() => {
        alienImg.style.opacity = 1; // Fade in the image
    }, 5000); 
}

searchButton.addEventListener('click', alienQuizPage);

