
const howToPlayWindow = document.querySelector('.howToPlayWindow');
const closeHowToPlay = document.querySelector('.close');
const notepadIcon = document.querySelector('.notepadIcon');
const levelBody = document.querySelector('.level-desktop');
const howToPlayIcon = document.getElementById("howToPlayIcon");
const desktopDiv = document.getElementById("desktopDiv");
const introTextBox = document.getElementById("introTextBox");


// Function: Hides the how to play window on click of X icon
function closeHowToPlayWindow() {
    howToPlayWindow.style.display = "none";
}
// Event Listener: Listens for a click on the X icon and runs closeHowToPlayWindow when there is a click
closeHowToPlay.addEventListener('click', closeHowToPlayWindow);


// Function: Displays the how to play window on click of the notepad icon
function openHowToPlayWindow() {
    howToPlayWindow.style.display = "block";
}
// Event Listener: Listens for a click on the notepad icon and runs openHowToPlayWindow when there is a click
howToPlayIcon.addEventListener('click', openHowToPlayWindow);


// Function: Displays the blue screen of death after a timeout period during intial log in dialogue
function displayBSOD() {
    introDiv.style.backgroundImage = "url('../desktop/images/BSOD.png')";
    setTimeout(() => {
        introDiv.style.backgroundImage = 'none';
    }, 3000);
}

// Calls the dialogue to begin showing when the page loads
window.onload = function () {
    introTextTyping();
    setTimeout(() => {
        displayBSOD()
    }, 23500);
};

// Variables for intro dialogue
var introInteger = 0;
var lineIndexIntro = 0;
var typingTextIntro = [
    '[click, squeek, swoosh, thump thump thump thump]',
    'I can\'t believe the boss is making me stay late!',
    'Just to go through this dusty old closet... of course they leave it to the intern...',
    'Alright let\'s check out this USB drive...',
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

// Function: Updates the time in the lower right hand corner
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


