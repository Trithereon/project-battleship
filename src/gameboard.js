// Gameboard class module

import Ship from "./ship";

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
    this.ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
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

  receiveAttack = (pos) => {
    const node = this.board[pos[0]][pos[1]];
    if (node.ship) {
      node.ship.hit();
      node.shoot();
    } else {
      node.shoot();
    }
  };

  simulateShipPlacement = () => {
    let counter = 0;
    this.ships.forEach((ship) => {
      this.placeShip(ship, [counter, 0], [counter, ship.length - 1]);
      counter++;
    });
  };

  checkGameEnd = () => {
    this.ships.forEach((ship) => {
      if (!ship.isSunk()) return false;
    });
    return true;
  };
}

// Each position on the gameboard stores a Node object
export class Node {
  constructor() {
    this.ship = null;
    this.hasShot = false;
  }
  shoot = () => {
    this.hasShot = true;
  };
}
