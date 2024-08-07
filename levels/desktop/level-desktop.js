import { selectedCharacter } from '../../src/firebase.js';

const howToPlayWindow = document.querySelector('.howToPlayWindow');
const closeHowToPlay = document.querySelector('.close');
const notepadIcon = document.querySelector('.notepadIcon');
const levelBody = document.querySelector('.level-desktop');
const howToPlayIcon = document.getElementById("howToPlayIcon");
const desktopDiv = document.getElementById("desktopDiv");
const introTextBox = document.getElementById("introTextBox");




// Closes the decoder div by setting display to none.
function closeHowToPlayWindow() {
    howToPlayWindow.style.display = "none";
}


closeHowToPlay.addEventListener('click', closeHowToPlayWindow);



// Closes the decoder div by setting display to none.
function openHowToPlayWindow() {
    howToPlayWindow.style.display = "block";
}


howToPlayIcon.addEventListener('click', openHowToPlayWindow);


// Function: Hides the into page and displays the desktop
function hideIntroDisplayDesktop() {
    introDiv.classList.add('fade-out');
    desktopDiv.classList.add('fade-in');
    desktopDiv.style.display = "block";
    setTimeout(() => {
        introDiv.style.display = "none";
    }, 2000); 
}


function displayBSOD(){
    introDiv.style.backgroundImage = "url('../desktop/images/BSOD.png')";
    setTimeout(() => {
        introDiv.style.backgroundImage = 'none';
    }, 3000);

}




// Calls the dialogue to begin showing when the page loads
window.onload = function () {
    initializeDesktopLevel();
    introTextTyping();
    setTimeout(() => {
        displayBSOD()
        }, 23500);
    
        setTimeout(() => {
            hideIntroDisplayDesktop()
            }, 35000);
        };

// Dialogue for intro window after starting the game
var introInteger = 0;
var lineIndexIntro = 0;
var typingTextIntro = [
    '[click, squeek, swoosh, thump thump thump thump]',
    'I can\'t believe the boss is making me stay late!',
    'Just to go through this dusty old closet... of course they leave it to the intern...',
    'Alright let\s check out this USB drive...',
    '[click clack click clack, beep]',
    '  ',
    'Ugh, blue screen from a USB? Let\'s try that again.',
    'Wait, what\'s happening?! Ahhhhhhhhhhhhh!'


];
var textSpeedIntro = 80; // Text speed
var pauseTimeIntro = 1000; // Pause time between lines

// Function: Displays the diaglogue box and begins running through the text lines in the typing text variable
function introTextTyping(callback) {
    if (lineIndexIntro < typingTextIntro.length) {
        if (introInteger < typingTextIntro[lineIndexIntro].length) {
            document.getElementById("introTextBox").innerHTML += typingTextIntro[lineIndexIntro].charAt(introInteger);
            introInteger++;
            setTimeout(() => introTextTyping(callback), textSpeedIntro);
        } else {
            introInteger = 0;
            lineIndexIntro++;
            setTimeout(() => {
                document.getElementById("introTextBox").innerHTML = '';
                if (lineIndexIntro < typingTextIntro.length) {
                    setTimeout(() => introTextTyping(callback), textSpeedIntro); // Start typing the next line
                } else if (callback) {
                    callback(); // Call the callback function after the last line
                }
            }, pauseTimeIntro); 
            // Pause before clearing the line
        }
    }

}

let time = document.querySelector(".time");

function updateTime() {
    const now = new Date();
    time.innerHTML = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true }).format(now);
    time.setAttribute("title", new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true, year: 'numeric', month: 'long', day: 'numeric' }).format(now));
}

// Update the time immediately
updateTime();

// Calculate the time remaining until the next full minute
const now = new Date();
const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

// Set a timeout to run the first update at the next full minute
setTimeout(() => {
    // Update the time at the next full minute
    updateTime();
    
    // Then set an interval to update the time every minute
    setInterval(updateTime, 60000);
}, msUntilNextMinute);


function initializeDesktopLevel() {
    // Check if selectedCharacter is set
    if (selectedCharacter) {
      loadCharacterSprite(selectedCharacter); // Load the sprite for the selected character
    } else {
      console.error('Character selection not available');
    }
  }
  


function loadCharacterSprite(character) {
    if (character === 'female') {
      characterSpritesheet.style.background = 'url("images/binaryescapefemalecharacter1.png") no-repeat no-repeat';
      console.log('female');
    } else if (character === 'male') {
      characterSpritesheet.style.background = 'url("images/binaryescapemalecharacter1.png") no-repeat no-repeat';
    }
  }