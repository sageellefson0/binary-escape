import { completeLevel } from '/src/firebase.js'; // Adjust the path as necessary

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


// Function: check if inputted answers are correct 
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
                    crossword.style.display = "block";
                    alertBoxRight.style.display = "none";
                    alertBoxWrong.style.display = "none"
        });
    }
}
    
// function answer(e) {
//     // if enter key is pressed
//     if (e.keyCode == 13) {
//        answerLogic(); 
//     }
// };
var userAnswer1 = document.getElementById('florence');
var userAnswer2 = document.getElementById('australia');
var userAnswer3 = document.getElementById('south_america');

userAnswer1.addEventListener('keypress', function(e) {
    answer(e);
});

userAnswer2.addEventListener('keypress', function(e) {
    answer(e);
});

userAnswer3.addEventListener('keypress', function(e) {
    answer(e);
});

//Function: check if enter key is pressed
function answer(e) {
    if (e.keyCode == 13) {
       answerLogic(); 
    }
};

//Function: check if post button is clicked and run answerLogic() function if true
for (let i = 0; i < postButton.length; i++) {
    postButton[i].addEventListener('click', ()=> {
        answerLogic();
    });
}

// Make post button visible while user is typing input/comment
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
const alertBoxRight = document.getElementById('alertBoxRight');
const alertBoxWrong = document.getElementById('alertBoxWrong');

const okBtn = document.querySelectorAll(".okBtn");
// const okBtn2 = document.querySelector("okBtn2");

okBtn.forEach(button => button.addEventListener('click', ok));
// okBtn2.addEventListener('click', ok);

// Function: remove alert box when ok button is clicked
function ok() {
    alertBoxRight.style.display = "none";
    alertBoxWrong.style.display = "none";
};

// function back() {
//         crossword.style.display = "none";
// };


const doneButton = document.getElementById('doneButton');

// check if done button is clicked and go back to desktop if true
doneButton.addEventListener('click', ()=> {
    completeLevel('instagram');
    const crossword = document.getElementById('crossword');
    crossword.style.display = "none";

    // Timeout provides buffer for completeLevel to be logged correctly - don't remove
    setTimeout(function() {
        window.location.href='../../levels/desktop/level-desktop.html';
    }, 1500);
});

// Toggle like button
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');

// Function: turn like button red on click and blank on click again
// function Toggle() {
//     if (btn1.classList.contains("far")) {
//         btn1.classList.remove("far");
//         btn1.classList.add("fas");
//     } else if(btn3.classList.contains("far")) {
//         btn3.classList.remove("far");
//         btn3.classList.add("fas");
//     } else if(btn3.classList.contains("far")) {
//         btn3.classList.remove("far");
//         btn3.classList.add("fas");
//     } else {
//         btn1.classList.remove("fas");
//         btn2.classList.remove("fas");
//         btn3.classList.remove("fas");
//         btn1.classList.add("far");
//         btn2.classList.add("far");
//         btn3.classList.add("far");
//     }
// };

// Function: turn like button red on click and black on click again
function Toggle(buttonId) {
    var btn = document.getElementById(buttonId);// The clicked button

    if (btn.classList.contains("far")) {
        // Change the button to solid red
        btn.classList.remove("far");
        btn.classList.add("fas");
    } else {
        // Change the button back to outline black
        btn.classList.remove("fas");
        btn.classList.add("far");
    }
}

// Adding event listeners to all like buttons
document.getElementById('btn1').addEventListener('click', function() {
    Toggle('btn1'); // 'this' refers to the clicked element
});

document.getElementById('btn2').addEventListener('click', function() {
    Toggle('btn2'); // 'this' refers to the clicked element
});

document.getElementById('btn3').addEventListener('click', function() {
    Toggle('btn3'); // 'this' refers to the clicked element
});
/*---------------------------CLIPPY------------------------- */
document.addEventListener("DOMContentLoaded", function() {

    /* Change the strings below based on your level's initial message and hint */
  
    const initialText = "Welcome to InstaQuest! You're in for a treat, that's for sure!";
    const hintText = "Click me for a hint!";
    const clickText = "Comment below to answer the riddles.";
  
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