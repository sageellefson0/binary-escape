/* ----------------- Word Application Javascript --------------------- */

document.addEventListener("DOMContentLoaded", function () {
  // Helper function to toggle visibility
  function toggleDisplay(element) {
    if (element.style.display === "none" || element.style.display === "") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  // Function to attach event listeners for color pickers
  function attachColorPickerEvents(className, command) {
    var elements = document.querySelectorAll(className);
    elements.forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.stopPropagation();
        var colorPicker = element.querySelector(".color-picker");
        toggleDisplay(colorPicker);
      });
    });

    document.addEventListener("click", function (e) {
      elements.forEach(function (element) {
        var colorPicker = element.querySelector(".color-picker");
        if (!element.contains(e.target)) {
          colorPicker.style.display = "none";
        }
      });
    });

    var colorPickers = document.querySelectorAll(
      className + " .color-picker a"
    );
    colorPickers.forEach(function (colorPicker) {
      colorPicker.addEventListener("click", function () {
        var color = window.getComputedStyle(this).backgroundColor;
        document.execCommand(command, false, color);
        var parentColorPicker = this.closest(".color-picker");
        parentColorPicker.style.display = "none";
      });
    });
  }

  // Attach events for .b-fontcolor and .b-hilite
  attachColorPickerEvents(".b-fontcolor", "foreColor");
  attachColorPickerEvents(".b-hilite", "hiliteColor");

  // Attach event for .file-option to display context-menu-list
  var fileOption = document.querySelector(".file-option");
  var fileContextMenu = document.querySelector(
    ".context-menu-list.word-file-context-menu"
  );
  fileOption.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDisplay(fileContextMenu);
  });

  // Attach event for "Send to" to display mail recipients
  var sendToOption = document.querySelector(
    ".context-menu-item.context-menu-submenu"
  );
  var mailRecipientSubMenu = sendToOption.querySelector(".context-menu-list");
  sendToOption.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDisplay(mailRecipientSubMenu);
  });

  // Hide context menus when clicking outside
  document.addEventListener("click", function (e) {
    if (!fileOption.contains(e.target)) {
      fileContextMenu.style.display = "none";
    }
    if (!sendToOption.contains(e.target)) {
      mailRecipientSubMenu.style.display = "none";
    }
  });
});

/* ----------------- Puzzle Javascript --------------------- */

// JSON data directly embedded in the script
const puzzles = [
  {
    story:
      "Daisy loved baking, especially during the lazy summer afternoons when the kitchen filled with the sweet aroma of freshly baked treats. Every weekend, she invited her friends over for baking sessions filled with laughter and delicious experiments.\n\nBrownies, cookies, and pies were their favorites, each recipe a delightful adventure. Under the warm sun streaming through the windows, they mixed ingredients with carefree enthusiasm, creating culinary masterpieces.\n\nGiggling as flour flew and chocolate melted, they decorated cupcakes with colorful frosting and sprinkles. Gathering around the table, they savored their creations, their smiles as bright as the summer sky.\n\nEvenings were spent sharing stories and planning their next baking escapade. Recipes exchanged, memories made, their summer was filled with the joy of friendship and the sweetness of homemade treats.",
    password: "debugger",
  },
  {
    story:
      "Heather and her friends decided to spend their summer break at the beach. Yesterday, they packed all their essentials: sunscreen, beach towels, and a cooler full of snacks.\n\nPlaying volleyball in the sand was their first activity, and everyone joined in with enthusiasm. Everyone laughed as they dove for the ball, the sun shining brightly overhead.\n\nRelaxing under a large umbrella, they shared stories and planned their next adventure. Soon, they ventured into the waves, surfing and splashing around in the refreshing water.\n\nPopsicles from a nearby stand were the perfect treat to cool down in the afternoon heat. As the day came to an end, they built a bonfire and roasted marshmallows, the sky painted with the colors of sunset.\n\nConversations and laughter echoed under the starlit sky, creating memories they would cherish forever. Every summer day seemed more magical than the last, filled with fun and friendship.",
    password: "hyperspace",
  },
  {
    story:
      "Caroline was known as the best puzzle solver in her town. One summer afternoon, she received a mysterious letter with a complex code inside. Determined to crack it, she gathered her tools and set up a workspace in her room.\n\nEvery symbol and pattern intrigued her, and she spent hours deciphering the message. By midnight, Caroline finally unraveled the code, revealing the coordinates to an old, abandoned lighthouse on the coast.\n\nRallying her closest friends, they set off the next morning, eager to uncover the secret behind the message. Exploring the lighthouse, they discovered hidden passages and ancient maps detailing forgotten treasures.\n\nAt the top of the lighthouse, they found a chest filled with gold coins and historical artifacts. Knowing they had made an incredible discovery, they promised to share their adventure with the world, turning their summer into an unforgettable journey.",
    password: "codebreak",
  },
  {
    story:
      "Fred and his friends decided to go on a weekend camping trip in the mountains. In the midst of setting up their tents, they discovered a hidden trail that led deeper into the forest.\n\nReady for an adventure, they followed the path until they stumbled upon an abandoned cabin. Excitement filled the air as they explored the old structure, finding dusty books and ancient relics.\n\nWith the sun setting, they decided to start a campfire and share spooky stories. As the flames danced and crackled, they felt a sense of camaraderie and thrill.\n\nLater that night, Fred found an old map hidden in one of the books, hinting at buried treasure nearby. Led by curiosity, they vowed to return the next day and continue their unexpected adventure.",
    password: "firewall",
  },
  {
    story:
      "Olivia and her friends decided to spend the weekend at an escape room challenge. Venturing into the game, they found themselves in a room filled with mysterious gadgets and cryptic messages.\n\nEach clue they solved brought them closer to unlocking the final door. Racing against the clock, their teamwork and problem-solving skills were put to the test.\n\nRiddles became more complex, but they tackled each one with determination and creativity. In the final minutes, they discovered a hidden compartment revealing the last key.\n\nDashing to the exit, they unlocked the door just in time, cheering as they emerged victorious. Excitement filled the air as they celebrated their triumph, already planning their next adventure.",
    password: "override",
  },
];

// Randomly choose a number between 0 and 4
const randomIndex = Math.floor(Math.random() * puzzles.length);
const selectedPuzzle = puzzles[randomIndex];


// Fill in the story
document.getElementById("story").innerText = selectedPuzzle.story;

// Function to initialize password placeholder with underscores
function initializePasswordPlaceholder() {
  const passwordPlaceholder = document.getElementById("password-placeholder");
  const passwordLength = selectedPuzzle.password.length;
  passwordPlaceholder.innerHTML = "_ ".repeat(passwordLength).trim();
}

// Handle password input on Enter key press
document.addEventListener("DOMContentLoaded", () => {
  initializePasswordPlaceholder();

  let typedPassword = [];
  let textLength = 0; // Initialize textLength

  const passwordPlaceholder = document.getElementById("password-placeholder");
  const passwordLength = selectedPuzzle.password.length;

  document.addEventListener("keydown", (event) => {
    // Prevent default behavior of keys when the div is contenteditable
    event.preventDefault();

    // Handle backspace
    if (event.key === "Backspace" && typedPassword.length > 0) {
      typedPassword.pop();
      textLength = typedPassword.length; // Update textLength after backspace
      updatePasswordPlaceholder(typedPassword);
      placeCaretAtEnd(passwordPlaceholder, textLength); // Place caret after update
      return;
    }

    // Allow typing only if it is a letter and the length of typed characters is less than or equal to password length
    if (
      event.key.length === 1 &&
      event.key.match(/[a-zA-Z]/i) &&
      typedPassword.length < passwordLength
    ) {
      typedPassword.push(event.key);
      textLength = typedPassword.length; // Update textLength after new character
      updatePasswordPlaceholder(typedPassword);
      placeCaretAtEnd(passwordPlaceholder, textLength); // Place caret after update
    }

    // Handle Enter key for submission
    if (event.key === "Enter") {
      const enteredPassword = typedPassword.join("").toLowerCase();
      const correctPassword = selectedPuzzle.password.toLowerCase();

      if (enteredPassword === correctPassword) {
        alert("Correct password! Access granted.");
      } else {
        alert("Incorrect password. Try again.");
        typedPassword = [];
        textLength = 0;
        initializePasswordPlaceholder();
      }
    }
  });

  function updatePasswordPlaceholder(typedPassword) {
    let displayString = "";
    for (let i = 0; i < passwordLength; i++) {
      if (typedPassword[i]) {
        displayString += typedPassword[i] + " ";
      } else {
        displayString += "_ ";
      }
    }
    passwordPlaceholder.innerHTML = displayString.trim();
  }

  function placeCaretAtEnd(el, textLength) {
    const range = document.createRange();
    const sel = window.getSelection();
    const lastChild = el.lastChild;

    // Calculate maximum allowable offset
    const maxOffset = lastChild.textContent.replace(/\s/g, "").length;

    // Ensure textLength does not exceed max offset
    textLength = Math.min(textLength, maxOffset);

    // Set caret position dynamically based on text length
    if (
      lastChild.nodeType === Node.TEXT_NODE &&
      textLength < passwordLength - 1
    ) {
      range.setStart(lastChild, textLength * 2); // Multiply by 2 to account for spaces
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (
      lastChild.nodeType === Node.TEXT_NODE &&
      textLength == passwordLength - 1
    ) {
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
});

/* ----------------- Sprite Character Javascript --------------------- */

// const characterImg = document.getElementById("character-img");
//         const imageSources = [
//             "images/character/malecharacter1.png",
//             "images/character/malecharacter2.png"
//         ];

//         let currentImageIndex = 0;

//         const switchImage = () => {
//             currentImageIndex = (currentImageIndex + 1) % imageSources.length;
//             characterImg.src = imageSources[currentImageIndex];
//         };

//         // Set an interval to switch images every 500 milliseconds
//         setInterval(switchImage, 500);


/* ----------------- Clippy Javascript --------------------- */


document.addEventListener("DOMContentLoaded", function() {
  const initialText = "Find the hidden message to move on to the next round!";
  const hintText = "Click me for a hint!";
  const clickText = "First impressions can be more revealing than you think!";
  const hintElement = document.getElementById("hint");
  let index = 0;
  let currentText = initialText;

  function typeText(text) {
      hintElement.innerHTML = ''; // Clear the existing text
      index = 0;
      currentText = text;
      typeNextCharacter();
  }

  function typeNextCharacter() {
      if (index < currentText.length) {
          hintElement.innerHTML += currentText.charAt(index);
          index++;
          setTimeout(typeNextCharacter, 50); // Adjust the delay as needed
      }
  }

  typeText(initialText);

  // Show "Click me for a hint!" after 2.5 minutes
  setTimeout(function() {
      typeText(hintText);
  }, 150000); // 2.5 minutes = 150000 milliseconds

 // Click event handler
 function handleClick() {
  typeText(clickText);
  // Remove click event listener after first click
  document.getElementById('clippy-agent').removeEventListener('click', handleClick);
}

// Add click event listener
document.getElementById('clippy-agent').addEventListener('click', handleClick);

});