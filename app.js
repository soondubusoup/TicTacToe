const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

//game constants
const xPlayer = "✘";
const oPlayer = "✪";
const randomPlayer = () => (Math.Random() > 0.5 ? "xPlayer" : "oPlayer");

const entry = document.getElementById("entry");
entry.addEventListener("click", displayDetails);

//Player 1 and 2 name display
const row = 1;

function displayDetails() {
  const playerOne = document.getElementById("playerOne").value;
  const playerTwo = document.getElementById("playerTwo").value;

  const display = document.getElementById("display");

  const newRow = display.insertRow(row);

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);

  cell1.innerHTML = playerOne;
  cell2.innerHTML = playerTwo;
}

//game variables
let gameIsLive = true;
let xIsNext = Math.random() > 0.5 ? 1 : 0;
if (xIsNext) {
  statusDiv.innerHTML = `Current Player: ${xPlayer}`;
} else {
  statusDiv.innerHTML = `Current Player: ${oPlayer}`;
}

//functions
const letterToSymbol = function (letter) {
  if (letter === "x") {
    return xPlayer;
  }
  return oPlayer;
};

const handleWin = function (letter) {
  gameIsLive = false;
  if (letter === "x") {
    statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
  } else {
    statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
  }
};
const checkGameStatus = function () {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];

  // check winner
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWin(middleLeft);
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    handleWin(bottomLeft);
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWin(topMiddle);
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    gameIsLive = false;
    statusDiv.innerHTML = "Game is tied!";
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xPlayer} is next`;
    } else {
      statusDiv.innerHTML = `${oPlayer} is next`;
    }
  }
};

const handleReset = () => {
  let xIsNext = Math.random() > 0.5 ? 1 : 0;
  if (xIsNext) {
    statusDiv.innerHTML = `Current Player: ${xPlayer}`;
  } else {
    statusDiv.innerHTML = `Current Player: ${oPlayer}`;
  }
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove("x");
    cellDiv.classList.remove("o");
    cellDiv.classList.remove("won");
  }
  gameIsLive = true;
};

const handleCellClick = (e) => {
  const classList = e.target.classList;

  if (!gameIsLive || classList[1] === "x" || classList[1] === "o") {
    return;
  }

  if (xIsNext) {
    classList.add("x");
    checkGameStatus();
  } else {
    classList.add("o");
    checkGameStatus();
  }
};

//event listeners
resetDiv.addEventListener("click", handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener("click", handleCellClick);
}