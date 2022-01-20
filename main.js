
//------------ Query Selectors -------------
var player1WinCounter = document.getElementById('player1WinCounter');
var player2WinCounter = document.getElementById('player2WinCounter');
var turnDesignator = document.getElementById('turnDesignator');
var gameResult = document.getElementById('result');
var gameGrid = document.querySelector('.game-grid');
var gameSquareBtns = document.querySelector('.game-square')

//--------------- Buttons -------------------
var square1 = document.getElementById('square1');
var square2 = document.getElementById('square2');
var square3 = document.getElementById('square3');
var square4 = document.getElementById('square4');
var square5 = document.getElementById('square5');
var square6 = document.getElementById('square6');
var square7 = document.getElementById('square7');
var square8 = document.getElementById('square8');
var square9 = document.getElementById('square9');

//----------- Global Variables --------------
var gameSquares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];
var winningCombos = [
  ['square1', 'square2', 'square3'],
  ['square4', 'square5', 'square6'],
  ['square7', 'square8', 'square9'],
  ['square1', 'square4', 'square7'],
  ['square2', 'square5', 'square8'],
  ['square3', 'square6', 'square9'],
  ['square1', 'square5', 'square9'],
  ['square3', 'square5', 'square7'],
];
var games = [];

//------------ Event Listners ---------------
window.addEventListener('load', initialGame);
square1.addEventListener('click', makeMove);
square2.addEventListener('click', makeMove);
square3.addEventListener('click', makeMove);
square4.addEventListener('click', makeMove);
square5.addEventListener('click', makeMove);
square6.addEventListener('click', makeMove);
square7.addEventListener('click', makeMove);
square8.addEventListener('click', makeMove);
square9.addEventListener('click', makeMove);

//---------------- Functions ----------------
function initialGame() {
  newGame = new Game();
  games.push(newGame);
  games[games.length - 1].selectFirstPlayer();
};

function cleanGameBoard() {
  newGame = new Game();
  games.push(newGame);
  resetSquares();
  resetHTML();
  games[games.length - 1].selectFirstPlayer();
};

function resetSquares() {
  for (var i = 0; i < gameSquares.length; i++) {
    gameSquares[i].disabled = false;
    gameSquares[i].classList.remove('player1', 'player2', 'disabled');
    gameSquares[i].addEventListener('click', makeMove);
  };
};

function resetHTML() {
  displayWins();
  gameResult.innerText = '';
  hide(gameResult);
  show(gameGrid);
  show(turnDesignator);
};

function displayWins() {
  var player1WinTotal = 0;
  var player2WinTotal = 0;
  for (var i = 0; i < games.length; i++) {
    if (games[i].player1Wins) {
      player1WinTotal++;
    };
    if (games[i].player2Wins) {
      player2WinTotal++;
    };
  };
  player2WinCounter.innerText = `${player2WinTotal}`;
  player1WinCounter.innerText = `${player1WinTotal}`;
};

function makeMove() {
  games[games.length - 1].logMove();
  games[games.length - 1].markSquares();
  checkWin();
  checkDraw();
  games[games.length - 1].changePlayer();
};

function checkWin() {
  for (i = 0; i < winningCombos.length; i++) {
    if (compareArrays(games[games.length - 1].player1.moves, winningCombos[i])) {
      return player1Wins();
    } if (compareArrays(games[games.length - 1].player2.moves, winningCombos[i])) {
      return player2Wins();
    };
  };
};

function checkWinOnly() {
  for (i = 0; i < winningCombos.length; i++) {
    if (compareArrays(games[games.length - 1].player1.moves, winningCombos[i])) {
      return true;
    } if (compareArrays(games[games.length - 1].player2.moves, winningCombos[i])) {
      return true;
    };
  };
};

function checkDraw() {
  if (games[games.length - 1].totalMovesTaken === 9) {
    return checkWinOnly() ? checkWinOnly() : declareDraw();
  };
};

function compareArrays(playerMoves, winCombo) {
  var matchingMoves = playerMoves.filter((item) => winCombo.includes(item));
  return matchingMoves.length === 3;
};

function player1Wins() {
  games[games.length - 1].player1Wins++;
  announceResult(games[games.length - 1].player1.name);
  resetGame();
};

function player2Wins() {
  games[games.length - 1].player2Wins++;
  announceResult(games[games.length - 1].player2.name);
  resetGame();
};

function announceResult(player) {
  hide(gameGrid);
  hide(turnDesignator);
  show(gameResult);
  gameResult.innerText = `${player} wins!`;
};

function declareDraw() {
  hide(gameGrid);
  hide(turnDesignator);
  show(gameResult);
  gameResult.innerText = `The cat got the game!`;
  resetGame();
};

function resetGame() {
  window.setTimeout(cleanGameBoard, 2500);
};

function hide(element) {
  element.classList.add("hidden");
};

function show(element) {
  element.classList.remove("hidden");
};
