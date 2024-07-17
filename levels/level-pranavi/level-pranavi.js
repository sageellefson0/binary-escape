/* ----------------- Word Application Javascript --------------------- */

document.addEventListener('DOMContentLoaded', function() {
    // Helper function to toggle visibility
    function toggleDisplay(element) {
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    // Function to attach event listeners for color pickers
    function attachColorPickerEvents(className, command) {
        var elements = document.querySelectorAll(className);
        elements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.stopPropagation();
                var colorPicker = element.querySelector('.color-picker');
                toggleDisplay(colorPicker);
            });
        });

        document.addEventListener('click', function(e) {
            elements.forEach(function(element) {
                var colorPicker = element.querySelector('.color-picker');
                if (!element.contains(e.target)) {
                    colorPicker.style.display = 'none';
                }
            });
        });

        var colorPickers = document.querySelectorAll(className + ' .color-picker a');
        colorPickers.forEach(function(colorPicker) {
            colorPicker.addEventListener('click', function() {
                var color = window.getComputedStyle(this).backgroundColor;
                document.execCommand(command, false, color);
                var parentColorPicker = this.closest('.color-picker');
                parentColorPicker.style.display = 'none';
            });
        });
    }

    // Attach events for .b-fontcolor and .b-hilite
    attachColorPickerEvents('.b-fontcolor', 'foreColor');
    attachColorPickerEvents('.b-hilite', 'hiliteColor');

     // Attach event for .file-option to display context-menu-list
     var fileOption = document.querySelector('.file-option');
     var fileContextMenu = document.querySelector('.context-menu-list.word-file-context-menu');
     fileOption.addEventListener('click', function(e) {
         e.stopPropagation();
         toggleDisplay(fileContextMenu);
     });
 
     // Attach event for "Send to" to display mail recipients
     var sendToOption = document.querySelector('.context-menu-item.context-menu-submenu');
     var mailRecipientSubMenu = sendToOption.querySelector('.context-menu-list');
     sendToOption.addEventListener('click', function(e) {
         e.stopPropagation();
         toggleDisplay(mailRecipientSubMenu);
     });
 
     // Hide context menus when clicking outside
     document.addEventListener('click', function(e) {
         if (!fileOption.contains(e.target)) {
             fileContextMenu.style.display = 'none';
         }
         if (!sendToOption.contains(e.target)) {
             mailRecipientSubMenu.style.display = 'none';
         }
     });
 });

 /* ----------------- Puzzle Javascript --------------------- */

// JSON data directly embedded in the script
const puzzles = {
     "story": "Far beyond the reaches of known space, aboard the starship Stellar Horizon, Captain Elara and her intrepid crew ventured into uncharted territory. In the depths of the Nebula Veil, they sought a rare mineral essential for powering their warp drives and sustaining their journey.\n\nRadiation storms and gravitational anomalies threatened their path, testing the crew's resolve and resourcefulness. Every maneuver was calculated, every decision critical as they navigated through the swirling mists of the nebula. With sensors detecting faint signals of the coveted mineral on a nearby asteroid field, hope flickered anew among the crew. As they descended, their ship trembled under the onslaught of asteroid impacts, but their determination remained unyielding. Lasers blazed as they mined the precious ore, racing against time and the looming danger of a supernova on the nebula's edge. Loaded with their bounty, they made a daring escape just as the star behind them erupted in a blinding display of cosmic fury.\n\nTheir mission accomplished, the Stellar Horizon surged into hyperspace, leaving the Nebula Veil behind them. Amidst the stars, Captain Elara and her crew celebrated not just their triumph over peril, but the bonds forged in the crucible of deep space exploration.",
     "password": "firewall"
  };

// Fill in the story
document.getElementById('story').innerText = puzzles.story;

// Function to initialize password placeholder with underscores
function initializePasswordPlaceholder() {
    const passwordPlaceholder = document.getElementById('password-placeholder');
    const passwordLength = puzzles.password.length;
    passwordPlaceholder.innerHTML = '_ '.repeat(passwordLength).trim();
}

// Handle password input on Enter key press
document.addEventListener('DOMContentLoaded', () => {
    initializePasswordPlaceholder();

    let typedPassword = [];
    let textLength = 0; // Initialize textLength

    const passwordPlaceholder = document.getElementById('password-placeholder');
    const passwordLength = puzzles.password.length;

    document.addEventListener('keydown', (event) => {
        // Prevent default behavior of keys when the div is contenteditable
        event.preventDefault();

        // Handle backspace
        if (event.key === 'Backspace' && typedPassword.length > 0) {
            typedPassword.pop();
            textLength = typedPassword.length; // Update textLength after backspace
            updatePasswordPlaceholder(typedPassword);
            placeCaretAtEnd(passwordPlaceholder, textLength); // Place caret after update
            return;
        }

        // Allow typing only if it is a letter and the length of typed characters is less than or equal to password length
        if (event.key.length === 1 && event.key.match(/[a-zA-Z]/i) && typedPassword.length < passwordLength) {
            typedPassword.push(event.key);
            textLength = typedPassword.length; // Update textLength after new character
            updatePasswordPlaceholder(typedPassword);
            placeCaretAtEnd(passwordPlaceholder, textLength); // Place caret after update
        }

        // Handle Enter key for submission
        if (event.key === 'Enter') {
            const enteredPassword = typedPassword.join('').toLowerCase();
            const correctPassword = puzzles.password.toLowerCase();

            if (enteredPassword === correctPassword) {
                alert('Correct password! Access granted.');
            } else {
                alert('Incorrect password. Try again.');
                typedPassword = [];
                textLength = 0;
                initializePasswordPlaceholder();
            }
        }
    });

    function updatePasswordPlaceholder(typedPassword) {
        let displayString = '';
        for (let i = 0; i < passwordLength; i++) {
            if (typedPassword[i]) {
                displayString += typedPassword[i] + ' ';
            } else {
                displayString += '_ ';
            }
        }
        passwordPlaceholder.innerHTML = displayString.trim();
    }

    function placeCaretAtEnd(el, textLength) {
        const range = document.createRange();
        const sel = window.getSelection();
        const lastChild = el.lastChild;
    
        // Calculate maximum allowable offset
        const maxOffset = lastChild.textContent.replace(/\s/g, '').length;
    
        // Ensure textLength does not exceed max offset
        textLength = Math.min(textLength, maxOffset);
    
        // Set caret position dynamically based on text length
        if (lastChild.nodeType === Node.TEXT_NODE && textLength < passwordLength-1) {
            range.setStart(lastChild, textLength * 2); // Multiply by 2 to account for spaces
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        else if (lastChild.nodeType === Node.TEXT_NODE && textLength == passwordLength-1) {
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    

});
