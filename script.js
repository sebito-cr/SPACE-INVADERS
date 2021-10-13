var [xpos, ypos, xspeed, yspeed] = [570, 550, 0, 0];
var bulletY,bulletX;


function setup() {
	createCanvas(1200, 600);
  bulletY = 200;
  bulletX = -100;
}


function draw() {
	background(0);
	
	fill(0);
	
	fill(0, 255, 0);
	rect(xpos, ypos, 60, 20);

  fill('green')
  rect(570, 40, 20, 20)
	
	if(xpos >= 0 && xpos + 50 <= 1200) 
    xpos += xspeed;
  
  if(xpos <= 0){
    xpos = xpos + 0.5;
  }
  if(xpos + 60 >= 1200){
    xpos = xpos - 0.5;
  }

  if(keyCode==32){
    bullet();
  }
}

function bullet(){
  fill('white')
  circle(bulletX,bulletY,10);
  bulletY -= 10;
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
