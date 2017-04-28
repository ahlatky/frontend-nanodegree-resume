// Enemies our player must avoid
'use stict';
var Enemy = function(bugX, bugY, bugSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = bugX;
    this.y = bugY;
    this.speed = bugSpeed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    if (this.x < 650) {
        this.x = this.x + (this.speed) * dt;
    } else {
        this.speed = Math.floor((Math.random() * 100) + 100);
        this.x = -100;
    }
};

Enemy.prototype.onCollision = function(player) {
    player.reset();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(playerX, playerY) {
    this.x = playerX;
    this.y = playerY;
    this.playerPosition = [];
    this.reset();
    this.sprite = 'images/char-horn-girl.png';
};

//upadates players position
Player.prototype.update = function(dt) {
    this.checkCollisions(dt);
};

//moves player to initial position at the start of each new turn
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

//draws player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //displays winGame function upon reaching river; resets player after setTimeout
    var self = this;
    if (this.y < 50) {
        this.winGame();
        window.setTimeout(function() {
            self.reset();
        }, 1000);
    }
};

//sets player with enemy collisions
Player.prototype.checkCollisions = function(dt) {
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
        if (Math.abs(this.x - allEnemies[i].x) <= 40 && Math.abs(this.y - allEnemies[i].y) <= 40) {
            allEnemies[i].onCollision(this);
        };
    };
};

//creates display when player wins by reaching river
Player.prototype.winGame = function() {
    ctx.font = "60pt Impact";
    ctx.fillStyle = "green";
    ctx.fillText("YOU WIN!", 100, 300);
};


//Enables the player to be moved around the canvas
Player.prototype.handleInput = function(movement) {
    if (movement === "left") {

        this.playerPosition.push([this.x, this.y]);
        this.x -= 100;
    }
    if (movement === 'right') {
        this.playerPosition.push([this.x, this.y]);
        this.x += 100;
    }
    if (movement === "up") {
        this.playerPosition.push([this.x, this.y]);
        this.y -= 83;
    }
    if (movement === "down") {
        this.playerPosition.push([this.x, this.y]);
        this.y += 83;
    }

    //sets gameboard boundaries; conditional statements that keep player on board
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y <= 0) {
        this.y = 0;
    }
};


//Instantiates objects (player and enemies)
var bug1 = new Enemy(400, 50, 10);
var bug2 = new Enemy(200, 125, 70);
var bug3 = new Enemy(100, 225, 40);
// Placse all enemy objects in an array called allEnemies
var allEnemies = [bug1, bug2, bug3];
// Places the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});