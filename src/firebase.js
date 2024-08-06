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


onAuthStateChanged(auth, (user) => {
  if (user) {
      // User is signed in, redirect to desktop level
          window.location.href = 'levels/desktop/level-desktop.html';
      
      // Listen for changes in the user's document
      const userRef = doc(firestore, 'users', user.uid);
      onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
              const completedLevels = doc.data().completedLevels || {};
              if (completedLevels.skype) {
                  // Reveal the Internet Explorer icon if Skype level is completed
                  document.getElementById('internetExplorerIcon').style.display = 'block';
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
