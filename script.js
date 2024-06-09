document.addEventListener('DOMContentLoaded', () => {
    var character1 = document.getElementById("character1");

    //start in the middle of the screen
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    var held_directions = []; //State of which arrow keys we are holding down
    var speed = 5; //How fast the character moves in pixels per frame

    const placeCharacter = () => {
        const held_direction = held_directions[0];
        if (held_direction) {
            if (held_direction === directions.right) { x += speed; }
            if (held_direction === directions.left) { x -= speed; }
            if (held_direction === directions.down) { y += speed; }
            if (held_direction === directions.up) { y -= speed; }
            character1.setAttribute("facing", held_direction);
        }
        character1.setAttribute("walking", held_direction ? "true" : "false");

        // Limits to keep the character within the viewport
        var leftLimit = 0;
        var rightLimit = window.innerWidth - character1.offsetWidth;
        var topLimit = 0;
        var bottomLimit = window.innerHeight - character1.offsetHeight;

        if (x < leftLimit) { x = leftLimit; }
        if (x > rightLimit) { x = rightLimit; }
        if (y < topLimit) { y = topLimit; }
        if (y > bottomLimit) { y = bottomLimit; }

        character1.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    const step = () => {
        placeCharacter();
        window.requestAnimationFrame(step);
    }
    step();

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
            held_directions.unshift(dir);
        }
    })

    document.addEventListener("keyup", (e) => {
        var dir = keys[e.which];
        var index = held_directions.indexOf(dir);
        if (index > -1) {
            held_directions.splice(index, 1);
        }
    });
});
