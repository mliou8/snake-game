const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


const snake = {
  x: 10,
  y: 10,
  size: 10,
  length: 5,
  direction: 'right',
  sections: [],
  snakeConstructor: function (x, y) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x * snake.size, y * snake.size, snake.size, snake.size);
    // This is the border of the square
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(x * snake.size, y * snake.size, snake.size, snake.size);
  },
  drawSnake: function() {
    for (let i = snake.length; i >= 0; i--) {
      snake.sections.push({x:i, y:0});
    }  
  },
  move: function() {
   switch (snake.direction) {
     case 'up':
       snake.y -= snake.size;
       break;
     case 'down':
       snake.y += snake.size;
       break;
     case 'left':
       snake.x -= snake.size;
       break;
     case 'right':
       snake.x += snake.size;
       break;
   }
 }
}
//logic for food 
const food = {
  createFood: function () {
    x = Math.floor((Math.random() * 30) + 1)
    y = Math.floor((Math.random() * 30) + 1)
    for (var i=0; i>snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;        
      if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
        food.x = Math.floor((Math.random() * 30) + 1);
        food.y = Math.floor((Math.random() * 30) + 1);
      }
    }
  }
}

const game = {
  fps: 8,
  over: false,
  render: function () {
    w = 280;
    h = 300;
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, 280, 300);
    var snakeX = snake.sections[0].x;
    var snakeY = snake.sections[0].y;
    switch (snake.direction) {
      case 'right':
        snakeX++;
        break;
      case 'left':
        snakeX--;
        break;
      case 'up':
        snakeY--;
        break;
      case 'down':
        snakeY++;
        break;
    }
    
    var tail = snake.sections.pop();
    tail.x = snakeX;
    tail.y = snakeY;
    //Puts the tail as the first cell.
    snake.sections.unshift(tail);
    for (var i = 0; i < snake.length; i++) {
       snake.snakeConstructor(snake.sections[i].x, snake.sections[i].y);
    }

  }
}
      
addEventListener("keydown", function (e) {
    const keyPressed = e.keyCode;
    console.log("keypressed ", keyPressed);
    switch (keyPressed) {
      case 37:
        if (snake.direction !== 'right') snake.direction = 'left';
        break;
      case 38:
        if (snake.direction !== 'down') snake.direction = 'up';
        break;
      case 39:
        if (snake.direction !== 'left') snake.direction = 'right';
        break;
      case 40:
        if (snake.direction !== 'up') snake.direction = 'down';
        break;  
    } 
}, false);

function loop() {
  if (!game.over) {
    snake.drawSnake();
    game.render();
  }
  setTimeout(function() {
    requestAnimationFrame(loop);
  }, 1000 / game.fps);
}
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

requestAnimationFrame(loop);
