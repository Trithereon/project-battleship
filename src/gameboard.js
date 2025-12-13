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

  placeShip = (ship, startPos, endPos) => {
    // Ensure startPos is smaller than endPos
    let start = startPos;
    let end = endPos;
    if (startPos > endPos) {
      start = endPos;
      end = startPos;
    }
    // Need logic to fill in the positions between start and end
    if (start[0] === end[0]) {
      // increment positions, keeping x constant
      for (let i = start[1]; i <= end[1]; i++) {
        this.board[start[0]][i].ship = ship;
      }
    } else if (start[1] === end[1]) {
      // increment positions, keeping y constant
      for (let i = start[0]; i <= end[0]; i++) {
        this.board[i][start[1]].ship = ship;
      }
    }
  };

  receiveAttack = () => {
    // handle receiving an attack
    // TODO update all Gameboards with hit/miss shot coordinates
  };
}

// Each node on the gameboard can have any of the following states
export class Node {
  constructor() {
    this.ship = null;
    this.hasShot = false;
  }
}
