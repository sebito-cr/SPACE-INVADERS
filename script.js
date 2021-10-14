var gameState = 0; // 0 = menu, 1 = game, 2 = gameover
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 900;
var playerImage;
var alienImage;

class StartMenu{
  constructor () {}
  draw () {
    background (0);
    textSize (14);
    fill ("white");
    textAlign (CENTER);
    text ("Use arrow keys to move, space bar to shoot.", CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
  }
  keyPressed () {
    switch(keyCode) {	
    case 32:
      Game_Screen.startGame ();
    }
  }
  keyReleased () {

  }
}

class Player{ 
  constructor () {
    this.xpos = CANVAS_WIDTH/2;
    this.ypos = CANVAS_HEIGHT-75;
    this.width = 50;
    this.height = 30;
    this.xspeed = 0;
  }
  draw () {
    if (this.xspeed < 0 && this.xpos > -this.xspeed) {
      this.xpos = this.xpos + this.xspeed;
    }
    else if (this.xspeed > 0 && this.xpos < CANVAS_WIDTH-this.width){
      this.xpos = this.xpos + this.xspeed;
    }
    copy(playerImage, 0, 0, 415, 257, this.xpos, this.ypos, this.width, this.height);
  }
  keyPressed () {
    switch(keyCode) {
		case 37:
			this.xspeed = -4;
			break;
		case 39:
			this.xspeed = 4;
			break;		
	  }
  }
  keyReleased () {
    switch(keyCode) {
		case 37:
			this.xspeed = 0;
			break;
		case 39:
			this.xspeed = 0;
			break;	   
    }
  }
}

class Invader{
  static width = 30;
  static height = 30;
  static delay = 1;
  static delay_counter = 1;
  static xspeed = 4;
  static yspeed = 0;
  constructor (type, xpos, ypos) {
    this.type = type;
    this.xpos = xpos;
    this.ypos = ypos;
  }
  draw () {
    if (Invader.delay_counter == 0) {
      this.xpos = this.xpos + Invader.xspeed;
      this.ypos = this.ypos + Invader.yspeed;

    }
    copy(alienImage, 0, 0, 259, 194, this.xpos, this.ypos, Invader.width, Invader.height);
  }
  checkPosition () {
    if (CANVAS_WIDTH < this.xpos) {
      return - 4;
    }
    if (this.xpos < 0) {
      return 4;
    }
    return 0;
  }
  static checkDirection (invaders) {
    if (Invader.delay_counter == 0) return;
    for (let i = 0; i < invaders.length; i++) {
      let d = invaders [i].checkPosition ();
      if (d < 0) {
        if (Invader.yspeed == 0 ) {
          Invader.yspeed = 4;
          Invader.xspeed = 0;
        } else {
          Invader.xspeed = -4;
          Invader.yspeed = 0;
        }
        break;
      }
      else if (d > 0) {
        if (Invader.yspeed == 0 ) {
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
  static startGame () {
    Invader.delay = 5;
    Invader.delay_counter = Invader.delay;
    Invader.xspeed = 4;
  }
  static updateCounter () {
    if (Invader.delay_counter == 0) {
      Invader.delay_counter = Invader.delay;
    }
    else {
      Invader.delay_counter = Invader.delay_counter - 1;
    }
  }
}

class GameScreen{
  constructor () {}
  draw () {
    background (0);
    this.player.draw ();
    Invader.updateCounter ();
    Invader.checkDirection (this.invaders);
    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders [i].draw ();
    }
  }
  startGame () {
    gameState = 1;
    this.player = new Player ();
    this.invaders = new Array ();
    Invader.startGame ();
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 9; column++) {
        this.invaders.push (new Invader (row, column*Invader.width*2 + (CANVAS_WIDTH/2 - Invader.width*9), row*Invader.height*2 + CANVAS_HEIGHT/8));
      }
    }
  }
  keyPressed () {
    this.player.keyPressed ();
  }
  keyReleased () {
    this.player.keyReleased ();
  }
}

var Start_Menu = new StartMenu ();
var Game_Screen = new GameScreen ();

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function preload () {
  playerImage = loadImage("player1.png");
  alienImage = loadImage("alienImage/alien.png");
}

function draw() {
	background(0);
  if (gameState == 0) {
    Start_Menu.draw ();
  }
  else if (gameState == 1) {
    Game_Screen.draw ();
  }
}

function keyPressed() {
  // console.log (keyCode)
  if (gameState == 0) {
    Start_Menu.keyPressed ();
  }
  else if ( gameState == 1) {
    Game_Screen.keyPressed ();
  }
}

function keyReleased() {
  if (gameState == 0) {
    Start_Menu.keyReleased ();
  }
  else if (gameState == 1) {
    Game_Screen.keyReleased ();
  }
}
