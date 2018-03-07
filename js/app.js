
/*==========================================================================*/
/*=============================General Functions============================*/

// function to generate a random variable in a range
function randomRange(min, max) {
  return Math.round(Math.random()*(max-min)+min);
}

/*==========================================================================*/
/*=============================Enemy========================================*/

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;

  this.width = 80;
  this.height = 67;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  dt = 20;
  if (this.x >= 500) {

    // create a time lag before bugs move back on the screen
    this.x = -randomRange(200,800);

    // randomize bug speed for each turn
    this.speed = randomRange(2,6);

  }
  this.x += this.speed;

  if (this.x < player.x + player.width &&
    this.x + this.width > player.x &&
    this.y < player.y + player.height &&
    this.height + this.y > player.y) {
      console.log("Failed");
      player.resetPosition();

    }

  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.

  var enemy1 = new Enemy(-500, 230, 1);
  var enemy2 = new Enemy(-300, 145, 2);
  var enemy3 = new Enemy(-200, 60, 4);

  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  var allEnemies = [enemy1, enemy2, enemy3];

  /*==========================================================================*/
  /*=============================General Functions============================*/

  // Place the player object in a variable called player
  // Place the player object in a variable called player
  var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

    this.width = 50;
    this.height = 50;
  };

  // Uses keystrokes to determine which way the player
  // should move.
  Player.prototype.handleInput = function(key) {
    switch (key) {
      case 'left':
      this.x = this.x - 100;
      break;
      case 'up':
      this.y = this.y - 80;
      break;
      case 'right':
      this.x = this.x + 100;
      break;
      case 'down':
      this.y = this.y + 80;
      break;
    }
  }

  // Update the player's position, required method for game
  Player.prototype.update = function() {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > 400) {
      this.x = 400;
    } else if (this.y === 0) {
      console.log("You win");
      // to restart the game
      this.resetPosition();
    } else if (this.y < 0) {
      this.y = 0;
    } else if (this.y > 400) {
      this.y = 400;
    }
  };

  // Draw the player on the screen, required method for game
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;
  };

  var player = new Player(200, 400);

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
