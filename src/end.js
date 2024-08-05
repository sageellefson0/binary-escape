// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function() {
    // Select the video element
    const video = document.getElementById('female-intern-dancing');

    // Set a timeout to play the video after 3 seconds
    setTimeout(function() {
        video.play();
    }, 2500);
});

document.addEventListener('DOMContentLoaded', () => {
    const endPage = document.querySelector('.end-page');

    // Initial fade-in animation
    setTimeout(() => {
        endPage.style.opacity = '1'; // Ensure the fade-in animation starts
    }, 0);

    // Trigger fade-out animation after 15 seconds
    setTimeout(() => {
        endPage.style.animation = 'fadeOutOpacity 3s ease-in-out forwards';
    }, 16000); // 15 seconds
});