//------------ Query Selectors -------------
var gameArea = document.querySelector('.game-area');
var square1 = document.getElementById('square1');
var square2 = document.getElementById('square2');
var square3 = document.getElementById('square3');
var square4 = document.getElementById('square4');
var square5 = document.getElementById('square5');
var square6 = document.getElementById('square6');
var square7 = document.getElementById('square7');
var square8 = document.getElementById('square8');
var square9 = document.getElementById('square9');
var player1WinCounter = document.getElementById('player1WinCounter');
var player2WinCounter = document.getElementById('player2WinCounter');

//----------- Global Variables --------------
var gameSquares = [square1, square2, square3, square4, square5, square6,
   square7, square8, square9];
var winningCombos = [
  ['square1', 'square2', 'square3'],
  ['square3', 'square2', 'square1'],
  ['square4', 'square5', 'square6'],
  ['square6', 'square5', 'square4'],
  ['square7', 'square8', 'square9'],
  ['square9', 'square8', 'square7'],
  ['square1', 'square4', 'square7'],
  ['square7', 'square4', 'square1'],
  ['square2', 'square5', 'square8'],
  ['square8', 'square5', 'square2'],
  ['square3', 'square6', 'square9'],
  ['square9', 'square6', 'square3'],
  ['square1', 'square5', 'square9'],
  ['square9', 'square5', 'square1'],
  ['square3', 'square5', 'square7'],
  ['square7', 'square5', 'square3']
];
var currentGame = [];
var winner = '';
var player1WinTotal = 0;
var player2WinTotal = 0;

//------------ Event Listners ---------------
window.addEventListener('load', cleanGameBoard);
gameArea.addEventListener('click', makeMove);

//--------------- Work Area-----------------







//---------------- Functions ----------------
function cleanGameBoard() {
  currentGame = [];
  newGame = new Game();
  currentGame.push(newGame);
  resetSquares();
  player1WinCounter.innerText = `${player1WinTotal}`;
  player2WinCounter.innerText = `${player2WinTotal}`;
}

function makeMove() {
  logMove();
  markSquares();
  checkWin();
  changePlayer();
}

function logMove() {
  for (var i = 0; i < gameSquares.length; i++) {
    if (event.target.id === gameSquares[i].id && currentGame[0].currentPlayer1) {
      currentGame[0].player1Moves.push(gameSquares[i].id);
    } else if (event.target.id === gameSquares[i].id && !currentGame[0].currentPlayer1){
      currentGame[0].player2Moves.push(gameSquares[i].id);
    };
  };
};

function markSquares() {
  for (var i = 0; i < currentGame[0].player1Moves.length; i++) {
    var square = document.getElementById(`${currentGame[0].player1Moves[i]}`)
    square.innerText = 'x';
  };
  for (var i = 0; i < currentGame[0].player2Moves.length; i++) {
    var square = document.getElementById(`${currentGame[0].player2Moves[i]}`)
    square.innerText = 'o';
  };
};

function checkWin() {
  var player1MovesStr = currentGame[0].player1Moves.join();
  var player2MovesStr = currentGame[0].player2Moves.join();
  for (i = 0; i < winningCombos.length; i++) {
    if (player1MovesStr.includes(winningCombos[i])) {
      player1Wins();
    } else if (player2MovesStr.includes(winningCombos[i])) {
      player2Wins();
    };
  };
};

function changePlayer() {
  if (currentGame[0].currentPlayer1) {
    currentGame[0].currentPlayer1 = false;
  } else if (!currentGame[0].currentPlayer1) {
    currentGame[0].currentPlayer1 = true;
  };
  return currentGame[0].currentPlayer1;
};

function player1Wins() {
  console.log('player1 wins');
  player1WinTotal++;
  console.log(player1WinTotal);
  resetGame();
};

function player2Wins() {
  console.log('player2 wins');
  player2WinTotal++;
  resetGame();
};

function resetGame() {
  window.setTimeout(cleanGameBoard, 2500);
};

function resetSquares() {
  for (var i = 0; i < gameSquares.length; i++) {
    gameSquares[i].innerText = '-';
  };
};

function hide(element) {
  element.classList.add("hidden");
};

function show(element) {
  element.classList.remove("hidden");
};
