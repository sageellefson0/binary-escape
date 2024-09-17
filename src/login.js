import { auth, firestore, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateCharacter } from '/src/firebase.js';


let selectedCharacter = null;


export function setFemale(){
     selectedCharacter = 'female'; // Store character choice
     localStorage.setItem("character", selectedCharacter);
    console.log( selectedCharacter + ' character selected.');
  }
export function setMale(){
    selectedCharacter = 'male'; // Store character choice
    localStorage.setItem("character", selectedCharacter);
    console.log( selectedCharacter + ' character selected.');
  }

// for create account button 



const signInGoogleBtn = document.getElementById("signInGoogle");



const createAccount = document.getElementById('createAccount');
const emailInputSignIn = document.getElementById('emailInputSignIn');
const passwordInputSignIn = document.getElementById('passwordInputSignIn');
const emailInputSignUp = document.getElementById('emailInputSignUp');
const passwordInputSignUp = document.getElementById('passwordInputSignUp');
const signInBtn = document.getElementById('signInBtn');
const alreadyHaveAccount = document.getElementById('alreadyHaveAccount');
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


function createAccountFunc(){
  emailInputSignIn.style.display = "none";
  passwordInputSignIn.style.display = "none";
  signInBtn.style.display = "none";

  emailInputSignUp.style.display = "inline";
  passwordInputSignUp.style.display = "inline";
  alreadyHaveAccount.style.display = "inline";


}

function haveAccountFunc(){
  emailInputSignIn.style.display = "inline";
  passwordInputSignIn.style.display = "inline";
  signInBtn.style.display = "inline";

  emailInputSignUp.style.display = "none";
  passwordInputSignUp.style.display = "none";
  alreadyHaveAccount.style.display = "none";

  errorText.innerHTML = "";
  passwordInputSignIn.value = "";
  emailInputSignIn.value = "";
  passwordInputSignUp.value = "";
  emailInputSignUp.value = "";



}
// Event listeners to store the character selection
createAccount.addEventListener('click', createAccountFunc)


alreadyHaveAccount.addEventListener('click', haveAccountFunc)
