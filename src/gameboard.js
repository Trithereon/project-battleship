// Gameboard class module

import { settings } from "./settings";
import Ship from "./ship";

export class Gameboard {
  constructor(rows, columns) {
    this.board = [];
    this.rows = rows;
    this.columns = columns;
    for (let i = 0; i < rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < columns; j++) {
        this.board[i].push(new Node());
      }
    }
    this.ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(2, "Patrol Boat"),
    ];
  }

  getRows = () => {
    return this.rows;
  };

  getColumns = () => {
    return this.columns;
  };

  getBoard = () => {
    return this.board;
  };

  getShips = () => {
    return this.ships;
  };

  placeShip = (ship, startPos, direction) => {
    let start = startPos;
    let end = [];
    ship.setStartPos(startPos);
    if (direction === "horizontal") {
      ship.setDirection("horizontal");
      end.push(startPos[0] + ship.getLength() - 1);
      end.push(startPos[1]);
    } else if (direction === "vertical") {
      ship.setDirection("vertical");
      end.push(startPos[0]);
      end.push(startPos[1] + ship.getLength() - 1);
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
      if (node.ship.isSunk()) {
        return "sunk";
      } else return "hit";
    } else {
      node.shoot();
      return "miss";
    }
  };

  simulateRandomShipPlacement = () => {
    const dirs = ["vertical", "horizontal"];
    this.ships.forEach((ship) => {
      let pos; // [x,y] format
      const length = ship.getLength();
      const dir = dirs[Math.floor(Math.random() * 2)];
      do {
        if (dir === "horizontal") {
          // Generate random position where x is between 0 and #columns-length
          const x = Math.floor(Math.random() * (settings.columns - length + 1));
          const y = Math.floor(Math.random() * settings.rows);
          pos = [x, y];
        } else {
          // vertical equivalent
          const x = Math.floor(Math.random() * settings.columns);
          const y = Math.floor(Math.random() * (settings.rows - length + 1));
          pos = [x, y];
        }
      } while (!this._isValidShipPlacement(pos, length, dir)); // if invalid, try again.

      this.placeShip(ship, pos, dir);
    });
  };

  _isValidShipPlacement = (startPos, length, dir) => {
    // Check each cell along the ship's length for invalid placement.
    if (dir === "horizontal") {
      // startPos[1] (y) remains constant.
      for (let i = startPos[0]; i < startPos[0] + length; i++) {
        const hasShip = this.board[i][startPos[1]].getShip();
        if (hasShip || i >= settings.columns) return false;
      }
    } else {
      // vertical, so startPos[0] (x) remains constant.
      for (let i = startPos[1]; i < startPos[1] + length; i++) {
        const hasShip = this.board[startPos[0]][i].getShip();
        if (hasShip || i >= settings.rows) return false;
      }
    }
    // If no cell triggers invalid, return true.
    return true;
  };

  checkGameOver = () => {
    for (const ship of this.ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };
}

// Each position on the gameboard stores a Node object
export class Node {
  constructor() {
    this.ship = null;
    this.shotStatus = false;
  }
  shoot = () => {
    this.shotStatus = true;
  };
  getShip = () => {
    return this.ship;
  };
  getStatus = () => {
    return this.shotStatus;
  };
  getShotStatus = () => {
    return this.shotStatus;
  };
}
