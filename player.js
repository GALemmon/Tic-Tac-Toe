class Player {
  constructor(id, name, token) {
    this.id = id;
    this.name = name;
    this.token = token;
    this.moves = [];
    this.isTurn = false;
  }
}
