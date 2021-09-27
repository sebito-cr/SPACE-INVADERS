

function setup() {
	createCanvas(1200, 600);

}

var [xpos, ypos, xspeed, yspeed] = [570, 550, 0, 0];

function draw() {
	background(0);
	
	fill(0);
	
	fill(0, 255, 0);
	rect(xpos, ypos, 60, 20);
	
	if(xpos >= 0 && xpos + 50 <= 1200) 
    xpos += xspeed;
  
  if(xpos < 0 || xpos > 1200){
  xpos = xpos * -0,01;
  }
 
}

function keyPressed() {
	switch(keyCode) {
		case 37:
		case 65:
			xspeed = -4;
			break;
		case 39:
		case 68:
			xspeed = 4;
			break;
		case 38:
		case 87:
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