var gameState = 0; // 0 = menu, 1 = game, 2 = gameover
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 900;
var playerImage;
var alienImages;

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
  constructor (type, xpos, ypos) {
    this.type = type;
    this.xpos = xpos;
    this.ypos = ypos;
  }
  draw () {
    copy(alienImages[this.type], 0, 0, 250, 250, this.xpos, this.ypos, Invader.width, Invader.height);
    //console.log (width);
  }
}

class GameScreen{
  constructor () {}
  draw () {
    background (0);
    this.player.draw ();
    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders [i].draw ();
    }
  }
  startGame () {
    gameState = 1;
    this.player = new Player ();
    this.invaders = new Array ();
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 9; column++) {
        this.invaders.push (new Invader (row, column*Invader.width*1.5, row*Invader.height*1.5));
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
  alienImages = new Array();
  for (let i = 0; i < 3; i++) {
    alienImages [i] = loadImage("alienImage/alien" + 1 + ".png");
  }
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
