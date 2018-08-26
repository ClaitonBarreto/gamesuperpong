// System Variables
var canvas = document.getElementById('mycanvas'),
	ctx = canvas.getContext('2d'),
	ALTURA = canvas.height, LARGURA = canvas.width, buttons = {};

// Game Variables
let gameStart = false,

block = {
	x: LARGURA / 2 - 60,
	y: ALTURA - 40,
	speed: 5,
	width: 200,
	height: 20
},

ball = {
	x: LARGURA / 2 - 10,
	y: ALTURA / 2 - 10,
	height: 25,
	width: 25,
	speed: 3,
	dirx: -1,
	diry: 1,
	mod: 0
},

fixedBlock = {
	width: 25,
	height: 25
}

// Captação das teclas

document.addEventListener('keydown', (e) => {
	buttons[e.keyCode] = true;
	//alert(e.keyCode);
})

document.addEventListener('keyup', (e) => {
	delete buttons[e.keyCode];
})

draw = () => {
	ctx.clearRect(0,0, LARGURA, ALTURA);
	blockMove();
	ballMove();	
	ctx.fillStyle = "black";
	ctx.fillRect(block.x, block.y, block.width, block.height);
	ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
	let zeroPoint = 0;
	for(a = 0; a <= LARGURA; a++)
	{	
		ctx.fillRect(zeroPoint, 0, fixedBlock.width, fixedBlock.height);
		zeroPoint += fixedBlock.width;
	}
	
}

blockMove = () => {
	if(65 in buttons && block.x > 0)
		block.x -= block.speed;
	if(68 in buttons && block.x + block.width < LARGURA)
		block.x += block.speed;
}

ballMove = () => {
	if(ball.x + ball.width >= block.x && ball.x <= block.x + block.width && ball.y + ball.height > block.y){
		if(65 in buttons){
			ball.dirx = -1;
		} else if(68 in buttons){
			ball.dirx = 1;
		}
		ball.diry = -1;
		ball.speed++;
	}
	else if(ball.y <= 0)
		ball.diry = 1;
	else if(ball.x <= 0)
		ball.dirx = 1;
	else if(ball.x + ball.width >= LARGURA)
		ball.dirx = -1;

	if(ball.y + ball.height >= block.y + block.height){
		lose();
	}

	ball.x += ball.speed * ball.dirx;
	ball.y += ball.speed * ball.diry;
}

lose = () => {
	ctx.clearRect(0,0,LARGURA,ALTURA);
	ctx.font = '50px Verdana';
	ctx.fillStyle = "black";
	ctx.fillText('Que pena, Voce Perdeu :(', 50, 50);
	window.setTimeout('resetGame()' , 1000);
}	


resetGame = () => {
	gameStart = false;
	block.x = LARGURA / 2 - 60;
	ball.x = LARGURA / 2 - 10;
	ball.y = ALTURA / 2 - 10;
	ball.speed = 3;
}

piscar = () => {
	var blink = document.getElementById('blink');
	if(blink.getAttribute('style') == 'visibility: hidden'){
		blink.setAttribute('style', 'visibility: visible');
	} else {
		blink.setAttribute('style', 'visibility: hidden');
	}
}

intro = () => {
	ctx.clearRect(0,0,LARGURA,ALTURA);
	ctx.font = '50px Verdana';
	ctx.fillStyle = "black";
	ctx.fillText('Pressione Espaco Para Comecar!', 50,50);
}

main = () => {

	if(32 in buttons){
		draw();
	}

	draw();
	//window.setInterval(draw, 15);
	//window.setInterval(piscar, 200);
}

main();
