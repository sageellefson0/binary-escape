
import { completeLevel } from '/src/firebase.js'; // Import the function to mark the level as complete


document.addEventListener("DOMContentLoaded", () => {
    const binarySequence = '010101011010'; // Binary sequence used to generate questions
    const questionsContainer = document.getElementById('questions');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const button = document.querySelector('#problemssigninginbutton button');
    const passwordPopup = document.getElementById('passwordPopup');
    const passwordInput = document.getElementById('passwordInput');
    const passwordResultDiv = document.getElementById('passwordResult');
    const congratulationsDiv = document.getElementById('congratulations');
    const character = document.querySelector('.character'); // The character element for proximity detection
    let isPopupOpen = false; // Track whether the popup is open or not

    // Function to generate questions based on the binary sequence
    function generateQuestions(sequence) {
        questionsContainer.innerHTML = ''; // Clear previous questions
        for (let i = 0; i < sequence.length; i++) {
            const isTrue = sequence[i] === '1'; // Determine if the bit is true or false
            const questionHTML = `
                <div class="question">
                    <label for="answer${i}">
                        <span class="question-header">Question ${i + 1}:</span>
                        <span class="question-text">Is the bit at position ${i + 1} true (1) or false (0)?</span>
                    </label>
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input class="answer-radiobutton" type="radio" name="answer${i}" value="true">
                    <span class="true-option">True</span>
                    <input class="answer-radiobutton" type="radio" name="answer${i}" value="false">
                    <span class="false-option">False</span>
                </div>
            `;
            questionsContainer.innerHTML += questionHTML; // Append the question to the container
        }
    }

    // Function to check the answers against the binary sequence
    window.checkAnswers = function() {
        let correct = true; // Assume answers are correct initially
        for (let i = 0; i < binarySequence.length; i++) {
            const selected = document.querySelector(`input[name="answer${i}"]:checked`);
            if (!selected) {
                correct = false;
                errorDiv.textContent = 'Please answer all questions.';
                resultDiv.textContent = '';
                return;
            }
            const answer = selected.value === 'true'; // Get the selected answer
            const correctAnswer = binarySequence[i] === '1'; // Get the correct answer from the sequence
            if (answer !== correctAnswer) {
                correct = false;
                errorDiv.textContent = '';
                resultDiv.textContent = 'Incorrect answers. Try again.';
                return;
            }
        }
        if (correct) {
            resultDiv.textContent = 'Congratulations! You guessed the password correctly!';
            errorDiv.textContent = '';
            closePopup(); // Close the question popup
            showPasswordPopup(); // Show the password entry popup
        }
    }

    // Function to display the popup with questions
    function showPopup() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        generateQuestions(binarySequence); // Generate and display questions
        isPopupOpen = true; // Update popup state
    }

    // Function to close the question popup
    window.closePopup = function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        isPopupOpen = false; // Update popup state
    }

    // Function to display the password popup
    function showPasswordPopup() {
        passwordPopup.style.display = 'block';
        overlay.style.display = 'block';
    }

    // Function to close the password popup
    window.closePasswordPopup = function() {
        passwordPopup.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Function to handle the password submission and validation
    window.submitPassword = function() {
        const enteredPassword = passwordInput.value.trim();
        const correctPassword = 'binaryEscapeTeamHasFooledYou';
        if (enteredPassword === correctPassword) {
            passwordResultDiv.textContent = 'Correct password!';
            closePasswordPopup();
            showCongratulations(); // Show congratulations message and transition to next page
        } else {
            passwordResultDiv.textContent = 'Incorrect password. Try again.';
        }
    }

    // Function to display the congratulations message and transition
    function showCongratulations() {
        congratulationsDiv.style.display = 'block';
        overlay.style.display = 'block';
        // Call this function when the user completes the Skype level
        completeLevel('skype');

        setTimeout(() => {
            window.location.href = "../desktop/level-desktop.html"; // Redirect to the next level
        }, 4000); // Delay the redirect to allow users to view the congratulations message
    }

    // Function to close the congratulations message
    window.closeCongratulations = function() {
        congratulationsDiv.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Function to get the element's position on the page
    function getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }

    let characterInside = false; // Track if the character is inside the proximity range

    // Function to detect proximity between the character and the button
    function detectProximity() {
        const characterPos = getElementPosition(character);
        const buttonPos = getElementPosition(button);

        const distance = Math.sqrt(
            Math.pow(buttonPos.left - characterPos.left, 2) + Math.pow(buttonPos.top - characterPos.top, 2)
        );

        const proximityThreshold = 100; // Distance threshold for triggering popup

        if (distance < proximityThreshold && !isPopupOpen) {
            if (characterInside === false) {
                showPopup();
                characterInside = true; // Update character proximity state
            }
        } else if (distance >= proximityThreshold) {
            characterInside = false;
        }
    }

    // Periodically check proximity
    setInterval(detectProximity, 100); // Check every 100ms

    // Event listener for the close button inside the popup
    const closeButton = document.querySelector('#close-button');
    closeButton.addEventListener('click', closePopup);

    // Event listener for the password popup close button
    const passwordPopupCloseButton = document.querySelector('#passwordPopup button');
    passwordPopupCloseButton.addEventListener('click', closePasswordPopup);
});


/////////// CLIPPY CODE ////////////

document.addEventListener("DOMContentLoaded", function () {

    /* Change the strings below based on your level's initial message and hint */

    const initialText = "Take a walk around!";
    const hintText = "Click me for a hint!";
    const clickText = "How can I sign in without an account...";

    const hintElement = document.getElementById("hint");
    let indexClippy = 0;
    let currentText = initialText;

    function typeText(text) {
        hintElement.innerHTML = ''; // Clear the existing text
        indexClippy = 0;
        currentText = text;
        typeNextCharacter();
    }

    function typeNextCharacter() {
        if (indexClippy < currentText.length) {
            hintElement.innerHTML += currentText.charAt(indexClippy);
            indexClippy++;
            setTimeout(typeNextCharacter, 50);
        }
    }

    typeText(initialText);


    /* Adjust the time below based on when you want the hint to show */

    // Show "Click me for a hint!" after 2.5 minutes
    setTimeout(function () {
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

