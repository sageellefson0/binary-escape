document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title h1');
    const lockIcon = document.querySelector('#lock-bm');
    const instructions = document.getElementById('instructions');
    const characters = document.getElementById('characters');

    window.animationPlayed = false

    if (!animationPlayed) {
        // Initial transition to center
        setTimeout(() => {
            title.style.transform = 'translateX(0)';
            lockIcon.style.transform = 'translateX(0)';
        }, 250);


        // Float to the top
        setTimeout(() => {
            title.classList.add('float-to-top');
            lockIcon.classList.add('float-to-top');
        }, 3250);

        // Fade in rest of the page
        setTimeout(() => {
            instructions.classList.add('fade-in');
            characters.classList.add('fade-in');
        }, 4750); // Adjust timing as needed

        // Set the animation played flag 
        window.animationPlayed = true
    } 
});
