// import { completeLevel } from '/src/firebase.js'; // Adjust the path as necessary

/* ----------------- Instagram Javascript --------------------- */
// Passwords
const cityAnswer = "florence";
const countryAnswer = "australia";                        
const continentAnswer = "southamerica";

var count = 0;
var postButton = document.getElementsByClassName("post_comment");
var wrong = document.getElementsByClassName('wrong');
var right = document.getElementsByClassName('right');
var yourComment = document.getElementsByClassName('your_comment');
var correctPassword = document.getElementsByClassName('update_comment');
var exploreButton = document.getElementById('explore')
var crossword = document.getElementById('crossword')

// user answers

var inputs = document.querySelectorAll('input[name="password"]');
var userAnswer1 = document.getElementById('florence');
var userAnswer2 = document.getElementById('australia');
var userAnswer3 = document.getElementById('south_america');

function answerLogic() {
    if (userAnswer1.value.toLowerCase() == cityAnswer) {
                correctPassword[0].innerHTML = userAnswer1.value;
                yourComment[0].style.display = 'block';
                // clear input box 
                userAnswer1.value = "";
                // remove post button
                postButton[0].style.visibility = "hidden";
            } else if (userAnswer2.value.toLowerCase() == countryAnswer) {
                correctPassword[1].innerHTML = userAnswer2.value;
                yourComment[1].style.display = 'block';
                // clear input box 
                userAnswer2.value = "";
                // remove post button
                postButton[1].style.visibility = "hidden";
            } else if (userAnswer3.value.split(" ").join("").toLowerCase() == continentAnswer) {
                correctPassword[2].innerHTML = userAnswer3.value;
                yourComment[2].style.display = 'block';
                // clear input box 
                userAnswer3.value = "";
                // remove post button
                postButton[2].style.visibility = "hidden";
            } else {
                // display wrong alert box
                wrong[0].style.display = 'block';
            }

            // Update count based on visibility of yourComment
            count = 0; // Reset count
            for (let i = 0; i < yourComment.length; i++) {
                if (yourComment[i].style.display === 'block') {
                    count += 1;
                }
            }

            // display congratulations alert box
            if (count === 3) {
                right[0].style.display = 'block';
                // explore button to crossword
                exploreButton.addEventListener('click', ()=> {
                    crossword.style.display = "block"

                    // TODO: REMOVE THIS, TEMP CODE 
                let tempBtn = document.getElementById('tempBtn');

                tempBtn.addEventListener('click', () => {
                    // Call this function when the user completes the Skype level
                    completeLevel('instagram');
                    console.log("am I being called?");
            });
        });
    }
}
    
function answer(e) {
    // if enter key is pressed
    if (e.keyCode == 13) {
       answerLogic(); 
    }
};

for (let i = 0; i < postButton.length; i++) {
    postButton[i].addEventListener('click', ()=> {
        answerLogic();
    });
}

inputs.forEach(input => {
        input.addEventListener("input", () => {
            // show post button
            if (userAnswer1.value.trim() !== "") {
                postButton[0].style.visibility = "visible";
            } else {
                postButton[0].style.visibility = "hidden";
            }

            if (userAnswer2.value.trim() !== "") {
                postButton[1].style.visibility = "visible";
            } else {
                postButton[1].style.visibility = "hidden";
            }

            if (userAnswer3.value.trim() !== "") {
                postButton[2].style.visibility = "visible";
            } else {
                postButton[2].style.visibility = "hidden";
            }
        }
    )  
});

// Alert box
function ok() {
    var alertBox = document.getElementsByClassName('alertBox');
    for (i in alertBox) {
        alertBox[i].style.display = 'none';
    };
};

function back() {
        crossword.style.display = "none";
};

function done() {
    window.location.href='../../levels/desktop/level-desktop.html';
};

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
    }, 10000); // 2.5 minutes = 150000 milliseconds
  
   // Click event handler
   function handleClick() {
    typeText(clickText);
    // Remove click event listener after first click
    document.getElementById('clippy-agent').removeEventListener('click', handleClick);
  }
  
  // Add click event listener
  document.getElementById('clippy-agent').addEventListener('click', handleClick);
  
  });