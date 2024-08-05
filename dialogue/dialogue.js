// PLEASE DO NOT EDIT THIS FILE. THIS IS STORAGE FOR THE ORIGINAL UNMODIFIED FUNCTION FOR COPYING. 


var iterationCharacter = 0;
var lineIndexCharacter = 0;
var typingTextCharacter = [
   
];
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


window.onload = function() {
    typeWriterCharacterSpeak();
};