const board_border = "black";
const board_background = "#020202";
let canvas;
let board_width;
let board_height;
let board;
let board_ctx;
let cell_width;
let cell_height;
let cell_border;
let cell_dead;
let cell_alive;

function onload() {
  canvas = document.getElementById("conway_board");
  document.body.style.padding = "0px";
  document.body.style.margin = "0px";
  resizeCanvas();

  board = canvas;
  board_width = 10;
  board_height = 10;

  board_ctx = board.getContext("2d");

  cell_width = board.width / board_width;
  cell_height = board.height / board_height;

  cell_border = "#FFFFFF";

  cell_dead = "#020202";
  cell_alive = "#0F0F0F";
}

window.onresize = function () {
  resizeCanvas();
  reset();
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight + 300;
}

onload();

document.addEventListener("click", toggleCell);


class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alive = true;
  }

  draw() {
    board_ctx.fillStyle = this.alive ? cell_alive : cell_dead;
    board_ctx.fillRect(
      this.x * cell_width,
      this.y * cell_height,
      cell_width,
      cell_height
    );
    board_ctx.strokestyle = cell_border;
    board_ctx.strokeRect(
      this.x * cell_width,
      this.y * cell_height,
      cell_width,
      cell_height
    );
  }

  toggle() {
    this.alive = !this.alive;
    this.draw();
  }
}

let cellArray = initCells();

function initCells() {
  let cells = [];
  for (let x = 0; x < board_width; x++) {
    for (let y = 0; y < board_height; y++) {
      cells.push(new Cell(y, x));
    }
  }
  return cells;
}

let pause = false;
let counter = 0;
let lastState = saveState();

clear_board();
randomizeBoard();
main();

function main() {
    counter++;
    if (arrayEquals(lastState, saveState())) {
      randomizeBoard();
      counter = 0;
    }
    lastState = saveState();

    setTimeout(function onTick() {
      drawBoard();
      // Repeat
      main();
    }, 200);
}

function clear_board() {
  board_ctx.fillStyle = board_background;
  board_ctx.strokestyle = board_border;
}

function drawBoard() {
  for (let i = 0; i < cellArray.length; i++) {
    cellArray[i].draw();
  }
  runGame();
}

function toggleCell(e) {
  let x = Math.floor(e.clientX / cell_width);
  let y = Math.floor(e.clientY / cell_height);
  if (x >= 0 && x < board_width && y >= 0 && y < board_height) {
    let index = x + y * board_width;
    cellArray[index].toggle();
  }
}

function getCell(x, y) {
  return cellArray[x + y * board_width];
}

function randomizeBoard() {
  for (let c in cellArray) {
    if (Math.random() > 0.5) {
      cellArray[c].toggle();
    }
  }
}

// 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function runGame() {
  for (let c in cellArray) {
    let neighbors = getCellNeighbors(cellArray[c].x, cellArray[c].y);
    let aliveNeighbors = 0;
    let deadNeighbors = 0;
    for (let n in neighbors) {
      if (neighbors[n].alive) {
        aliveNeighbors++;
      } else {
        deadNeighbors++;
      }
    }
    //check rule 1
    if (cellArray[c].alive && aliveNeighbors < 2) {
      cellArray[c].toggle();
    }
    //check rule 2
    if (cellArray[c].alive && (aliveNeighbors == 2 || aliveNeighbors == 3)) {
      //do nothing
    }
    //check rule 3
    if (cellArray[c].alive && aliveNeighbors > 3) {
      cellArray[c].toggle();
    }
    //check rule 4
    if (!cellArray[c].alive && aliveNeighbors == 3) {
      cellArray[c].toggle();
    }
  }
}

function getCellNeighbors(x, y) {
  let neighbors = [];
  let vals = [-1, 0, 1];
  for (let i = 0; i < vals.length; i++) {
    for (let j = 0; j < vals.length; j++) {
      if (vals[i] == 0 && vals[j] == 0) {
        continue;
      }

      let xVal = x + vals[i];
      let yVal = y + vals[j];
      if (xVal >= 0 && xVal < board_width && yVal >= 0 && yVal < board_height) {
        neighbors.push(getCell(xVal, yVal));
      }
    }
  }
  return neighbors;
}


function reset() {
  cellArray = initCells();
  clear_board();
  randomizeBoard();
  main();
}


function saveState() {
  let state = [];
  for (let c in cellArray) {
    state.push(cellArray[c].alive);
  }
  return state;
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
