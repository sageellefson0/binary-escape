import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

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

const signUpEmailBtn = document.getElementById("signUpEmail");
const signInGoogleBtn = document.getElementById("signInGoogle");

// Check if user is already signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to desktop level
        window.location.href = 'levels/desktop/level-desktop.html';
    }
});

// Native Email/Password Sign-Up
signUpEmailBtn.addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if (email && password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Redirect after successful sign-up
            window.location.href = 'levels/desktop/level-desktop.html';
        } catch (error) {
            console.error('Error signing up with email:', error);
        }
    } else {
        console.log('Email and password are required');
    }
});

// Google Sign-In
signInGoogleBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        // Redirect after successful sign-in
        window.location.href = 'levels/desktop/level-desktop.html';
    } catch (error) {
        console.error('Error during Google sign-in:', error);
    }
});