const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

const cells = [];
let clicks = 0;
let firstImage;

const gameBoard = document.getElementById("game-board");

generateBoard(GRID_SIZE, CELL_SIZE, CELL_GAP);

function generateBoard(GRID_SIZE, CELL_SIZE, CELL_GAP) {
  gameBoard.style.setProperty("--grid-size", GRID_SIZE);
  gameBoard.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
  gameBoard.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", (e) => handleClick(e));
    const cellFront = document.createElement("div");
    cellFront.classList.add("front");
    // const cellFrontImg = document.createElement("img");
    // cellFront.append(cellFrontImg);
    cell.append(cellFront);
    cells.push(cell);
    gameBoard.append(cell);
  }

  addImagesToCells(cells);
}

function addImagesToCells(cells) {
  for (let i = 1; i <= (GRID_SIZE * GRID_SIZE) / 2; i++) {
    for (let x = 0; x < 2; x++) {
      let emptyCells = cells.filter((cell) => !cell.querySelector(".back"));
      let drawnCell = Math.floor(Math.random() * emptyCells.length);
      const cellBack = document.createElement("div");
      cellBack.classList.add("back");
      const cellBackImg = document.createElement("img");
      cellBackImg.src = `images/${i}.png`;
      cellBack.append(cellBackImg);
      emptyCells[drawnCell].setAttribute("index", i);
      emptyCells[drawnCell].append(cellBack);
    }
  }
}

function handleClick(e) {
  clicks++;
  e.target.parentElement.classList.add("clicked");
  if (clicks < 2) {
    firstImage = e.target;
  } else {
    checkIfImagesMatch(e, firstImage);
    checkIfYouWon();
    clicks = 0;
  }
}

function checkIfImagesMatch(e, firstImage) {
  if (
    e.target.parentElement.getAttribute("index") ==
    firstImage.parentElement.getAttribute("index")
  ) {
    e.target.parentElement.classList.add("match");
    firstImage.parentElement.classList.add("match");
  } else {
    setTimeout(hideAllCells, 1000);
  }
}

function hideAllCells() {
  cells.forEach((cell) => cell.classList.remove("clicked"));
}

function checkIfYouWon() {
  if (cells.every((cell) => cell.classList.contains("match"))) {
    alert("You Won, Congratulations!");
  }
}
