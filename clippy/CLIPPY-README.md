## Clippy How-To Guide

### HTML

To add clippy to your webpage, add the following lines to your level's html:

```
<!-- In body tag -->
<body>
    <div id="clippy-agent" class="agent">
        <div id="hint" class="speech-bubble"></div>
        <div id="clippy-bm" class="clippy"></div>
    </div>
</body>

<!-- Below body in scripts -->
<script src="../../clippy/lottie.js"></script>
<script src="../../clippy/index.js"></script>
```

### JavaScript

Then, add the following lines to your level-specific javascript. This code is based on my level's puzzle, so replace 
the speech bubble text and the hint timer as needed:

```
document.addEventListener("DOMContentLoaded", function() {

  /* Change the strings below based on your level's initial message and hint */

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
          setTimeout(typeNextCharacter, 50);
      }
  }

  typeText(initialText);
  

  /* Adjust the time below based on when you want the hint to show */

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
```

### CSS Styling

Lastly, to keep formatting consistent, please refer to how I formatted my clippy in css:

```
.agent {
    display: flex;
    position: absolute;
    bottom: 20.5rem; // Change positioning of clippy
    right: 24rem; // Can change bottom and right to top and left, etc. 
}

.clippy {
    position: fixed;
    width: 450px; // Can change width size accordingly
    height: 350px; // Can change height size 
}

p #hint {
    padding: 0;
    margin: 0;
}

.speech-bubble {
	position: absolute;
    bottom: -30px;
    left: 90px;
    font-size: 16px;

	background: #eee9ad;
	border-radius: .4em;
    border: 1px solid black;
    width: 12rem;
    padding: 10px;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	bottom: 1px;
	left: 50%;
	width: 0;
	height: 0;
	border: 33px solid transparent;
	border-top-color: #eee9ad;
	border-right: 0;
	border-bottom: 0;
	margin-left: -16.5px;
	margin-bottom: -33px;
}

.speech-bubble:before {
	content: '';
	position: absolute;
	bottom: 0.25px;
	left: 50%;
	width: 0;
	height: 0;
	border: 33px solid transparent;
	border-top-color: black;
	border-right: 0;
	border-bottom: 0;
	margin-left: -16px;
	margin-bottom: -34.5px;
}
```

Thanks for using my clippy animation!