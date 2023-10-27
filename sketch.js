let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);

  // Desenhe as barras e a bola
  leftPaddle.show();
  rightPaddle.show();
  ball.show();

  // Mova as barras
  leftPaddle.move();
  rightPaddle.move();

  // Atualize a posição da bola e verifique colisões
  ball.update();
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);

  // Verifique se a bola saiu dos limites
  if (ball.isOut()) {
    if (ball.x < 0) {
      rightScore++;
    } else {
      leftScore++;
    }
    ball.reset();
  }

  // Exiba a pontuação
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 10;
    this.xSpeed = 5;
    this.ySpeed = 5;
  }

  show() {
    ellipse(this.x, this.y, this.radius * 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Verifique se a bola atingiu a parede superior ou inferior
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  checkCollision(paddle) {
    if (
      this.x - this.radius < paddle.x + paddle.width / 2 &&
      this.x + this.radius > paddle.x - paddle.width / 2 &&
      this.y > paddle.y - paddle.height / 2 &&
      this.y < paddle.y + paddle.height / 2
    ) {
      this.xSpeed *= -1;
    }
  }

  isOut() {
    return this.x < 0 || this.x > width;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 5;
    this.ySpeed = 5;
  }
}

class Paddle {
  constructor(isLeft) {
    this.width = 10;
    this.height = 80;
    this.x = isLeft ? 0 : width - this.width;
    this.y = height / 2;
    this.speed = 5;
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(87) && this.y > this.height / 2) {
      this.y -= this.speed;
    }
    if (keyIsDown(83) && this.y < height - this.height / 2) {
      this.y += this.speed;
    }
  }
}
