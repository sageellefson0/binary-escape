import { completeLevel } from '/src/firebase.js'; // Adjust the path as necessary


/* ----------------- Instagram Javascript --------------------- */
// Handle comment input on Enter key press
document.addEventListener("DOMContentLoaded", () => {
    var add_comment = document.querySelector('.add_comment');
    var comment1 = document.getElementById("comment1");

    add_comment.addEventListener("input", () => {
        if(comment1.value.trim() !== ""){

        }
    })

    // TODO: REMOVE THIS, TEMP CODE 
let tempBtn = document.getElementById('tempBtn');

tempBtn.addEventListener('click', () => {
    // Call this function when the user completes the Skype level
      completeLevel('instagram');
      console.log("am I being called?");
});
})

// Toggle like button
var btn4 = document.getElementById('btn4');

function Toggle() {
    if (btn4.classList.contains("far")) {
        btn4.classList.remove("far");
        btn4.classList.add("fas");
    } else {
        btn4.classList.remove("fas");
        btn4.classList.add("far");
    }
}



/*---------------------------CLIPPY------------------------- */
document.addEventListener("DOMContentLoaded", function() {

    /* Change the strings below based on your level's initial message and hint */
  
    const initialText = "Welcome to InstaQuest! You're in for a treat, that's for sure!";
    const hintText = "Click me for a hint!";
    const clickText = "Comment below to answer";
  
    const hintElement = document.getElementById("hint");
    let index = 0;
    let currentText = initialText;
  
    function typeText(text) {
        hintElement.innerHTML = ''; // Clear the existing text
        index = 0;
        currentText = text;
        typeNextCharacter();
    }
  
    function typeNextCharacter() {
        if (index < currentText.length) {
            hintElement.innerHTML += currentText.charAt(index);
            index++;
            setTimeout(typeNextCharacter, 50);
        }
    }
  
    typeText(initialText);
    
  
    /* Adjust the time below based on when you want the hint to show */
  
    // Show "Click me for a hint!" after 2.5 minutes
    setTimeout(function() {
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