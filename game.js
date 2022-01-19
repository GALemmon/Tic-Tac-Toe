class Game {
  constructor() {
    this.id = Date.now();
    this.player1 = new Player(player1, 'Steve', './assets/Captain-America-Shield.svg');
    this.player2 = new Player(player2, 'Tony', './assets/Iron-Man.svg');
    this.player1Wins = 0;
    this.player2Wins = 0;
    this.totalMovesTaken = 0;
  };

  selectFirstPlayer() {
    if (games.length === 0 || games.length % 2 === 0) {
      turnDesignator.innerText = `${this.player1.name}'s turn.`;
      this.player1.isTurn = true;
    } else {
      turnDesignator.innerText = `${this.player2.name}'s turn.`;
      this.player2.isTurn = true;
    };
  };

  changePlayer() {
    if (this.player1.isTurn) {
      turnDesignator.innerText = `${this.player2.name}'s turn.`;
      this.player1.isTurn = false;
      this.player2.isTurn = true;
    } else if (!this.player1.isTurn) {
      turnDesignator.innerText = `${this.player1.name}'s turn.`;
      this.player2.isTurn = false;
      this.player1.isTurn = true;
    };
  };

  logMove() {
    for (var i = 0; i < gameSquares.length; i++) {
      if (event.target.id === gameSquares[i].id && this.player1.isTurn) {
        gameSquares[i].disabled = true;
        gameSquares[i].removeEventListener('click', makeMove);
        this.totalMovesTaken++;
        this.player1.moves.push(gameSquares[i].id);
      } else if (event.target.id === gameSquares[i].id && !this.player1.isTurn) {
        gameSquares[i].disabled = true;
        gameSquares[i].removeEventListener('click', makeMove);
        this.totalMovesTaken++;
        this.player2.moves.push(gameSquares[i].id);
      };
    };
  };

  markSquares() {
    for (var i = 0; i < this.player1.moves.length; i++) {
      var square = document.getElementById(`${this.player1.moves[i]}`);
      square.classList.add('disabled');
      square.classList.add('player1');
    };
    for (var i = 0; i < this.player2.moves.length; i++) {
      var square = document.getElementById(`${this.player2.moves[i]}`);
      square.classList.add('disabled');
      square.classList.add('player2');
    };
  };
};
