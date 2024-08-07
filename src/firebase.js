import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
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
let selectedCharacter = null;
const femChar = document.getElementById('femChar');
const maleChar = document.getElementById('maleChar');
const characterSpritesheet = document.querySelector('.characterSpritesheet');


// Event listeners to store the character selection
femChar.addEventListener('click', () => {
  // characterSpritesheet.style.background = 'url("images/binaryescapefemalecharacter1.png") no-repeat no-repeat';
  selectedCharacter = 'female'; // Store character choice
  console.log('Female character selected.');
});

maleChar.addEventListener('click', () => {
  // characterSpritesheet.style.background = 'url("images/binaryescapemalecharacter1.png") no-repeat no-repeat';
  selectedCharacter = 'male'; // Store character choice
  console.log('Male character selected.');
});


async function initializeUserData(docUID) {
  const userRef = doc(firestore, 'users', docUID);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
      // Initialize document with default values
      await setDoc(userRef, {
          completedLevels: {},
          character: selectedCharacter
      });
  }
}


onAuthStateChanged(auth, async (user) => {
  if (user) {
      // Initialize user document if not already done

      await initializeUserData(user.uid);

      const userRef = doc(firestore, 'users', user.uid);
      onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            ///////////////////////TODO: ADD MORE LEVEL COMPLETIONS HERE 
              const completedLevels = docSnap.data().completedLevels || {};
              if (completedLevels.skype) {
                  // Reveal the Internet Explorer icon if Skype level is completed
                  const internetExplorerIcon = document.getElementById('IEIcon');
                  internetExplorerIcon.style.display = 'block';
              }
          }
      });
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

export { auth, firestore, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut };
