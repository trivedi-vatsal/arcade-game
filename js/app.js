// Enemies our player must avoid
let Enemy = function(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.s = s;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    this.x += this.s * dt;

    // reset position of enemy
    if (this.x > 600) {
        this.x = -86;
        this.s = 100 + Math.floor(Math.random() * 500);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
let Player = function(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.s + 50;
            break;
        case 'up':
            this.y -= this.s + 30;
            break;
        case 'right':
            this.x += this.s + 50;
            break;
        case 'down':
            this.y += this.s + 30;
            break;
    }
};

// Instantiate your objects.
// Place all enemy objects in an array
// Place the player object in a variable
let allEnemies = [];

// Position "y" where the enemies will are created
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});