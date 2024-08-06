import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { getFirestore, doc, updateDoc} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

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



// Sign up buttons 
const signUpEmailBtn = document.getElementById("signUpEmail");
const signInGoogleBtn = document.getElementById("signInGoogle");



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




// Check if user is already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
      // User is signed in, redirect to desktop level
      window.location.href = 'levels/desktop/level-desktop.html';
  }
});


// Log-Out Button
const logoutButton = document.getElementById('logoutButton');

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // User is not logged in, redirect to login page or home page
    window.location.href = '../../index.html'; // Adjust path as necessary
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = '../../index.html';
      } catch (error) {
    console.error('Error signing out:', error);
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

