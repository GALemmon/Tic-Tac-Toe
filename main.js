
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
var currentGame = [];
var totalGames = 0;
var p1 = true;
var player1WinTotal = 0;
var player2WinTotal = 0;
var p1Moves = [];
var p2Moves = [];
var totalMovesTaken = 0;

//------------ Event Listners ---------------
window.addEventListener('load', cleanGameBoard);
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
function cleanGameBoard() {
  currentGame = [];
  newGame = new Game();
  currentGame.push(newGame);
  resetGlobalVars();
  resetSquares();
  resetHTML();
  selectFirstPlayer();
};

function resetGlobalVars() {
  p1 = currentGame[0].currentPlayer1;
  p1Moves = currentGame[0].player1Moves;
  p2Moves = currentGame[0].player2Moves;
  totalMovesTaken = 0;
};

function resetSquares() {
  for (var i = 0; i < gameSquares.length; i++) {
    gameSquares[i].disabled = false;
    gameSquares[i].classList.remove('player1', 'player2', 'disabled');
    gameSquares[i].addEventListener('click', makeMove);
  };
};

function resetHTML() {
  player1WinCounter.innerText = `${player1WinTotal}`;
  player2WinCounter.innerText = `${player2WinTotal}`;
  gameResult.innerText = '';
  hide(gameResult);
  show(gameGrid);
  show(turnDesignator);
};

function selectFirstPlayer() {
  if (totalGames === 0 || totalGames % 2 === 0) {
    p1 = true;
  } else {
    p1 = false;
  };
  designateTurn();
};

function makeMove() {
  totalMovesTaken++;
  designateTurn();
  logMove();
  markSquares();
  checkWin();
  checkDraw();
  changePlayer();
};

function designateTurn() {
  if (p1) {
    turnDesignator.innerText = "Steve's turn.";
  };
  if (!p1) {
    turnDesignator.innerText = "Tony's turn.";
  };
};

function logMove() {
  for (var i = 0; i < gameSquares.length; i++) {
    if (event.target.id === gameSquares[i].id && p1) {
      gameSquares[i].disabled = true;
      gameSquares[i].removeEventListener('click', makeMove);
      addToPlayer1(gameSquares[i]);
    } else if (event.target.id === gameSquares[i].id && !p1) {
      gameSquares[i].disabled = true;
      addToPlayer2(gameSquares[i]);
    };
  };
};

function addToPlayer1(move) {
  p1Moves.push(move.id);
};

function addToPlayer2(move) {
  p2Moves.push(move.id);
};

function markSquares() {
  for (var i = 0; i < p1Moves.length; i++) {
    markPlayer1Square();
  };
  for (var i = 0; i < p2Moves.length; i++) {
    markPlayer2Square();
  };
};

function markPlayer1Square() {
  for (var i = 0; i < p1Moves.length; i++) {
    var square = document.getElementById(`${p1Moves[i]}`);
    square.classList.add('disabled');
    square.classList.add('player1');
  };
};

function markPlayer2Square() {
  for (var i = 0; i < p2Moves.length; i++) {
    var square = document.getElementById(`${p2Moves[i]}`);
    square.classList.add('disabled');
    square.classList.add('player2');
  };
};

function checkWin() {
  for (i = 0; i < winningCombos.length; i++) {
    if (compareArrays(p1Moves, winningCombos[i])) {
      return player1Wins();
    } if (compareArrays(p2Moves, winningCombos[i])) {
      return player2Wins();
    };
  };
};

function checkWinOnly() {
  for (i = 0; i < winningCombos.length; i++) {
    if (compareArrays(p1Moves, winningCombos[i])) {
      return true;
    } if (compareArrays(p2Moves, winningCombos[i])) {
      return true;
    };
  };
};

function checkDraw() {
  if (totalMovesTaken === 9) {
    return checkWinOnly() ? checkWinOnly() : declareDraw();
  };
};

function compareArrays(playerMoves, winCombo) {
  var matchingMoves = playerMoves.filter((item) => winCombo.includes(item));
  return matchingMoves.length === 3;
};

function player1Wins() {
  player1WinTotal++;
  announceResult('Steve');
  resetGame();
};

function player2Wins() {
  player2WinTotal++;
  announceResult('Tony');
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
  totalGames++
  window.setTimeout(cleanGameBoard, 2500);
};

function changePlayer() {
  if (p1) {
    p1 = !p1;
  } else if (!p1) {
    p1 = true;
  };
  designateTurn();
  return p1;
};

function hide(element) {
  element.classList.add("hidden");
};

function show(element) {
  element.classList.remove("hidden");
};
