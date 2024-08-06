import { completeLevel } from '/src/firebase.js'; // Adjust the path as necessary

document.addEventListener("DOMContentLoaded", () => {
    const binarySequence = '010101011010'; // Binary sequence representing true/false
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
    const character = document.querySelector('.character'); // Assuming character has this class
    let isPopupOpen = false; // Track popup state

    // Function to generate questions based on the binary sequence
    function generateQuestions(sequence) {
        questionsContainer.innerHTML = ''; // Clear previous questions
        for (let i = 0; i < sequence.length; i++) {
            const isTrue = sequence[i] === '1';
            const questionHTML = `
                <div class="question">
                    <label for="answer${i}">
                        Question ${i + 1}: Is the bit at position ${i + 1} true (1) or false (0)?
                    </label>
                    <input type="radio" name="answer${i}" value="true"> True
                    <input type="radio" name="answer${i}" value="false"> False
                </div>
            `;
            questionsContainer.innerHTML += questionHTML;
        }
    }

    // Function to check the answers
    window.checkAnswers = function() {
        let correct = true;
        for (let i = 0; i < binarySequence.length; i++) {
            const selected = document.querySelector(`input[name="answer${i}"]:checked`);
            if (!selected) {
                correct = false;
                errorDiv.textContent = 'Please answer all questions.';
                resultDiv.textContent = '';
                return;
            }
            const answer = selected.value === 'true';
            const correctAnswer = binarySequence[i] === '1';
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
            closePopup();
            showPasswordPopup();
        }
    }

    // Function to show the popup
    function showPopup() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        generateQuestions(binarySequence);
        isPopupOpen = true; // Update popup state
    }

    // Function to close the popup
    window.closePopup = function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        isPopupOpen = false; // Update popup state
    }

    // Function to show the new password popup
    function showPasswordPopup() {
        passwordPopup.style.display = 'block';
        overlay.style.display = 'block';
    }

    // Function to close the password popup
    window.closePasswordPopup = function() {
        passwordPopup.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Function to handle password submission
    window.submitPassword = function() {
        const enteredPassword = passwordInput.value.trim();
        const correctPassword = 'binaryEscapeTeamHasFooledYou';
        if (enteredPassword === correctPassword) {
            passwordResultDiv.textContent = 'Correct password!';
            closePasswordPopup();
            showCongratulations();
        } else {
            passwordResultDiv.textContent = 'Incorrect password. Try again.';
        }
    }

    // Function to show the congratulatory image
    function showCongratulations() {
        congratulationsDiv.style.display = 'block';
        overlay.style.display = 'block';
        // Call this function when the user completes the Skype level
        completeLevel('skype');
    }

    // Function to close the congratulatory image
    window.closeCongratulations = function() {
        congratulationsDiv.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Function to get the element's position
    function getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }

    let characterInside = false;

    // Function to detect proximity
    function detectProximity() {
        const characterPos = getElementPosition(character);
        const buttonPos = getElementPosition(button);

        const distance = Math.sqrt(
            Math.pow(buttonPos.left - characterPos.left, 2) + Math.pow(buttonPos.top - characterPos.top, 2)
        );

        const proximityThreshold = 100;

        if (distance < proximityThreshold && !isPopupOpen) {
            if (characterInside === false) {
                showPopup();
                characterInside = true;
            }
        } else if (distance >= proximityThreshold) {
            characterInside = false;
        }
    }

    // Call detectProximity periodically
    setInterval(detectProximity, 100); // Check every 100ms

    // Event listener for the close button inside the popup
    const closeButton = document.querySelector('#popup button');
    console.log("Close button:", closeButton); // Debug log
    closeButton.addEventListener('click', closePopup);

    // Event listener for the password popup close button
    const passwordPopupCloseButton = document.querySelector('#passwordPopup button');
    passwordPopupCloseButton.addEventListener('click', closePasswordPopup);
});



