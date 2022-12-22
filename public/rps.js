let board_ctx;
let board_width;
let board_height;

function onload() {
  canvas = document.getElementById("rps_board");
  document.body.style.padding = "0px";
  document.body.style.margin = "0px";

  board = canvas;
  board_width = 500;
  board_height = 900;

  board_ctx = board.getContext("2d");
}

class Player {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.alive = true;
  }

  draw() {
    if (!this.alive) return;
    board_ctx.font = "25px serif";
    // use these alignment properties for "better" positioning
    board_ctx.textAlign = "center";
    board_ctx.textBaseline = "middle";
    board_ctx.fillText(this.type, this.x, this.y);
  }
}

function initPlayer() {
  let players = [];
  for (let i = 0; i < 100; i++) {
    players.push(
      new Player(
        Math.floor(Math.random() * board_width),
        Math.floor(Math.random() * board_height),
        "📄"
      )
    );
  }
  for (let i = 0; i < 100; i++) {
    players.push(
      new Player(
        Math.floor(Math.random() * board_width),
        Math.floor(Math.random() * board_height),
        "🥌"
      )
    );
  }
  for (let i = 0; i < 100; i++) {
    players.push(
      new Player(
        Math.floor(Math.random() * board_width),
        Math.floor(Math.random() * board_height),
        "✂️"
      )
    );
  }
  return players;
}
onload();
//Code to render 📄 on the canvas
let players = initPlayer();

function movePlayer(elapsedTime) {
  for (let i = 0; i < players.length; i++) {
    // choose a random velocity value
    let velocity = Math.random() * 10;
    // choose a random direction
    let angle = Math.random() * 2 * Math.PI;
    // calculate the x and y components of the velocity based on the angle
    let vx = velocity * Math.cos(angle);
    let vy = velocity * Math.sin(angle);
    // update the player's position based on the elapsed time and velocity
    let x = players[i].x + vx * elapsedTime;
    let y = players[i].y + vy * elapsedTime;
    // clamp the position to the nearest valid value if it is outside the canvas bounds
    x = Math.max(0, Math.min(board_width, x));
    y = Math.max(0, Math.min(board_height, y));
    players[i].x = x;
    players[i].y = y;
  }
}

function checkPlayerCollision() {
  let delta = 30;
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players.length; j++) {
      if (i != j) {
        if (
          Math.abs(players[i].x - players[j].x) <= delta &&
          Math.abs(players[i].y - players[j].y) <= delta
        ) {
          if (players[i].type == "📄" && players[j].type == "✂️") {
            players[i].type = "✂️";
          } else if (players[i].type == "✂️" && players[j].type == "🥌") {
            players[i].type = "🥌";
          } else if (players[i].type == "🥌" && players[j].type == "📄") {
            players[i].type = "📄";
          } else if (players[i].type == "📄" && players[j].type == "🥌") {
            players[j].type = "📄";
          } else if (players[i].type == "✂️" && players[j].type == "📄") {
            players[j].type = "✂️";
          } else if (players[i].type == "🥌" && players[j].type == "✂️") {
            players[j].type = "🥌";
          }
        }
      }
    }
  }
}

function checkWinner() {
  //check if all players are the same type
  //if so, return the type
  //else return null
  if (players.every((val, i, arr) => val.type === arr[0].type)) {
    return true;
  } else {
    return false;
  }
}

function renderGame() {
  board_ctx.clearRect(0, 0, board.width, board.height);
  for (let i = 0; i < players.length; i++) {
    players[i].draw();
  }
}

function runGame() {
  let tickrate = 0.3;
  movePlayer(tickrate);
  checkPlayerCollision();
  renderGame();
  if (checkWinner()) {
    renderGame();
    alert("winner" + players[0].type);
    return;
  }
  setTimeout(function onTick() {
    renderGame();
    // Repeat
    runGame();
  }, tickrate);
}

runGame();
