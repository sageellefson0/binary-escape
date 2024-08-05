// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function() {
    // Select the video element
    const video = document.getElementById('female-intern-dancing');

    // Set a timeout to play the video after 3 seconds
    setTimeout(function() {
        video.play();
    }, 2500);
});

