// Imports from web
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { getFirestore, doc, getDoc, updateDoc, onSnapshot, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHqX0uxfuSvT2fMcW_EzpZ-i-NVDX-_zw",
    authDomain: "binary-escape-4ad92.firebaseapp.com",
    projectId: "binary-escape-4ad92",
    storageBucket: "binary-escape-4ad92.appspot.com",
    messagingSenderId: "695253692594",
    appId: "1:695253692594:web:811c93ca1f512db98e59ab",
    measurementId: "G-ZC947WKZVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Authorize Firebase
const auth = getAuth(app);
const firestore = getFirestore(app);

// Local storage variable for character storage
let savedChar = localStorage.getItem("character");

// Function: Initializes user data within the database
export async function initializeUserData(docUID) {
    const userRef = doc(firestore, 'users', docUID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        // Initialize document with default values
        await setDoc(userRef, {
            // playedIntro: true,
            completedLevels: {},
            character: savedChar
        });
        console.log('User created');
        localStorage.removeItem("character");
    } else {
        console.log("User already exists.");
    }
}

// Function: Retreives the character selected from the database
async function getUserCharacter(docUID) {
    const userRef = doc(firestore, 'users', docUID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data().character;
    } else {
        console.log('No such document!');
        return null;
    }
}

const characterSpritesheet = document.querySelector(".characterSpritesheet");
// Combined onAuthStateChanged
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Initialize user document if not already done
        await initializeUserData(user.uid);

        // Set up a snapshot listener to react to changes in user data
        const userRef = doc(firestore, 'users', user.uid);
        onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                const completedLevels = docSnap.data().completedLevels || {};
                const playedIntro = docSnap.data().playedIntro;

                const desktopDiv = document.getElementById("desktopDiv");
                const characterSpritesheet = document.querySelector(".characterSpritesheet");

                if (playedIntro) {
                    // Show the desktop and background image
                    const leveldesktop =  document.getElementById("level-desktop");
                    leveldesktop.style.backgroundImage = "url('../desktop/images/windowsbackground.jpeg')";
                    desktopDiv.style.display = 'block';

                    // Ensure the character is visible after showing the desktop
                    characterSpritesheet.style.display = 'block';
                } else {
                    // Show intro animation
                    document.getElementById('introDiv').style.display = 'block';
                    desktopDiv.classList.add('fade-in');

                    setTimeout(async () => {
                        await updateDoc(userRef, { playedIntro: true });
                        // Transition to desktop after intro finishes
                        document.getElementById('introDiv').style.display = 'none';
                        desktopDiv.style.display = 'block';

                        // Ensure the character is visible after the transition
                        characterSpritesheet.style.display = 'block';
                    }, 35000); 
                }

                // Reveals icons based on completed levels, completedLevel function is exported to each level and marked complete through that function
                if (completedLevels.youtube) {
                    const instagramIcon = document.getElementById('instagramIcon');
                    instagramIcon.style.display = 'block';
                }
                if (completedLevels.instagram) {
                    const skypeIcon = document.getElementById('skypeIcon');
                    skypeIcon.style.display = 'block';
                }
                if (completedLevels.skype) {
                    const wordIcon = document.getElementById('wordIcon');
                    wordIcon.style.display = 'block';
                }
                if (completedLevels.word) {
                    const IEIcon = document.getElementById('IEIcon');
                    IEIcon.style.display = 'block';
                }
            }
        });

        // Retrieve character for each user
        const character = await getUserCharacter(user.uid);

        // Remove any existing character classes
        characterSpritesheet.classList.remove('female', 'male');

        if (character === 'female') {
            characterSpritesheet.classList.add('female');
        } else if (character === 'male') {
            characterSpritesheet.classList.add('male');
        } else {
            console.log('No character loaded');
        }
    } else {
        // User is not logged in, redirect to login page or home page
        if (window.location.pathname !== '/index.html') {
            window.location.href = '../../index.html'; // Adjust path as necessary
        }
    }
});


// Function: Marks the specified level as complete in the database, this function is exported to each individual level JS file and called there to complete levels
export async function completeLevel(levelName) {
    const user = auth.currentUser;
    if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        try {
            await updateDoc(userRef, {
                [`completedLevels.${levelName}`]: true
            });
            console.log(`Level ${levelName} completed.`);
        } catch (error) {
            console.error('Error updating level completion:', error);
        }
    } else {
        console.log('No user is signed in.');
    }
}

// Function: Updates the character
export async function updateCharacter(docUID, newCharacter) {
    const userRef = doc(firestore, 'users', docUID);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const dbCharacter = userDoc.data().character;

        // Check if the new character is different from the one in the database
        if (dbCharacter !== newCharacter) {
            try {
                await updateDoc(userRef, {
                    character: newCharacter
                });
                console.log('Character updated to:', newCharacter);
            } catch (error) {
                console.error('Error updating character:', error);
            }
        } else {
            console.log('Character is already up-to-date.');
        }
    } else {
        console.log('No such document!');
    }
}

// Exports functions and variable to be accessed in other JS files and levels. 
export { auth, firestore, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, onAuthStateChanged };
