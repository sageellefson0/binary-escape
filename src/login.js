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


const createAccount = document.getElementById('createAccount');
const emailInputSignIn = document.getElementById('emailInputSignIn');
const passwordInputSignIn = document.getElementById('passwordInputSignIn');
const emailInputSignUp = document.getElementById('emailInputSignUp');
const passwordInputSignUp = document.getElementById('passwordInputSignUp');
const signInBtn = document.getElementById('signInBtn');
const alreadyHaveAccount = document.getElementById('alreadyHaveAccount');



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
}
// Event listeners to store the character selection
createAccount.addEventListener('click', createAccountFunc)


alreadyHaveAccount.addEventListener('click', haveAccountFunc)
