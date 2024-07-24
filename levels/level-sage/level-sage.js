const alienLink = document.querySelector('.alienLink');
const decoderDiv = document.querySelector('.decoderDiv');
const bugReportPopUp = document.querySelector('.bugReportPopUp');
const bugReportsLinkDiv = document.querySelector('.bugReportsLinkDiv');
const bugReportsLink = document.querySelector('.bugReportsLink');
const alienLinkDiv = document.querySelector('.alienLinkDiv');
character = document.querySelector('.character');

let isDecoderOpen = false;
var answerSelected = false;


// Prevents window reload without warning - user will lose progress is page is reloaded, this is to counteract that.
window.addEventListener('beforeunload', function (event) {
    event.preventDefault(); 
    }
);


var iterationCharacter = 0;
var lineIndexCharacter = 0;
var typingTextCharacter = [
    'A Wikipedia page? Something isn\'t right here...',
    'I wonder why it\'s all jumbled?',
   
];
var textSpeedChar = 80; 
var pauseTimeChar = 2000; 

function typeWriterCharacterSpeak(callbackchar) {
    const dialogueBox = document.getElementById("dialogueBox");
    
    if (lineIndexCharacter < typingTextCharacter.length) {
        dialogueBox.style.display = "block";

        if (iterationCharacter < typingTextCharacter[lineIndexCharacter].length) {
            document.getElementById("characterSpeech").innerHTML += typingTextCharacter[lineIndexCharacter].charAt(iterationCharacter);
            iterationCharacter++;
            setTimeout(() => typeWriterCharacterSpeak(callbackchar), textSpeedChar);
        } else {
            iterationCharacter = 0;
            lineIndexCharacter++;
            setTimeout(() => {
                document.getElementById("characterSpeech").innerHTML = ''; 
                if (lineIndexCharacter < typingTextCharacter.length) {
                    setTimeout(() => typeWriterCharacterSpeak(callbackchar), textSpeedChar); // Start typing the next line
                } else {
                    // Hide the dialogue box
                    dialogueBox.style.display = "none";
                    
                    // Call the callbackchar function after hiding the dialogue box
                    if (callbackchar) {
                        callbackchar(); 
                    }
                }
            }, pauseTimeChar); // Pause before clearing the line
        }

    }
}


window.onload = function() {
    typeWriterCharacterSpeak();
};


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
let clippyAgent = document.getElementById('clippy-agent');

function alienQuizPage() {
    wikiContainer.style.display = "none";
    alienQuizDiv.style.display = "block"; 
    clippyAgent.style.display = "none";
    
    // Change the background color to black
    setTimeout(() => {
        alienQuizDiv.style.backgroundColor = "#1B1B1B"; 
    }, 0); 

    // Fade in the alienImg after the background color transition (assuming 10 seconds for the background)
    setTimeout(() => {
        alienImg.style.opacity = 1; 
    }, 5000); 

    startTypingAndQuestion();

}

searchButton.addEventListener('click', () => {
    const searchInputValue = wikiSearchInput.value.trim().toLowerCase();

    if (searchInputValue === "saturn") {
        // Call the alienQuizPage function if the input is "saturn" or "SATURN"
        alienQuizPage();
    } else {
        alert("Incorrect.");
    }
});



var i = 0;
var lineIndex = 0;
var typingText = [
    'Gah...Urgh...Spla...Who would dare to summon me?',
    'Oh. A human. My name is Orson, ruler of Saturn.',
    'Something something I will kill you if you don\'t answer my questions. Blah blah blah.',
    'Seriously though, you have to answer these questions. '
];
var textSpeed = 80; 
var pauseTime = 1000; 
var answerSelected = false;

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
                document.getElementById("alienChatBox").innerHTML = ''; 
                if (lineIndex < typingText.length) {
                    setTimeout(() => typeWriterAlienSpeak(callback), textSpeed); // Start typing the next line
                } else if (callback) {
                    callback(); // Call the callback function after the last line
                }
            }, pauseTime); // Pause before clearing the line
        }
    }
}

function startTypingAndQuestion() {
    typeWriterAlienSpeak(() => {
        setTimeout(() => displayQuestion(0), 1000); 
    });
}

function displayQuestion(index) {
    answerSelected = false;
    
    let questionsSlot = document.getElementById('multipleChoiceQuestion');
    let answerSlots = document.getElementById('multipleChoiceAnswers');
    questionsSlot.style.display = "block"; 
    answerSlots.style.display = "block"; 
    setTimeout(() => {
        questionsSlot.style.opacity = 1; 
        answerSlots.style.opacity = 1; 
    }, 500); 

    let answerA = document.getElementById('answerA');
    let answerB = document.getElementById('answerB');
    let answerC = document.getElementById('answerC');
    let answerD = document.getElementById('answerD');

    var questionList = [
        {
            question: 'How far is Saturn from Earth?',
            answers: ['950.3 billion mi', '832.3 million mi', '1.4 billion mi', '8.9 mi'],
            correct: '832.3 million mi'
        },
        {
            question: 'How many moons does Saturn have?',
            answers: ['146', '238', '43', '7'],
            correct: '146'
        },
        {
            question: 'What planets lie between Earth and Saturn?',
            answers: ['Venus and Uranus', 'Mercury and Mars', 'Venus and Mars', 'Jupiter and Mars'],
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

        answerA.onclick = () => handleAnswerClick(questionList[index], answerA.innerHTML, index);
        answerB.onclick = () => handleAnswerClick(questionList[index], answerB.innerHTML, index);
        answerC.onclick = () => handleAnswerClick(questionList[index], answerC.innerHTML, index);
        answerD.onclick = () => handleAnswerClick(questionList[index], answerD.innerHTML, index);
    } else {
        typeFinalMessage();
    }
}

function handleAnswerClick(question, selectedAnswer, index) {
    if (!answerSelected) {
        answerSelected = true;
        checkAnswer(question, selectedAnswer, index);
    }
}

function getRandomImages() {
    var images = [
        '../level-sage/images/cat1.jpg',
        '../level-sage/images/cat2.jpg',
        '../level-sage/images/cat3.jpg',
        '../level-sage/images/puppy1.jpg',
        '../level-sage/images/puppy2.jpg',
        '../level-sage/images/puppy3.jpg'
    ];

    var randomIndices = [];
    while (randomIndices.length < 2) {
        var randomIndex = Math.floor(Math.random() * images.length);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }

    return [images[randomIndices[0]], images[randomIndices[1]]];
}

function typeWriterAnswer(message, callback, clearBeforeNext = false) {
    var i = 0;
    document.getElementById("alienChatBox").innerHTML = '';

    function type() {
        if (i < message.length) {
            document.getElementById("alienChatBox").innerHTML += message.charAt(i);
            i++;
            setTimeout(type, textSpeed);
        } else if (callback) {
            if (clearBeforeNext) {
                setTimeout(() => {
                    document.getElementById("alienChatBox").innerHTML = '';
                    callback();
                }, pauseTime);
            } else {
                setTimeout(callback, pauseTime);
            }
        }
    }

    type();
}

function checkAnswer(question, selectedAnswer, index) {
    if (selectedAnswer === question.correct) {
        // Resets the opacity
        lossImgRight.style.opacity = 0; 
        lossImgLeft.style.opacity = 0; 
        document.getElementById('lossImgs').style.display = "none";
        typeWriterAnswer('You have passed this question.', () => {
            answerSelected = false; // Reset the flag
            displayQuestion(index + 1);

        }, true);
    } else {
        // Resets the opacity
        lossImgRight.style.opacity = 0; 
        lossImgLeft.style.opacity = 0; 
        typeWriterAnswer('Incorrect! Now feel my wrath!', () => {
            // Display images
            let [img1, img2] = getRandomImages();
            document.getElementById('lossImgLeft').src = img1;
            document.getElementById('lossImgRight').src = img2;
            document.getElementById('lossImgs').style.display = "block";
            setTimeout(() => {
                lossImgRight.style.opacity = 1; 
                lossImgLeft.style.opacity = 1; 
            }, 500); 
            // Type the second part after images fade in
            setTimeout(() => {
                typeWriterAnswer('Wait, what is happening?!? Not again!', () => {
                    answerSelected = false; // Reset the flag
                });
            }, 2000);
        });
    }
}
function typeFinalMessage() {
    typeWriterAnswer('Blasted! How did you get past my questions? Hmph, nevermind, I won\'t waste my time on a puny human.', null, true);
    document.getElementById('multipleChoiceQuestion').style.display = "none"; 
    document.getElementById('multipleChoiceAnswers').style.display = "none"; 

    // Ensure the transition property is set for smooth fading out
    alienQuizDiv.style.transition = "opacity 1s ease-in-out";
    alienQuizDiv.style.opacity = 1; // Make sure it's fully opaque before fading out

    setTimeout(() => {
        alienQuizDiv.style.opacity = 0; // Fade out
        setTimeout(() => {
            wikiContainer.style.display = "block";
            alienQuizDiv.style.display = "none"; 
        }, 1000); // Match the duration of the transition
    }, 10000);
document.getElementById('wikiText').innerHTML = 
    'From Wikipedia, the free encylcopedia.<br>' +
    '<br>' +
    'Shuttle Orbiter Columbia (NASA Designation: OV-102) was the oldest <span>space shuttle</span> in ' +
    '<span>NASA</span>\'s fleet, first flying mission <span>STS-1</span> from <span>April 12</span> to ' +
    '<span>April 14, 1981</span>. It was lost with all crew on re-entry on its 28th mission, ' +
    '<span>STS-107</span>, which lasted from <span>January 16</span> to February 1, 2003. ' +
    '<br>' +
    '<br>' +
    'After being constructed, the orbiter arrived at <span>John F. Kennedy Space Center</span> on <span>March 25, 1979</span> to be ' +
    'prepared for its first launch. However, before its first mission three workers were killed and five ' +
    'injured during a ground test of the orbiter on <span>March 19, 1981</span>. ' +
    '<br>' +
    '<br>' +
    'The first flight of Columbia was commanded by <span>John Young</span> (a space veteran from the <span>Gemini</span> and <span>Apollo</span> ' +
    'eras) and piloted by <span>Robert Crippen</span> a rookie who had never been in space before, but who served as ' +
    'support crew for the <span>Skylab</span> missions and <span>Apollo-Soyuz</span>. ' +
    '<br>' +
    '<br>' +
    'In <span>1983</span> Columbia launched the first mission (<span>STS-9</span>) with 6 astronauts, including the first ' +
    'non-American astronaut, <span>Ulf Merbold</span>, from <span>Germany</span> on a <span>space shuttle</span>. On <span>January 12, 1986</span> Columbia ' +
    'took off with the first <span>Hispanic-American astronaut</span>, <span>Dr. Franklin R. Chang-Diaz</span>. Another first was ' +
    'announced on <span>March 5, 1998</span> when NASA named their choice of <span>United States Air Force</span> Lt. Col. ' +
    '<span>Eileen Collins</span> as commander of a future Columbia mission making Collins the first woman commander of a ' +
    'space shuttle mission. On its final mission the craft was carrying the first <span>Israeli</span> astronaut, ' +
    '<span>Ilan Ramon</span> and the first woman astronaut of <span>Indian</span> birth, <span>Kalpana Chawla</span>. Other crew members on the final ' +
    'flight included <span>Rick Husband</span> (commander), <span>Willie McCool</span> (pilot), <span>Michael P. Anderson</span>, <span>Laurel Clark</span>, ' +
    'and <span>David Brown</span>. ' +
    '<br>' +
    '<br>' +
    'On the morning of February 1, <span>2003</span>, the shuttle re-entered the atmosphere after a 16-day scientific ' +
    'mission. <span>NASA</span> lost radio contact at about 9 a.m. EST, only minutes before the expected 09:16 landing ' +
    'at <span>Kennedy Space Center</span> in Florida. Video recordings show the craft breaking up in flames over ' +
    'Texas, at an altitude of approximately 39 miles (63 km) and a speed of 12,500 mph (20,000 km/h). ' +
    '<br>' +
    '<br>' +
    'See also: <span>Space Shuttle Columbia disaster</span>';

    document.getElementById('alienLink').innerHTML = 'English';
    document.getElementById('alienLink').style.color = 'blue'; 
  
     isCollisionDetectionActive = false;
    decoderDiv.style.display = "none";
    bugReportPopUp.style.display = "none";
    alienLinkDiv.style.display = "none";
    bugReportsLinkDiv.style.display = "none";
    bugReportsLink.style.color = "blue";


      
}

// Clippy code

document.addEventListener("DOMContentLoaded", function() {

    /* Change the strings below based on your level's initial message and hint */
  
    const initialText = "Take a walk around!";
    const hintText = "Click me for a hint!";
    const clickText = "Surely alien isn't a language?";
  
    const hintElement = document.getElementById("hint");
    let indexClippy = 0;
    let currentText = initialText;
  
    function typeText(text) {
        hintElement.innerHTML = ''; // Clear the existing text
        indexClippy = 0;
        currentText = text;
        typeNextCharacter();
    }
  
    function typeNextCharacter() {
        if (indexClippy < currentText.length) {
            hintElement.innerHTML += currentText.charAt(indexClippy);
            indexClippy++;
            setTimeout(typeNextCharacter, 50);
        }
    }
  
    typeText(initialText);
    
  
    /* Adjust the time below based on when you want the hint to show */
  
    // Show "Click me for a hint!" after 2.5 minutes
    setTimeout(function() {
        typeText(hintText);
    }, 150000); // 2.5 minutes = 150000 milliseconds
  
   // Click event handler
   function handleClick() {
    typeText(clickText);
    // Remove click event listener after first click
    document.getElementById('clippy-agent').removeEventListener('click', handleClick);
  }
  
  // Add click event listener
  document.getElementById('clippy-agent').addEventListener('click', handleClick);
  
  });
