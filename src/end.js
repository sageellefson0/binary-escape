/* ----------------- Character Dancing --------------------- */

const selectedCharacter = localStorage.getItem("character");
const videoElement = document.getElementById("intern-dancing");

if (selectedCharacter === "male") {
  videoElement.src = "../../3d-models/boy-intern-dancing.mp4";
  videoElement.setAttribute("aria-label", "video of boy intern jumping out of computer and dancing");
} else if (selectedCharacter === "female") {
  videoElement.src = "../../3d-models/girl-intern-dancing.mp4";
  videoElement.setAttribute("aria-label", "video of girl intern jumping out of computer and dancing");
}

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function() {
    // Select the video element
    const video = document.getElementById('intern-dancing');

    // Set a timeout to play the video after 3 seconds
    setTimeout(function() {
        video.play();
    }, 2500);
});

// ADDED BY SE for keep exploring button
const keepExploringButton = document.querySelector('.keepExploringButton');

function navigateToDesktopLvl() {
    window.location.href = "../desktop/level-desktop.html";
}

// Event Listener: Listens for click on the Keep Exploring button and redirects to the desktop level if it is clicked
keepExploringButton.addEventListener('click', navigateToDesktopLvl);


