document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title h1');
    const lockIcon = document.querySelector('#lock-bm');
    const instructions = document.getElementById('instructions');
    const characters = document.getElementById('characters');

    const ANIMATION_KEY = 'animationPlayed';
    const animationPlayed = sessionStorage.getItem(ANIMATION_KEY);

    if (animationPlayed !== 'true') {
        console.log("entered loop")
        // Initial transition to center
        setTimeout(() => {
            title.style.transform = 'translateX(0)';
            lockIcon.style.transform = 'translateX(0)';
        }, 250);


        // Float to the top
        setTimeout(() => {
            title.style.transform = 'translateY(-35vh)';
            lockIcon.style.transform = 'translateY(-35vh)';
        }, 3250);


        // Fade in rest of the page
        setTimeout(() => {
            title.style.transition = 'none';
            lockIcon.style.transition = 'none';
            instructions.classList.add('fade-in');
            characters.classList.add('fade-in');
        }, 5750); 

        // Set the animation played flag
        localStorage.setItem(ANIMATION_KEY, 'true');
    } 
});
