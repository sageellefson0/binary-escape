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
const auth = getAuth(app);
const firestore = getFirestore(app);

let savedChar = localStorage.getItem("character");

export async function initializeUserData(docUID) {
    const userRef = doc(firestore, 'users', docUID);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        // Initialize document with default values
        await setDoc(userRef, {
            completedLevels: {},
            character: savedChar
        });
        console.log('User created');
        localStorage.removeItem("character");
    } else {
        console.log("User already exists.");
    }
}

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
                if (completedLevels.skype) {
                    // Reveal the Internet Explorer icon if Skype level is completed
                    const internetExplorerIcon = document.getElementById('IEIcon');
                    internetExplorerIcon.style.display = 'block';
                }
            }
        });

        // Retrieve and apply the user's character choice
        const character = await getUserCharacter(user.uid);

        // Remove any existing character-specific classes
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


const createAccount = document.getElementById("createAccount");
const signInBtn = document.getElementById("signInBtn");
const signInGoogleBtn = document.getElementById("signInGoogle");
const errorText = document.getElementById("errorText");


document.addEventListener("DOMContentLoaded", (event) => {

    // Native Email/Password Sign-Up
    createAccount.addEventListener('click', async () => {
        const email = document.getElementById('emailInputSignUp').value.trim();
        const password = document.getElementById('passwordInputSignUp').value.trim();

        if (email && password) {
            try {
                // Create a new user with the provided email and password
                await createUserWithEmailAndPassword(auth, email, password);


                // User is signed in, redirect to the desktop level page
                window.location.href = 'levels/desktop/level-desktop.html';

            } catch (error) {
                console.error('Error during sign up or sign in:', error);
                const errorText = document.getElementById("errorText");
                errorText.innerHTML = "Please use a valid email address. Your password must be at least 6 characters in length.";
            }
        } else {
            console.log('Email and password are required');
            errorText.innerHTML = "Please enter an email and password.";
        }
    });


    signInBtn.addEventListener('click', async () => {
        const email = document.getElementById('emailInputSignIn').value.trim();
        const password = document.getElementById('passwordInputSignIn').value.trim();
        const selectedChar = localStorage.getItem("character");


        if (email && password) {
            console.log(selectedChar);
            try {
                await signInWithEmailAndPassword(auth, email, password);
                // Redirect after successful sign in
                const user = auth.currentUser;
                if (user && selectedChar) {
                    await updateCharacter(user.uid, selectedChar);
                    console.log("Chracter has been updated to" + selectedChar)
                }
                window.location.href = 'levels/desktop/level-desktop.html';
            } catch (error) {
                console.error('Error signing in with email:', error);
                errorText.innerHTML = "Incorrect email or password. Please try again. Contact the administrator for support if you have forgotten your password.";
            }
        } else {
            console.log('Email and password are required');
            errorText.innerHTML = "Please enter an email and password.";

        }
    });

    // Google Sign-In
    signInGoogleBtn.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        const selectedChar = localStorage.getItem("character");

        try {
            await signInWithPopup(auth, provider);
            // Redirect after successful sign-in
            const user = auth.currentUser;
            if (user && selectedChar) {
                await updateCharacter(user.uid, selectedChar);
                console.log("Chracter has been updated to" + selectedChar)
            }
            window.location.href = 'levels/desktop/level-desktop.html';
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    });
});

export { auth, firestore, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, onAuthStateChanged };
