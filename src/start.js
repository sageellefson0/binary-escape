
//  document.addEventListener('DOMContentLoaded', () => {
   
    import { setFemale, setMale } from '/src/login.js';

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
        }, 4000);


        // Fade in rest of the page
        setTimeout(() => {
            title.style.transition = 'none';
            lockIcon.style.transition = 'none';
            instructions.classList.add('fade-in');
            characters.classList.add('fade-in');
        }, 6750); 

        // Set the animation played flag
        localStorage.setItem(ANIMATION_KEY, 'true');

const femChar = document.getElementById('femChar');
const maleChar = document.getElementById('maleChar');

// Event listeners to store the character selection
femChar.addEventListener('click', setFemale)
maleChar.addEventListener('click', setMale)



     } 



    // ADDED BY SE 
const selectButton = document.querySelector('.selectButton');
const selectButton2 = document.querySelector('.selectButton2');
const loginDiv = document.getElementById('loginDiv');

function loginWindowDisplay(){
    loginDiv.style.display = "block";

}

selectButton.addEventListener('click', loginWindowDisplay);
selectButton2.addEventListener('click', loginWindowDisplay);

function closeLoginWindow(){
    loginDiv.style.display = "none";
}
// Event Listener: Listens for click on the X icon in the decoder - calls closeLoginWindow() to hide the login window
var closeLoginDiv = document.getElementById('closeLoginDiv');
closeLoginDiv.addEventListener('click', closeLoginWindow);


// });


