// Gameboard class module

export class Gameboard {
  constructor() {
    this.board = [];
    const rows = 10;
    const columns = 10;
    for (let i = 0; i < rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < columns; j++) {
        this.board[i].push(new Node());
      }
    }
  }

  getBoard = () => {
    return this.board;
  };

  placeShip = () => {
    // handle placing a Ship on the board
  };

  receiveAttack = () => {
    // handle receiving an attack
    // TODO update all Gameboards with hit/miss shot coordinates
  };
}

// Each node on the gameboard can have any of the following states
export class Node {
  constructor() {
    this.hasShip = false;
    this.hasShot = false;
  }
}
