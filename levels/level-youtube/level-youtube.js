import { completeLevel } from '/src/firebase.js'; // Adjust the path as necessary

let passwordYTInput = document.getElementById('passwordYTInput');
const YTSubmitBtn = document.getElementById('YTSubmitBtn');
const prisonBars = document.getElementById('prisonBars');
const charSpeechText = document.getElementById('charSpeechText');


// Varying failure messages to play on incorrect password attempts
const errorMessages = [
    "Try again! I think you'll get it next time.",
    "No luck, I believe in you!",
    "Please hurry, these bars are messing up my hair!"
];
let currentMessageIndex = 0;


// Function: Handle the submission of the password and check to see if there are special characters, and if the password is correct
function handleSubmit() {
    const inputValue = passwordYTInput.value.trim().toLowerCase();

    // Expression to check for any character that is not a letter (a-z)
    const nonLetterPattern = /[^a-z]/;

    if (nonLetterPattern.test(inputValue)) {
        alert("No special characters or numbers allowed! The password must be letters only.");
        return;
    }

    if (inputValue === "subscribe") {
        prisonBars.style.display = "none";
        charSpeechText.innerHTML = "Woohoo! Thank you for saving me!";
        completeLevel('youtube');

        setTimeout(() => {
            window.location.href = "../desktop/level-desktop.html";
        }, 2000);
    } else {
        // Rotates through error messages
        charSpeechText.innerHTML = errorMessages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % errorMessages.length;
    }
}


// Event listener for the submit button
YTSubmitBtn.addEventListener('click', handleSubmit);

// Event listener for the Enter key on the password input
passwordYTInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSubmit();
    }
});



/* ----------------- Character Icon --------------------- */

const selectedCharacter = localStorage.getItem("character");

// Render character image based on if male or female selected
if (selectedCharacter === "male") {
  document.getElementById("characterYT").src = "../level-youtube/images/malechar.png";
} else if (selectedCharacter === "female") {
  document.getElementById("characterYT").src = "../level-youtube/images/femalechar.png";
}


/////////// CLIPPY CODE ////////////

document.addEventListener("DOMContentLoaded", function () {

    /* Change the strings below based on your level's initial message and hint */

    const initialText = "Sit back and enjoy the video.";
    const hintText = "Click me for a hint!";
    const clickText = "Youtubers always ask you to...";

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
    setTimeout(function () {
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
