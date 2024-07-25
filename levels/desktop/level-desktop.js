const howToPlayWindow = document.querySelector('.howToPlayWindow');
const closeHowToPlay = document.querySelector('.close');
const notepadIcon = document.querySelector('.notepadIcon');
const howToPlayIcon = document.getElementById("howToPlayIcon");



// Closes the decoder div by setting display to none.
function closeHowToPlayWindow() {
    howToPlayWindow.style.display = "none";
}


closeHowToPlay.addEventListener('click', closeHowToPlayWindow);



// Closes the decoder div by setting display to none.
function openHowToPlayWindow() {
    howToPlayWindow.style.display = "block";
    console.log('I am being called');
}


howToPlayIcon.addEventListener('click', openHowToPlayWindow);
