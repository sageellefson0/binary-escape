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


async function initializeUserData(docUID) {
  const userRef = doc(firestore, 'users', docUID);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
      // Initialize document with default values
      await setDoc(userRef, {
          completedLevels: {},
          character: selectedCharacter// Initialize with an empty map
      });
  }
}


// On Auth State Changed
onAuthStateChanged(auth, async (user) => {
  if (user) {
      // Initialize user document if not already done
      await initializeUserData(user.uid, selectedCharacter);

      const userRef = doc(firestore, 'users', user.uid);
      onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
              const data = docSnap.data();
              const completedLevels = data.completedLevels || {};
              
              if (completedLevels.skype) {
                  // Reveal the Internet Explorer icon if Skype level is completed
                  const internetExplorerIcon = document.getElementById('IEIcon');
                  internetExplorerIcon.style.display = 'block';
              }

              // Set character based on saved data
              const savedCharacter = data.character;
              if (savedCharacter === 'female') {
                  characterSpritesheet.style.background = 'url("images/binaryescapefemalecharacter1.png") no-repeat no-repeat';
              } else if (savedCharacter === 'male') {
                  characterSpritesheet.style.background = 'url("images/binaryescapemalecharacter1.png") no-repeat no-repeat';
              }
              characterSpritesheet.style.backgroundSize = '100%';
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
