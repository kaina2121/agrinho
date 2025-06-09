let player;
let goodItems = [];
let badItems = [];
let score = 0;
let lives = 3;

function setup() {
  createCanvas(600, 400);
  player = new Player();

  // Criar itens recicláveis (bons) e tóxicos (ruins)
  for (let i = 0; i < 5; i++) {
    goodItems.push(new FallingItem(random(width), random(-200, -50), "good"));
    badItems.push(new FallingItem(random(width), random(-200, -50), "bad"));
  }
}

function draw() {
  background(100, 200, 100); // Fundo verde, tipo campo

  // Mostrar pontuação e vidas
  fill(0);
  textSize(20);
  text("Pontos: " + score, 10, 25);
  text("Vidas: " + lives, 10, 50);

  player.move();
  player.show();

  // Itens bons
  for (let item of goodItems) {
    item.update();
    item.show();

    if (item.hits(player)) {
      score += 1;
      item.reset();
    }
  }

  // Itens ruins
  for (let item of badItems) {
    item.update();
    item.show();

    if (item.hits(player)) {
      lives -= 1;
      item.reset();
    }
  }

  if (lives <= 0) {
    noLoop();
    textSize(40);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Fim de Jogo!", width / 2, height / 2);
  }
}

// Classe do jogador
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.size = 40;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    this.x = constrain(this.x, 0, width - this.size);
  }

  show() {
    fill(0, 100, 255);
    rect(this.x, this.y, this.size, this.size);
  }
}

// Classe dos itens que caem
class FallingItem {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = 30;
    this.speed = random(2, 4);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) this.reset();
  }

  reset() {
    this.y = random(-200, -50);
    this.x = random(0, width);
  }

  show() {
    if (this.type === "good") {
      fill(0, 200, 0); // Verde
    } else {
      fill(200, 0, 0); // Vermelho
    }
    ellipse(this.x, this.y, this.size);
  }

  hits(player) {
    let d = dist(this.x, this.y, player.x + player.size / 2, player.y + player.size / 2);
    return d < this.size / 2 + player.size / 2;
  }
}
