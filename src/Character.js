var character = document.querySelector(".character");

var x = 90;
var y = 34;
var held_directions = []; // Array for directions of character
var speed = .5; // Speed in pixels of character

// Places the character on the screen
const placeCharacter = () => {

   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );

   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) { x += speed; }
      if (held_direction === directions.left) { x -= speed; }
      if (held_direction === directions.down) { y += speed; }
      if (held_direction === directions.up) { y -= speed; }
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");

   // Walls around character
   var leftLimit = -8;
   var rightLimit = (16 * 15) + 8;
   var topLimit = -8 + 10;
   var bottomLimit = (16 * 7);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }


   character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
}


// Game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step();



/* Direction key state - shorthand for future use */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});


