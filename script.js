var gameState = 0; // 0 = menu, 1 = game, 2 = gameover

class StartMenu{
  constructor () {}
  draw () {
    background (0);
    textSize (14);
    fill ("white");
    text ("Use arrow keys to move, space bar to shoot.", 210, 450);
  }
}

class GameScreen{
  constructor () {}
  draw () {}
}

let Start_Menu = new StartMenu ();
let Game_Screen = new GameScreen ();

function setup() {
	createCanvas(700, 900);

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
  console.log(keyCode);
	switch(keyCode) {
		case 37:
		case 65:
			xspeed = -4;
			break;
		case 39:
		case 68:
			xspeed = 4;
			break;		
    case 32:
      bulletY = ypos - 12;
      bulletX = xpos + 30;
      break;
	}
}

function keyReleased() {
	switch(keyCode) {
		case 37:
		case 65:
			xspeed = 0;
			break;
		case 39:
		case 68:
			xspeed = 0;
			break;
		case 38:
		case 87:

	}
}
