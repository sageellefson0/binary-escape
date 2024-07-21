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

    startTypingAndQuestion();

}

searchButton.addEventListener('click', alienQuizPage);



var i = 0;
var lineIndex = 0;
var typingText = [
    'Gah...Urgh...Spla...Who would dare to summon me?',
    'Oh. A human.',
    'My name is Scuddlefluff, ruler of Saturn.',
    'Something something I will kill you if you don\'t answer my questions. Blah blah blah.',
    'Seriously though, you have to answer these questions. '
];
var textSpeed = 80; // The speed/duration of the typing effect in milliseconds
var pauseTime = 2000; // 3 seconds pause between lines

function typeWriterAlienSpeak(callback) {
    if (lineIndex < typingText.length) {
        if (i < typingText[lineIndex].length) {
            document.getElementById("alienChatBox").innerHTML += typingText[lineIndex].charAt(i);
            i++;
            setTimeout(() => typeWriterAlienSpeak(callback), textSpeed);
        } else {
            i = 0;
            lineIndex++;
            setTimeout(() => {
                document.getElementById("alienChatBox").innerHTML = ''; // Clear the line after pause
                if (lineIndex < typingText.length) {
                    setTimeout(() => typeWriterAlienSpeak(callback), textSpeed); // Start typing the next line
                } else if (callback) {
                    callback(); // Call the callback function after the last line
                }
            }, pauseTime); // Pause before clearing the line
        }
    }
    // setTimeout(displayQuestion(0), 15000);
    // displayQuestion(0);
}

function startTypingAndQuestion() {
    typeWriterAlienSpeak(() => {
        setTimeout(() => displayQuestion(0), 2000); // Call displayQuestion 15 seconds after typing is done
    });
}

function displayQuestion(index) {
    let questionsSlot = document.getElementById('multipleChoiceQuestion');
    let answerSlots = document.getElementById('multipleChoiceAnswers');
    questionsSlot.style.display = "block"; 
    answerSlots.style.display = "block"; 

    let answerA = document.getElementById('answerA');
    let answerB = document.getElementById('answerB');
    let answerC = document.getElementById('answerC');
    let answerD = document.getElementById('answerD');

    var questionList = [
        {
            question: 'How far is Saturn from Earth?',
            answers: ['950.3 billion mi', '835.2 million mi', '1.4 billion mi', '8.9 mi'],
            correct: '835.2 million mi'
        },
        {
            question: 'How many moons does Saturn have?',
            answers: ['146', '238', '43', '7'],
            correct: '146'
        },
        {
            question: 'What planets lie between Earth and Saturn?',
            answers: ['Mercury and Uranus', 'Pluto and Neptune', 'Venus and Mars', 'Jupiter and Mars'],
            correct: 'Jupiter and Mars'
        },
        {
            question: 'How many rings does Saturn have? (According to NASA)',
            answers: ['22', '3', '7', '38'],
            correct: '7'
        },
        {
            question: 'What is my name?',
            answers: ['Snazzlepuff', 'Hizzlefritz', 'Orson', 'Bill'],
            correct: 'Orson'
        }
    ];

    if (index < questionList.length) {
        questionsSlot.innerHTML = questionList[index].question;
        answerA.innerHTML = questionList[index].answers[0];
        answerB.innerHTML = questionList[index].answers[1];
        answerC.innerHTML = questionList[index].answers[2];
        answerD.innerHTML = questionList[index].answers[3];

        answerA.onclick = () => checkAnswer(questionList[index], answerA.innerHTML, index);
        answerB.onclick = () => checkAnswer(questionList[index], answerB.innerHTML, index);
        answerC.onclick = () => checkAnswer(questionList[index], answerC.innerHTML, index);
        answerD.onclick = () => checkAnswer(questionList[index], answerD.innerHTML, index);
    }
}

function checkAnswer(question, selectedAnswer, index) {
    if (selectedAnswer === question.correct) {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }
    displayQuestion(index + 1); // Display the next question
}

