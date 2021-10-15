var gameState = 0; // 0 = menu, 1 = game, 2 = win, 3 = loss
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 900;
var playerImage;
var alienImage;
var bullets = [];

class StartMenu {
  constructor() { }
  draw() {
    background(0);
    textSize(14);
    fill("white");
    textAlign(CENTER);
    text("Use arrow keys to move, space bar to shoot.", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
  keyPressed() {
    switch (keyCode) {
      case 32:
        Game_Screen.startGame();
    }
  }
  keyReleased() {

  }
}

class WinScreen {
  constructor() {}
  draw(){
    background(0);
    textSize(14);
    fill("white");
    textAlign(CENTER);
    text("You win!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
  win(){
    gameState = 2
  }
}

class LoseScreen {
  constructor() {}
  draw(){
    background(0);
    textSize(14);
    fill("white");
    textAlign(CENTER);
    text("You lose :(", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
}


class Player {
  constructor() {
    this.xpos = CANVAS_WIDTH / 2;
    this.ypos = CANVAS_HEIGHT - 75;
    this.width = 50;
    this.height = 30;
    this.xspeed = 0;
  }
  draw() {
    if (this.xspeed < 0 && this.xpos > -this.xspeed) {
      this.xpos = this.xpos + this.xspeed;
    }
    else if (this.xspeed > 0 && this.xpos < CANVAS_WIDTH - this.width) {
      this.xpos = this.xpos + this.xspeed;
    }
    copy(playerImage, 0, 0, 415, 257, this.xpos, this.ypos, this.width, this.height);
  }
  shoot() {
    bullets.push(new Bullet(this.xpos, this.ypos));

  }
  keyPressed() {
    switch (keyCode) {
      case 32:
        this.shoot();
        break;
      case 37:
        this.xspeed = -4;
        break;
      case 39:
        this.xspeed = 4;
        break;
    }
  }
  keyReleased() {
    switch (keyCode) {
      case 37:
        this.xspeed = 0;
        break;
      case 39:
        this.xspeed = 0;
        break;
    }
  }
}

class Invader {
  static width = 30;
  static height = 30;
  static delay = 1;
  static delay_counter = 1;
  static xspeed = 4;
  static yspeed = 0;
  constructor(type, xpos, ypos) {
    this.type = type;
    this.xpos = xpos;
    this.ypos = ypos;
  }
  draw() {
    if (Invader.delay_counter == 0) {
      this.xpos = this.xpos + Invader.xspeed;
      this.ypos = this.ypos + Invader.yspeed;

    }
    copy(alienImage, 0, 0, 259, 194, this.xpos, this.ypos, Invader.width, Invader.height);
  }
  checkPosition() {
    if (CANVAS_WIDTH < this.xpos) {
      return - 4;
    }
    if (this.xpos < 0) {
      return 4;
    }
    return 0;
  }
  static checkDirection(invaders) {
    if (Invader.delay_counter == 0) return;
    for (let i = 0; i < invaders.length; i++) {
      let d = invaders[i].checkPosition();
      if (d < 0) {
        if (Invader.yspeed == 0) {
          Invader.yspeed = 4;
          Invader.xspeed = 0;
        } else {
          Invader.xspeed = -4;
          Invader.yspeed = 0;
        }
        break;
      }
      else if (d > 0) {
        if (Invader.yspeed == 0) {
          Invader.yspeed = 4;
          Invader.xspeed = 0;
        } else {
          Invader.xspeed = 4;
          Invader.yspeed = 0;
        }
        break;
      }

    }
  }
  static startGame() {
    Invader.delay = 5;
    Invader.delay_counter = Invader.delay;
    Invader.xspeed = 4;
  }
  static updateCounter() {
    if (Invader.delay_counter == 0) {
      Invader.delay_counter = Invader.delay;
    }
    else {
      Invader.delay_counter = Invader.delay_counter - 1;
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x + 19;
    this.y = y;
    this.w = 10;
    this.h = 10;
    this.c = "yellow";
  }
  draw() {
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    this.y -= 15;
  }
  checkCollision(invaders) {
    for (let i = 0; i < invaders.length; i++) {
      if (invaders[i].xpos < this.x && this.x < invaders[i].xpos + Invader.width) {
        if (invaders[i].ypos < this.y && this.y < invaders[i].ypos + Invader.height) {
          return i;
        }
      }
    }
    return -1;
  }
}

class GameScreen {
  constructor() { }
  draw() {
    background(0);
    this.player.draw();
    Invader.updateCounter();
    Invader.checkDirection(this.invaders);
    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders[i].draw();
    }
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].y < 0) {
        bullets.splice(i--, 1);
        continue;
      }
      let invaderD = bullets[i].checkCollision(this.invaders);
      if (invaderD != -1) {
        this.invaders.splice(invaderD, 1);
        bullets.splice(i--, 1);
      }
    }
    bullets.forEach((b) => {
      b.draw();
    });
    if (this.invaders.length == 0) {
      Win_Screen.win();
    }
  }
  startGame() {
    gameState = 1;
    this.player = new Player();
    this.invaders = new Array();
    Invader.startGame();
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 9; column++) {
        this.invaders.push(new Invader(row, column * Invader.width * 2 + (CANVAS_WIDTH / 2 - Invader.width * 9), row * Invader.height * 2 + CANVAS_HEIGHT / 8));
      }
    }
  }
  keyPressed() {
    this.player.keyPressed();
  }
  keyReleased() {
    this.player.keyReleased();
  }
}

var Start_Menu = new StartMenu();
var Game_Screen = new GameScreen();
var Win_Screen = new WinScreen();
var Lose_Screen = new LoseScreen();

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function preload() {
  playerImage = loadImage("player1.png");
  alienImage = loadImage("alienImage/alien.png");
}

function draw() {
  background(0);
  if (gameState == 0) {
    Start_Menu.draw();
  }
  else if (gameState == 1) {
    Game_Screen.draw();
  }
  else if (gameState == 2) {
    Win_Screen.draw();
  }
  else if (gameState == 3) {
    Lose_Screen.draw();
  }
}

function keyPressed() {
  // console.log (keyCode)

  if (gameState == 0) {
    Start_Menu.keyPressed();
  }
  else if (gameState == 1) {
    Game_Screen.keyPressed();
  }
}

function keyReleased() {
  if (gameState == 0) {
    Start_Menu.keyReleased();
  }
  else if (gameState == 1) {
    Game_Screen.keyReleased();
  }
}

function randomInvader() {
  var random = invaders[Math.floor(Math.random() * invaders.length)];
  invaderBullet = new invaderBullet(random.x, random.y);
  invaderBullets.push(invaderBullet);
}