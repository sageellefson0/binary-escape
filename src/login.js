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

