## How to set up character dialogue

### 1. Add this code to your JS file. View the comments for adjustments that can be made.

''' 
var iterationCharacter = 0;
var lineIndexCharacter = 0;
var typingTextCharacter = [
// Change lines here for single typed out dialogue lines
    'A Wikipedia page? Something isn\'t right here...',
    'I wonder why it\'s all jumbled?',
   
];
// Change the speed and pause time if desired
var textSpeedChar = 80; 
var pauseTimeChar = 2000; 

function typeWriterCharacterSpeak(callbackchar) {
    const dialogueBox = document.getElementById("dialogueBox");
    
    if (lineIndexCharacter < typingTextCharacter.length) {
        dialogueBox.style.display = "block";

        if (iterationCharacter < typingTextCharacter[lineIndexCharacter].length) {
            document.getElementById("characterSpeech").innerHTML += typingTextCharacter[lineIndexCharacter].charAt(iterationCharacter);
            iterationCharacter++;
            setTimeout(() => typeWriterCharacterSpeak(callbackchar), textSpeedChar);
        } else {
            iterationCharacter = 0;
            lineIndexCharacter++;
            setTimeout(() => {
                document.getElementById("characterSpeech").innerHTML = ''; 
                if (lineIndexCharacter < typingTextCharacter.length) {
                    setTimeout(() => typeWriterCharacterSpeak(callbackchar), textSpeedChar); // Start typing the next line
                } else {
                    // Hide the dialogue box
                    dialogueBox.style.display = "none";
                    
                    // Call the callbackchar function after hiding the dialogue box
                    if (callbackchar) {
                        callbackchar(); 
                    }
                }
            }, pauseTimeChar); // Pause before clearing the line
        }

    }
}

// This makes it so the dialogue starts as soon as the page loads
window.onload = function() {
    typeWriterCharacterSpeak();
};

'''

### 2. Add this stylesheet link in your <head> tag.

''' 
    <link rel="stylesheet" href="../../style.css">
''' 

### 3. Add this HTML to your HTML file. 

'''
 <div id="dialogueBox">
            <p id="characterSpeech"></p>
        </div> 
'''
