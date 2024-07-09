// Added ability to display div on click of the link Alien
const alienLink = document.querySelector('.alienLink');
const gameDiv = document.querySelector('.gameDiv');


  alienLink.addEventListener("click", openPopUp);

  function openPopUp() {
    gameDiv.style.display = "block";
    console.log("test");
  }
