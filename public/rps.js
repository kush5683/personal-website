let board_ctx;
let board_width;
let board_height;

function onload() {
  canvas = document.getElementById("rps_board");
  document.body.style.padding = "0px";
  document.body.style.margin = "0px";

  board = canvas;
  board_width = 500;
  board_height = 800;

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
  let numPlayers = 9;
  let players = [];
  for (let i = 0; i < numPlayers + 1; i++) {
    players.push(
      new Player(
        Math.floor(Math.random() * board_width),
        Math.floor(Math.random() * board_height),
        "📄"
      )
    );
  }
  for (let i = 0; i < numPlayers + 1; i++) {
    players.push(
      new Player(
        Math.floor(Math.random() * board_width),
        Math.floor(Math.random() * board_height),
        "🥌"
      )
    );
  }
  for (let i = 0; i < numPlayers + 1; i++) {
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
    if (players[i].type == "📄") continue;
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

function moveSpecificPlayerRandomly(player, elapsedTime) {
  // choose a random velocity value
  let velocity = Math.random() * 10;
  // choose a random direction
  let angle = Math.random() * 2 * Math.PI;
  // calculate the x and y components of the velocity based on the angle
  let vx = velocity * Math.cos(angle);
  let vy = velocity * Math.sin(angle);
  // update the player's position based on the elapsed time and velocity
  let x = player.x + vx * elapsedTime;
  let y = player.y + vy * elapsedTime;
  // clamp the position to the nearest valid value if it is outside the canvas bounds
  x = Math.max(0, Math.min(board_width, x));
  y = Math.max(0, Math.min(board_height, y));
  player.x = x;
  player.y = y;
}

function checkIfEnemyLeft(player) {
  for (let i = 0; i < players.length; i++) {
    switch (player.type) {
      case "📄":
        if (players[i].type == "🥌") {
          return true;
        }
        break;
      case "🥌":
        if (players[i].type == "✂️") {
          return true;
        }
        break;
      case "✂️":
        if (players[i].type == "📄") {
          return true;
        }
        break;
    }
  }
  return false;
}

function movePlayersTowardEnemy(elapsedTime) {
  let moveBias = elapsedTime / 2;
  for (let i = 0; i < players.length; i++) {
    switch (players[i].type) {
      case "📄":
        if (!checkIfEnemyLeft(players[i])) {
          console.log("📄 moving randomly");
          moveSpecificPlayerRandomly(players[i], elapsedTime);
          break;
        } else {
          console.log("📄 hunting 🥌");
          for (let j = 0; j < players.length; j++) {
            if (players[j].type == "🥌") {
              let enemyX = players[j].x;
              let enemyY = players[j].y;
              let selfX = players[i].x;
              let selfY = players[i].y;
              if (enemyX > selfX) {
                players[i].x += moveBias;
              }
              if (enemyX < selfX) {
                players[i].x -= moveBias;
              }
              if (enemyY > selfY) {
                players[i].y += moveBias;
              }
              if (enemyY < selfY) {
                players[i].y -= moveBias;
              }
            }
          }
        }
        break;
      case "🥌":
        if (!checkIfEnemyLeft(players[i])) {
          console.log("🥌 moving randomly");
          moveSpecificPlayerRandomly(players[i], elapsedTime);
          break;
        } else {
          console.log("🥌 hunting ✂️");
          for (let j = 0; j < players.length; j++) {
            if (players[j].type == "✂️") {
              let enemyX = players[j].x;
              let enemyY = players[j].y;
              let selfX = players[i].x;
              let selfY = players[i].y;
              if (enemyX > selfX) {
                players[i].x += moveBias;
              }
              if (enemyX < selfX) {
                players[i].x -= moveBias;
              }
              if (enemyY > selfY) {
                players[i].y += moveBias;
              }
              if (enemyY < selfY) {
                players[i].y -= moveBias;
              }
            }
          }
        }
        break;
      case "✂️":
        if (!checkIfEnemyLeft(players[i])) {
          console.log("✂️ moving randomly");
          moveSpecificPlayerRandomly(players[i], elapsedTime);
          break;
        } else {
          console.log("✂️ hunting 📄");
          for (let j = 0; j < players.length; j++) {
            if (players[j].type == "📄") {
              let enemyX = players[j].x;
              let enemyY = players[j].y;
              let selfX = players[i].x;
              let selfY = players[i].y;
              if (enemyX > selfX) {
                players[i].x += moveBias;
              }
              if (enemyX < selfX) {
                players[i].x -= moveBias;
              }
              if (enemyY > selfY) {
                players[i].y += moveBias;
              }
              if (enemyY < selfY) {
                players[i].y -= moveBias;
              }
            }
          }
        }
        break;
    }
  }
}

function checkPlayerCollision() {
  let delta = 20;
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
          if (players[i].type == players[j].type) {
            let selfX = players[i].x;
            let selfY = players[i].y;
            let otherX = players[j].x;
            let otherY = players[j].y;
            if (selfX > otherX) {
              players[i].x += 3;
            }
            if (selfX < otherX) {
              players[i].x -= 3;
            }
            if (selfY > otherY) {
              players[i].y += 3;
            }
            if (selfY < otherY) {
              players[i].y -= 3;
            }
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
  let tickrate = 0.2;
  movePlayersTowardEnemy(tickrate);
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
