
const howToPlayWindow = document.querySelector('.howToPlayWindow');
const closeHowToPlay = document.querySelector('.close');
const notepadIcon = document.querySelector('.notepadIcon');
const levelBody = document.querySelector('.level-desktop');
const howToPlayIcon = document.getElementById("howToPlayIcon");
const desktopDiv = document.getElementById("desktopDiv");
const introTextBox = document.getElementById("introTextBox");




// Closes the decoder div by setting display to none.
function closeHowToPlayWindow() {
    howToPlayWindow.style.display = "none";
}


closeHowToPlay.addEventListener('click', closeHowToPlayWindow);



// Closes the decoder div by setting display to none.
function openHowToPlayWindow() {
    howToPlayWindow.style.display = "block";
}


howToPlayIcon.addEventListener('click', openHowToPlayWindow);


// Function: Hides the into page and displays the desktop
function hideIntroDisplayDesktop() {
    introDiv.classList.add('fade-out');
    desktopDiv.classList.add('fade-in');
    desktopDiv.style.display = "block";
    setTimeout(() => {
        introDiv.style.display = "none";
    }, 2000); 
}


function displayBSOD(){
    introDiv.style.backgroundImage = "url('../desktop/images/BSOD.png')";
    setTimeout(() => {
        introDiv.style.backgroundImage = 'none';
    }, 3000);

}




// Calls the dialogue to begin showing when the page loads
window.onload = function () {
    introTextTyping();
    setTimeout(() => {
        displayBSOD()
        }, 23500);
    
        setTimeout(() => {
            hideIntroDisplayDesktop()
            }, 35000);
        };

// Dialogue for intro window after starting the game
var introInteger = 0;
var lineIndexIntro = 0;
var typingTextIntro = [
    '[click, squeek, swoosh, thump thump thump thump]',
    'I can\'t believe the boss is making me stay late!',
    'Just to go through this dusty old closet... of course they leave it to the intern...',
    'Alright let\s check out this USB drive...',
    '[click clack click clack, beep]',
    '  ',
    'Ugh, blue screen from a USB? Let\'s try that again.',
    'Wait, what\'s happening?! Ahhhhhhhhhhhhh!'


];
var textSpeedIntro = 80; // Text speed
var pauseTimeIntro = 1000; // Pause time between lines

// Function: Displays the diaglogue box and begins running through the text lines in the typing text variable
function introTextTyping(callback) {
    if (lineIndexIntro < typingTextIntro.length) {
        if (introInteger < typingTextIntro[lineIndexIntro].length) {
            document.getElementById("introTextBox").innerHTML += typingTextIntro[lineIndexIntro].charAt(introInteger);
            introInteger++;
            setTimeout(() => introTextTyping(callback), textSpeedIntro);
        } else {
            introInteger = 0;
            lineIndexIntro++;
            setTimeout(() => {
                document.getElementById("introTextBox").innerHTML = '';
                if (lineIndexIntro < typingTextIntro.length) {
                    setTimeout(() => introTextTyping(callback), textSpeedIntro); // Start typing the next line
                } else if (callback) {
                    callback(); // Call the callback function after the last line
                }
            }, pauseTimeIntro); 
            // Pause before clearing the line
        }
    }

}

let time = document.querySelector(".time");

function updateTime() {
    const now = new Date();
    time.innerHTML = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true }).format(now);
    time.setAttribute("title", new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true, year: 'numeric', month: 'long', day: 'numeric' }).format(now));
}

// Update the time immediately
updateTime();

// Calculate the time remaining until the next full minute
const now = new Date();
const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

// Set a timeout to run the first update at the next full minute
setTimeout(() => {
    // Update the time at the next full minute
    updateTime();
    
    // Then set an interval to update the time every minute
    setInterval(updateTime, 60000);
}, msUntilNextMinute);




////////////////////////// FOR OTHER LEVEL TESTING HERE 

// const submitNicknameBtn = document.getElementById("submitNickname");

// submitNicknameBtn.addEventListener('click', () => {
//     const nickname = document.getElementById('nicknameInput').value;
//     console.log('Nickname:', nickname); 
//     addUserNickname(nickname);
// });

// // Function to add a user's nickname to the Firestore collection
// const addUserNickname = async (nickname) => {
//     try {
//         const docRef = await firestore.collection('userNicknames').add({ nickname });
//         console.log('Document written with ID: ', docRef.id);
//     } catch (e) {
//         console.error('Error adding document: ', e);
//     }
// };

// // Updates the inventory table in Firebase
// const updateUsers = async () => {
//     const snapshot = firestore.collection('userID').get();
//     const docs = await snapshot;
//     const userList = [];
//     docs.forEach((doc) => {
//         const data = doc.data();
//         userList.push({ id: doc.id, ...data });
//     });
//     console.log(userList);
//     // setInventory(userList); // Assuming setInventory is defined elsewhere
// };

// // Adds an item to Firebase table
// const addItem = async (itemName, itemType, quantity) => {
//     const capitalizedItemName = capitalizeFirstLetter(itemName);
//     const docRef = firestore.collection("userID").doc(capitalizedItemName);
//     const docSnap = await docRef.get();
//     if (docSnap.exists) {
//         const { count } = docSnap.data();
//         await docRef.set({ count: count + quantity, type: itemType });
//     } else {
//         await docRef.set({ count: quantity, type: itemType });
//     }
//     await updateUsers();
// };

// // Removes an item from Firebase table
// const removeItem = async (itemName) => {
//     const docRef = firestore.collection("userID").doc(itemName);
//     const docSnap = await docRef.get();
//     if (docSnap.exists) {
//         const { count } = docSnap.data();
//         if (count === 1) {
//             await docRef.delete();
//         } else {
//             await docRef.set({ count: count - 1, type: docSnap.data().type });
//         }
//     }
//     await updateUsers();
// };
